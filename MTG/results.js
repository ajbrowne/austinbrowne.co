var check = false;
var tcg = 'http://store.tcgplayer.com/magic/product/show?ProductName=';
var price = 'http://magictcgprices.appspot.com/api/tcgplayer/price.json?cardname=';
var low;
var med;
var high;
var one, two, three, four, five, six, seven, eight, nine, ten, eleven; 
var url;

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
        check = true;
        var printings = cards[ind].printings[0];
        for (var i = 1; i < cards[ind].printings.length; i++){
          printings += '/' + cards[ind].printings[i];
        }
        url = "http://mtgimage.com/card/";
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
        one = url;
        two = cards[ind].name;
        three = cards[ind].name;
        four = type;
        five = cards[ind].text;
        six = printings;
        seven = cards[ind].rarity;
        eight = cards[ind].artist;
        if (cards[ind].flavor != null){
         var flavor = cards[ind].flavor;
         flavor = flavor.italics(); 
         nine = flavor;
       } else{
        document.getElementById('flavor').remove();
      }
      if (cards[ind].cmc != null){
        ten = cards[ind].cmc;
      } else{
        document.getElementById('cmc').remove();
      }
      if (type.indexOf(creature) != -1){
        eleven = pt;
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
document.getElementById('pic').src = url;document.getElementById('pic').src = one;
document.getElementById('name').innerHTML += two;
document.getElementById('card name').innerHTML += three;
document.getElementById('type').innerHTML += four;
document.getElementById('ctext').innerHTML += five;
document.getElementById('expac').innerHTML += six;
document.getElementById('rarity').innerHTML += seven;
document.getElementById('artist').innerHTML += eight;
document.getElementById('buy').href = price;
document.getElementById('flavor').innerHTML += nine;
document.getElementById('cmc').innerHTML += ten;
document.getElementById('pt').innerHTML += eleven;
}

function forward(){
  window.location.replace("./add.html");
}
