loadIPAPI();

//Functions
function loadIPAPI() {
	var url = "https://ipapi.co/json/";
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.addEventListener('load', addElements);
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function loadWeatherAPI(long, lat) {
	var url = "https://places.cit.api.here.com/places/v1/discover/search?at=52.5044,13.3909&q=restaurant&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&pretty&callback=&Accept-Language=de"
	// var url = "https://weather.api.here.com/weather/1.0/report.json?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&product=observation&latitude=52.3556&longitude=4.9135&jsoncallback=myCallbackFunction"
	// var url = "https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude="+ lat + "&longitude=" + long + "&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&jsoncallback=myCallbackFunction";
	//	https://weather.api.here.com/weather/1.0/report.json?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&product=observation&latitude=52.3556&longitude=4.9135
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.addEventListener('load', weatherLoaded);
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function mals() {
	console.log('jo');
}
function weatherLoaded() {
	// var data = JSON.parse(this.responseText);
	var data = this.responseText.substring(1);
	console.log(data)
	console.log(typeof(data))
	data
	console.log(data['observations']['location'][0]['observation'][0]);

	var temperature = data['observations']['location'][0]['observation'][0]['temperature'];
	var visibility = data['observations']['location'][0]['observation'][0]['visibility'];
	var winddirection = data['observations']['location'][0]['observation'][0]['windDesc'];
	var windspeed = data['observations']['location'][0]['observation'][0]['windSpeed'];

	var weatherdiv = document.getElementById("weatherinfo");

	var paraTemperature = document.createElement("p");
	var node = document.createTextNode("Current Temperature: " + temperature);
	paraTemperature.appendChild(node);
	weatherdiv.appendChild(paraTemperature);

	console.log(temperature);
	console.log(visibility);
	console.log(winddirection);
	console.log(windspeed);
}

function addElements() {
	var data = JSON.parse(this.responseText);
	var div = document.getElementById("results");

	var long = data['longitude'];
	var lat = data['latitude'];

	var paraLocation = document.createElement("p");
	var node = document.createTextNode("Location: " + data["country_name"] + ", " + data["region"]);
	paraLocation.appendChild(node);
	div.appendChild(paraLocation);

	var paraLongLat = document.createElement("p");
	var node = document.createTextNode("(Long/lat: " + long + ", " + lat + ")");
	paraLongLat.appendChild(node);	
	div.appendChild(paraLongLat);

	var button = document.createElement("button");
	var node = document.createTextNode("Click here to show IP");
	button.onclick = function(){
   	 	alert('Your IP Adress is: ' + data["ip"]);return false;
  	};
	button.appendChild(node);
	div.appendChild(button);

	var weatherbutton = document.createElement("button");
	var node = document.createTextNode("Click here to show weather");
	weatherbutton.onclick = function(){
   	 	showWeather();
  	};
	weatherbutton.appendChild(node);
	div.appendChild(weatherbutton);
	
	if(long == null && lat == null) {
		console.log("longitude latitude unknown!")
	} else {
		createMap(long, lat);
		loadWeatherAPI(long, lat);
	}
}

function createMap(long, lat) {
	//API Key
	mapboxgl.accessToken = 'pk.eyJ1Ijoicm9vYmluMTk5OSIsImEiOiJjanJxYzVpeGIwdzJ4NDlycTZvd2lramRkIn0.jEoxjM-oE38jYCIHnhLw_g';

	//Create Map
	if (!mapboxgl.supported()) {
		alert('Your browser does not support Mapbox GL');
	} else {
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [long, lat],
			zoom: 12
		});
	}

	//Marker Location
	var geojson = {
	  type: 'FeatureCollection',
	  features: [{
	    type: 'Feature',
	    geometry: {
	      type: 'Point',
	      coordinates: [long, lat]
	    },
	    properties: {
	      title: 'Your Location',
	      description: 'Washington, D.C.'
	    }
	  }]
	};

	//Add markers to map
	geojson.features.forEach(function(marker) {

	  //Create a HTML element for each feature
	  var el = document.createElement('div');
	  el.className = 'marker';

	  //Make a marker for each feature and add to the map
	  new mapboxgl.Marker(el)
	    .setLngLat(marker.geometry.coordinates)
	    .addTo(map);
	});
}



//Weather API
//https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude=52.3556&longitude=4.9135&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('myModal');

function showWeather() {
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

