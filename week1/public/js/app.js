//-----------SET DEFAULT HASH TO "HOME"-----------//
if(window.location.hash === "") {
	window.location.hash = "home"
}

//-----------ROUTING-----------//
routie({
    'home': function() {
		home();
    },
    'pokeinfo/?:id': function(id) {
    	renderPokePage(id.substr(4));
    }
});


function home() {
	var promise = getData("https://pokeapi.co/api/v2/pokemon/?limit=50");

	promise.then(function(data) {
		renderHome(data);
	}).catch(function(error) {
		console.log(error);
	})
}

function renderHome(data) {
	for(var i=0; i < data['results'].length; i++) {
		//Set mainDiv
		var mainDiv = document.getElementById('container');
		
		//Create new div
		var newdiv = document.createElement('div');
		newdiv.setAttribute('class', 'pokemon')
		newdiv.setAttribute('id', data['results'][i]['name'])

		//Add attributes to new div
		var clickable = document.createElement('a');
		var id = parseInt(i) + 1;
		clickable.setAttribute('href', '#pokeinfo?id=' + id);

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

function renderPokePage(id) {
	var promise2 = getData("https://pokeapi.co/api/v2/pokemon/" + id);

	promise2.then(function(data) {
		console.log(data);
		var source   = document.getElementById("entry-template").innerHTML;
		var template = Handlebars.compile(source);
		var context = {
			pokename: "Mals", 
			imgurl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
		};
		var html = template(context);

		var mainDiv = document.getElementById('container');
		mainDiv.innerHTML = html;
	}).catch(function(error) {
		console.log(error);
	})
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
