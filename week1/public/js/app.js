class IndexView {
	constructor() {
		window.addEventListener("hashchange", e => this.onRouteChange(e));
		this.slot = document.querySelector('#slot');
	}

	onRouteChange(e) {
		//When route gets changed.
		const hashLocation = window.location.hash.substring(1);
		this.loadContent(hashLocation)
	} 

	loadContent(uri) {
		const contentUri = '../pokeinfo.html';
		//const contentUri = '../' + uri + '.html';
		fetch(contentUri).
			then(r => r.text()).then(content => updateSlot(content));
	}

	updateSlot(content) {
		console.log(content);
		this.slot.innerHTML = content;
	}
}

new IndexView();


//-----------POKEMON ON SCREEN (HTML)-----------//
function printPokemon(data) {
	console.log("printPokemon called.")
	for(var i=0; i < data['results'].length; i++) {

		//Set mainDiv
		var mainDiv = document.getElementById('container');
		
		//Create new div
		var newdiv = document.createElement('div');
		newdiv.setAttribute('class', 'pokemon')
		newdiv.setAttribute('id', data['results'][i]['name'])

		//Add attributes to new div
		var clickable = document.createElement('a');
		clickable.setAttribute('href', '#pokeinfo');// + i)

		var pokeName = document.createElement('p');
		var textNode = document.createTextNode(UpperCaseFirstLetter(data['results'][i]['name']));
		pokeName.appendChild(textNode);
		newdiv.appendChild(pokeName);

		var pokeImg = document.createElement('img');
		loadImage(data['results'][i]['url']);
		pokeImg.setAttribute('id', data['results'][i]['name'])
		newdiv.appendChild(pokeImg);

		//Add created div to main div
		clickable.appendChild(newdiv)
		mainDiv.appendChild(clickable);
	}
}

//-----------MAKE FIRST LETTER OF STRING UC-----------//
function UpperCaseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//-----------LOAD CORRESPONDING IMAGE TO POKEMON-----------//
function loadImage(urlstring) {
	var url = urlstring;
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.addEventListener('load', function() {
		var data = JSON.parse(this.responseText);
		pokeImg = document.getElementById(data['name']).getElementsByTagName('img')[0];
		pokeImg.setAttribute('src', data['sprites']['front_default']);
		//console.log(data);
	});
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

//-----------GET REQUEST-----------//
function getData(url) {
	return new Promise(function(resolve, reject) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", url, true);
		xmlhttp.onload = function() {
			if(xmlhttp.status == 200) {
				resolve(JSON.parse(xmlhttp.response));
			} else {
				reject(xmlhttp.statusText);
			}
		};
		xmlhttp.onerror = function(){
			reject(xmlhttp.statusText);
		};
		xmlhttp.send();
	});
}

//-----------PROMISES-----------//
var promise = getData("https://pokeapi.co/api/v2/pokemon/?limit=100");

promise.then(function(data) {
	console.log("promises worked.");
	//console.log(data);
	printPokemon(data);
}).catch(function(error) {
	console.log(error);
})