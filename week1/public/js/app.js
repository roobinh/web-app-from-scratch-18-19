var url = "https://ipapi.co/json/";
var xmlhttp = new XMLHttpRequest();

function addElements() {

	var data = JSON.parse(this.responseText);
    console.log(data);

	
	var div = document.getElementById("results");

	var paraRegion = document.createElement("p");
	node = document.createTextNode("Region: " + data["region"]);
	paraRegion.appendChild(node);
	div.appendChild(paraRegion);

	var paraLocation = document.createElement("p");
	node = document.createTextNode("Location: " + data["country_name"] + ", " + data["region"]);
	paraLocation.appendChild(node);
	div.appendChild(paraLocation);

	var paraIP = document.createElement("p");
	var node = document.createTextNode("IP: " + data["ip"]);
	paraIP.appendChild(node);	
	div.appendChild(paraIP);

	var paraLongLat = document.createElement("p");
	var node = document.createTextNode("Lat/Lang: " + data['latitude'] + ", " + data["longitude"]);
	paraLongLat.appendChild(node);	
	div.appendChild(paraLongLat);
		
	
}

xmlhttp.addEventListener('load', addElements);
xmlhttp.open("GET", url, true);
xmlhttp.send();