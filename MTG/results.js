var check = false;
var tcg = 'http://store.tcgplayer.com/magic/product/show?ProductName=';
var price = 'http://magictcgprices.appspot.com/api/tcgplayer/price.json?cardname=';
var low;
var med;
var high;
var one, two, three, four, five, six, seven, eight, nine, ten, eleven;

function cardSearch(){
  var input = sessionStorage.getItem('card');
  var l_input = sessionStorage.getItem('card').toLowerCase();
  $.getJSON('AllSets-x.json', function (data) {
    $.each(data, function (index, value){
     var cards = data[index].cards;
     $.each(cards, function (ind, value){
      var name = cards[ind].name;
      var l_name = cards[ind].name.toLowerCase();
      if (name.toLowerCase() == input.toLowerCase()){
        alert('lololol');
        check = true;
        var printings = cards[ind].printings[0];
        for (var i = 1; i < cards[ind].printings.length; i++){
          printings += '/' + cards[ind].printings[i];
        }
        var url = "http://mtgimage.com/card/";
        var img = input.replace(' ', '%20');
        var buy = input.replace(' ', '+');
        tcg += buy;
        tcg += '&newSearch=false';
        price += buy;
        $.getJSON(price, function(tcgPrice){
          document.getElementById('price').innerHTML = 'L: ' + tcgPrice[0] + ' M: ' + tcgPrice[1] + ' H: ' + tcgPrice[2];
        });
        var creature = 'Creature';
        var type = cards[ind].type;
        img = img + '.jpg';
        url = url + img;
        var pt = cards[ind].power + '/' + cards[ind].toughness;
        document.getElementById('pic').src = url;
        one = url;
        document.getElementById('name').innerHTML += cards[ind].name;
        two = cards[ind].name;
        document.getElementById('card name').innerHTML += cards[ind].name;
        three = cards[ind].name;
        document.getElementById('type').innerHTML += type;
        four = type;
        document.getElementById('ctext').innerHTML += cards[ind].text
        five = cards[ind].text;
        document.getElementById('expac').innerHTML += printings;
        six = printings;
        document.getElementById('rarity').innerHTML += cards[ind].rarity;
        seven = cards[ind].rarity;
        document.getElementById('artist').innerHTML += cards[ind].artist;
        eight = cards[ind].artist;
        document.getElementById('buy').href = tcg;
        // document.getElementById('pic').style.visibility = 'visible';
        // document.getElementById('name').style.visibility = 'visible';
        // document.getElementById('card name').style.visibility = 'visible';
        // document.getElementById('type').style.visibility = 'visible';
        // document.getElementById('ctext').style.visibility = 'visible';
        // document.getElementById('flavor').style.visibility = 'visible';
        // document.getElementById('expac').style.visibility = 'visible';
        // document.getElementById('rarity').style.visibility = 'visible';
        // document.getElementById('artist').style.visibility = 'visible';
        if (cards[ind].flavor != null){
         var flavor = cards[ind].flavor;
         flavor = flavor.italics(); 
         document.getElementById('flavor').innerHTML += flavor;
         // document.getElementById('flavor').style.visibility = 'visible';
       } else{
        document.getElementById('flavor').remove();
      }
      if (cards[ind].cmc != null){
       document.getElementById('cmc').innerHTML += cards[ind].cmc;
       // document.getElementById('cmc').style.visibility = 'visible';
     } else{
      document.getElementById('cmc').remove();
    }
    if (type.indexOf(creature) != -1){
     document.getElementById('pt').innerHTML += pt;
     // document.getElementById('pt').style.visibility = 'visible';
   } else{
    document.getElementById('pt').remove();
  }
  input = 'wallawalla';
}
});
});
if (check == false){
    $('#myModal').modal('show');
  }
});
}

function forward(){
  window.location.replace("./add.html");
}
