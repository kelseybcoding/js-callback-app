function changeStreet(street){
  if (street.style.color === "purple"){
    street.style.color = '';
  } else {
    street.style.color = "lightgrey";
  }
}

function showAll(){
  var streets = document.querySelectorAll('.street');

  for (var i = 0; i < streets.length; i++){
    var street = streets[i];

    street.style.display = '';
  }
}

function showDirection(){
  var streets = document.querySelectorAll('.street');

  for (var i = 0; i < streets.length; i++){
    var street = streets[i];

    if (street.innerHTML.indexOf('DIRECTION') === -1){
      street.style.display = 'none';
    } else {
      street.style.display = '';
    }
  }
}

function getData(){
  var streetsDiv = document.getElementById('streets');

  var messages = ["Loading.","Loading..","Loading..."]
  var messageIndex = 0;

  var waitingMessage = setInterval(function(){
    streetsDiv.innerHTML = messages[messageIndex];
    if (messageIndex === 2){
      messageIndex = 0;
    } else {
      messageIndex++;
    }
  },800);

  setTimeout(function(){
    clearInterval(waitingMessage);
    fetch('https://data.cityofchicago.org/resource/pasq-g8mx.json')
    .then(function(response){
      return response.json();
    })
    .then(function(body){
      var htmlString = "";

      for (var i = 1; i < body.length; i++){
        var street = body[i];
        htmlString += '<div class="street" onmousedown="changeStreet(this)">'
        htmlString += '<h2>' + street.street + '</h2>';
        htmlString += '<p>Direction: ' + street.direction + '</p>';
        htmlString += '<p>Suffix: ' + street.suffix + '</p>';
        htmlString += '</div>'
      }

      streetsDiv.innerHTML = htmlString;
    });
  },5000);
}






// fetch("https://data.cityofchicago.org/resource/xzkq-xp2w.json")
// 	.then(function(response){
// 		return response.json();
// 	})
// 	.then(function(data){
// 		console.log(data);
// 	});
