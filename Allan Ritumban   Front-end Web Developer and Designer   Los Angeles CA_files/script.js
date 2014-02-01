$(document).ready(function() {

	$('.flexslider').flexslider({
					animation : "slide",
					slideshow : false,
					controlNav : false,
					prevText : "<i class=\"fa fa-angle-left fa-4x\"></i>",
					nextText: "<i class=\"fa fa-angle-right fa-4x\"></i>"
				});

	$('body').toggleClass('no-scroll');
	//------ Preloader ------
	// <![CDATA[
		$(window).load(function() {
			$("#loading-container").fadeOut('slow');
			$("#preloader").delay(350).fadeOut("slow", function() {
				$('body').toggleClass('no-scroll');
			});
		})
	//]]>


	// screenHeight();
	detectTouch();
	introMe();
	myWork();
	scrollAnimations();
	// alert('width ' + $(window).width());
	// alert('height ' + $(window).height());
	photoSwipe();
	

});

//-------------------------- Detect Touch Screen --------------------------//
function detectTouch() {
	var isTouchScreen = false;

	if($('html.touch').length) {
		isTouchScreen = true;
	}

	if(!isTouchScreen) {
		parallax();

		$(window).resize(function() {
			parallax();
		});

	} 
}

//-------------------------- Loading ellipses --------------------------//
var span = $('.dots');
var text = span.text();

var loading = function()
{
    $({
        count : 1
    }).animate({
        count : text.length
    }, {
        duration : 1500,
        step : function() {
            span.text( text.substring(0, Math.round(this.count)) );
        },
        complete : function() {
            loading();
        }
    });
};

loading();

//-------------------------- Height of Div Equlas Height of Window --------------------------//

function screenHeight() {
	initialDivHeight();
	resizeDivToViewport();
}

//On load initial height is set to match window
function initialDivHeight() {
	var initialHeight = $(window).height();
	var initialHeightPX = parseInt(initialHeight) + 'px';
	
	$("#intro").css('min-height', initialHeightPX);
}

//On Window resize div heigth is set again
function resizeDivToViewport() {
	$(window).resize(function() {
		var height = $(window).height();
		var heightPX = parseInt(height) + 'px';
		
		$("#intro").css('min-height',heightPX);
	});
}


//-------------------------- Scroll Animation Effects --------------------------//
function scrollAnimations() {
	caption();

//What I Do Settings
	$(window).scroll(function(){
		var vHeight = $(window).height();

		if($('#whatido h2').visible( true ) && $(window).width() > 769) {
			$('.circle').delay(500).each(function(i) {
			  $(this).delay(i*400).fadeIn(400);
			});

			$('.wdo-content').delay(1200).each(function(i) {
			  $(this).delay(i*500).show(0);
			});
			
		} else if($('#whatido-content h2').visible() && $(window).width() <=768) {
			setTimeout(function() {
				$('.scale-hud').each(function(i, el) {
					setTimeout(function() {
						$(el).addClass('scale-hud-fadeout');
					}, 500 * i);
				});
			}, 1000);
		} 

//My Work Settings
		if($('#work h2').visible( true )) {
			window.setTimeout(loadDivRandom, 300);
		}
	});

//About Me Settings
	$(window).bind('scroll.aboutme', function() {
		if($('#aboutme h2').visible( true ) && $(window).width() > 767) {
			$('#sample-image').delay(300).animate({
				left: 0,
				opacity: 1
			}, 1000, function() {
				$(this).addClass('sample-image-static');
			});

			$('#aboutme-descp').delay(300).animate({
				top: 0,
				opacity: 1
			}, 1000, function() {
				$(this).css({
					position : 'static',
					top : 'auto',
					'filter' : 'none'
				});
			});

			$(window).unbind('scroll.aboutme');
		}
	});

//Contact Settings
	$(window).bind('scroll.contact', function() {
		if($('#contact-content h2').visible() && $(window).width() > 767) {
			$('#contact-form').animate({
				width: '90%',
				height: 490,
				padding: '30px 2.5% 30px'
			}, 1000, function() {
				$('#contact-form p').show(0, function() {
					$('.wpcf7-form-control').each(function(i, el) {
						setTimeout(function() {
							$(el).addClass('wpcf7-form-control-animate');
						}, 200 * i);
					});
				});
			});

			setTimeout(function() {
				$('#contact-form textarea').animate({
					height: 165
				}, 10);
			}, 1500);

			$('#cntct-dsc').animate({
				opacity : 1,
				top : 0
			}, 1500);

			$(window).unbind('scroll.contact');

		} else if($('#contact-content').visible() && $(window).width() < 767) {
			$('#contact-form').animate({
				width: '85%',
				height: 490,
				padding: '30px 2.5% 30px'
			}, 1000, function() {
				$('#contact-form p').show(0, function() {
					$('.wpcf7-form-control').each(function(i, el) {
						setTimeout(function() {
							$(el).addClass('wpcf7-form-control-animate');
						}, 200 * i);
					});
				});
			});

			setTimeout(function() {
				$('#contact-form textarea').animate({
					height: 165
				}, 10);
			}, 1500);

			$('#cntct-dsc').animate({
				opacity : 1,
				top : 0
			}, 1500);

			$(window).unbind('scroll.contact');
		}

	});
}


//What I Do Captions
function caption() {
	$('.scale-hud').mouseover(function() {
		var descId = '#' + $(this).attr('name');
		$(descId).stop(true, true).fadeIn();
	});

	$('.scale-hud').mouseout(function() {
		$('.whatido-desc').stop(true, true).hide();
	});
}


//-------------------------- Introductions Effects --------------------------//
function introMe() {
	$('#intro-container h1, #intro-container hr ').delay(900).animate({
		'opacity': 1
	}, 1000, function() {
		$('#intro-container #intro-content').animate({
			'opacity': 1
		}, 800)
	});

	$('.navbar').delay(1000).animate({
		'top' : 0,
		'opacity' : 1
	},1200);
}

function fadeScroll() {
	var divs = $('.intro-container');
	
	$(window).scroll(function() {
	   if($(window).scrollTop() < 100 ) {
	         divs.fadeIn("2000");
	   } else {
	         divs.fadeOut("1000");
	   }
	});
}


//-------------------------- Work Row Effects --------------------------//

//Load Random Divs For Work Thumbnails
var a = [];
var workAnimateRun = false;
var onoff = false;

function loadDivRandom() {
	if(!workAnimateRun) { 
		workAnimateRun = true;

		for (var i=0; i< $('.work-sample').length; i++) {
			a.push(i);
		};

		fisherYates(a);

		if($(window).width() > 570) {
			loadDiv();
		}
	}

	function fisherYates ( myArray ) {
		var i = myArray.length, j, temp;
		if ( i === 0 ) return false;
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			temp = myArray[i];
			myArray[i] = myArray[j]; 
			myArray[j] = temp;
		}
	}

	function loadDiv() {
		if (!a) return;
		$('.work-sample').eq(a.shift()).addClass('scale-now');
		console.log('Load Random Div');

		if (a.length > 0) {
			window.setTimeout(loadDiv, 100);
		} 
	}
}

//------ Slide-in Effect when work is clicked ------
function myWork() {

	// Hide Slides after load
	setTimeout(function() {
		$('.work-slide').addClass('slide-hide');
	}, 1000);


	// Begin Slide
	function enableSlide(slideName) {
		console.log('start');
		var slideID       = '#' + slideName;
		var slideTopPos   = $(document).scrollTop() + 'px';
		var slideHeight   = ($(window).width()) + 'px';
		var dimBackground = $('#cover-black');


		// Show slide on click
		$('.work-slide').removeClass('slide-hide');

		
		// Disable Scroll
		$('body').addClass('no-scroll');


		// Dim Background 
		dimBackground.fadeIn(1000);

		
		// Begin Slide In Animation
		setTimeout(function() {
			$(slideID).addClass('slide-in').css({
				top    : slideTopPos,
				height : slideHeight
			});
		}, 400);


		// Scroll Events
		$(window).scroll(function() {
			var scrollTopPos = $(document).scrollTop() + 'px';

			$(slideID).css({
				top : scrollTopPos
			});
		});


		// Resize Events
		$(window).resize(function() {
			var resizeHeight = ($(window).width()) + 'px';

			$(slideID).css({
				height : resizeHeight
			});
		});


		
		// Back Button
		$('.menu-item').fadeOut(500);
		var backLink = '<li><a href="#work-container" class="back-slide-trigger"><i class="fa fa-angle-double-left fa-lg"></i> Back</a></li>';

		setTimeout(function() {
			if ($('.menu-item').css('display') == 'none') {
					$('.back-slide-trigger').remove();
					$(backLink).appendTo('#main-menu');
					$('.back-slide-trigger').fadeIn(1000).css('display', 'block');
			}
		}, 800);

		
		$('body').on('click', 'a.back-slide-trigger', function() {
			console.log('Back Start');

			dimBackground.fadeOut(1000);
			
			$('body').removeClass('no-scroll');
			$('.menu-item').fadeIn(500);
			$('.back-slide-trigger').remove();

			setTimeout(function() {
			$('.work-slide').removeClass('slide-in');
				
				setTimeout(function() {
					$('.work-slide').addClass('slide-hide');
				},200);

			}, 0);
		});


		// Hide on Mobile
		var timer;

		$(window).on('resize', function() {
		    clearTimeout(timer);

		    timer = setTimeout(function() {
				if ($(window).width() < 1076) {
					dimBackground.fadeOut(1000);
					$('body').removeClass('no-scroll');
					$(slideID).removeClass('slide-in');
					$('.menu-item').fadeIn(500);
					$('.back-slide-trigger').remove();
				}
		    },100);
		});
	}


	// Get Slide
	var status = false;

	$('.slide-trigger').on('click', function() {
		status = !status;

		if(status) {
			enableSlide($(this).attr('name'));
		} else {
			$('.slide-trigger').off('click');
			status = false;
			$('.slide-trigger').on('click', function() {
				enableSlide($(this).attr('name'));
			});
		}
	});

} // myWork() end


//-------------------------- Plugins --------------------------//

//------ Parallax ------
function parallax() {
	var $window   = $(window);
	var $intro  = $('.intro-slide');
	var $whatido = $('.whatido-row');
	var $work  = $('#work');
	var $aboutme = $('#aboutme');
	var $contact = $('.contact-slide');
	var windowHeight = $window.height();

	$intro.parallax("50%", 0.3);
	$work.parallax("50%", 0.3);
	$contact.parallax("50%", 0.2);
}

function photoSwipe() {
	var myPhotoSwipe = $("#mobile-gallery-one a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }

	});

	var myPhotoSwipe = $("#mobile-gallery-two a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }
	});

	var myPhotoSwipe = $("#mobile-gallery-three a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }
	});
	
	var myPhotoSwipe = $("#mobile-gallery-four a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }
	});
	
	var myPhotoSwipe = $("#mobile-gallery-five a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }
	});
	
	var myPhotoSwipe = $("#mobile-gallery-six a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }
	});
	
	var myPhotoSwipe = $("#mobile-gallery-seven a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }
	});
	
	var myPhotoSwipe = $("#mobile-gallery-eight a").photoSwipe({ 
		zIndex: 2000,
		enableMouseWheel: false, 
		enableKeyboard: false,
		captionAndToolbarAutoHideDelay : 0,
		captionAndToolbarHideOnSwipe : false,
		getImageCaption: function(item) {return $(item).attr('ref'); }
	});
	
}
//------ Windows ------
// function windowsJS() {
// 	$('.window').windows({
// 	    snapping: true,
// 	    snapSpeed: 900,
// 	    snapInterval: 1100,
// 	    onScroll: function(scrollPos){
// 	        // scrollPos:Number
// 	    },
// 	    onSnapComplete: function($el){
// 	        // after window ($el) snaps into place
// 	    },
// 	    onWindowEnter: function($el){
// 	        // when new window ($el) enters viewport
// 	    }
// 	})
// }

