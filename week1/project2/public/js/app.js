loadAPI();

function loadAPI() {
	var url = "https://pokeapi.co/api/v2/pokemon/?limit=100";
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.addEventListener('load', APILOAD);
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function APILOAD() {
	var data = JSON.parse(this.responseText)['results'];
	printPokemon(data);
}

function printPokemon(data) {

	console.log(data);
	

	for(var i=0; i < data.length; i++) {

		//Set mainDiv
		var mainDiv = document.getElementById('container');
		
		//Create new div
		var newdiv = document.createElement('div');
		newdiv.setAttribute('class', 'pokemon')
		newdiv.setAttribute('id', data[i]['name'])


		//Add attributes to new div
		var clickable = document.createElement('a');
		clickable.setAttribute('href', 'file:///C:/Users/Robin%20Hofman/Desktop/PokiAPI/pokeinfo.html?id=' + i)

		var pokeName = document.createElement('p');
		var textNode = document.createTextNode(UpperCaseFirstLetter(data[i]['name']));
		pokeName.appendChild(textNode);
		newdiv.appendChild(pokeName);

		var pokeImg = document.createElement('img');
		loadImage(data[i]['url']);
		pokeImg.setAttribute('id', data[i]['name'])
		newdiv.appendChild(pokeImg);

		//Add created div to main div
		clickable.appendChild(newdiv)
		mainDiv.appendChild(clickable);
	}

}

function UpperCaseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadImage(urlstring) {
	var url = urlstring;
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.addEventListener('load', function() {
		var data = JSON.parse(this.responseText);
		pokeImg = document.getElementById(data['name']).getElementsByTagName('img')[0];
		pokeImg.setAttribute('src', data['sprites']['front_default']);
		console.log(data);
	});
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}