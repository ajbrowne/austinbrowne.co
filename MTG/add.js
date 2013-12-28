var result = false;

function forward(){
 window.location.replace("./add.html");
}

function nameSearch(){
  if (document.getElementById("name").value == ''){
   $('#myModal').modal('show');
 }
 else{
  var input = document.getElementById('name').value;
    sessionStorage.setItem('card', input);
    window.location.replace("./results.html");
   } 
}

$(function() {
  $("form").submit(function() { return false; });
});
