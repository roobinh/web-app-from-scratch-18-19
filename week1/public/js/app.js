//localstorage
let myStorage = window.localStorage;
myStorage.clear();

//-----------SET DEFAULT HASH TO "HOME"-----------//
if(window.location.hash === "") {
	window.location.hash = "home"
}

const renderer = {
	home(data) {
		for(var i=0; i < data['results'].length; i++) {
			//Set div's
			var pokeDiv = document.getElementById('container');
			var mainDiv = document.getElementById('pokemons');

			pokeDiv.setAttribute('style', 'display: none;');
			mainDiv.setAttribute('style', 'display: inline-block;');

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
			pokeImg.setAttribute('id', data['results'][i]['name'])
			newdiv.appendChild(pokeImg);
	
			//Add created div to main div
			clickable.appendChild(newdiv)
			mainDiv.appendChild(clickable);
			mainDiv.setAttribute('style', 'display: inline-block;');

			specificPokemon = document.getElementById('singlepokemon');
			specificPokemon.setAttribute('style', 'display: none;');

			loadImage(data['results'][i]['url']);
		}
	},
	pokepage(data) {
		console.log(data);

		pokeName = UpperCaseFirstLetter(data['name']);
		imgUrl = data['sprites']['front_default'];
		Hitpoints = data['stats'][5]['base_stat'];
		Attack = data['stats'][4]['base_stat'];
		Defence = data['stats'][3]['base_stat'];
		SpecialAttack = data['stats'][2]['base_stat'];
		SpecialDefence = data['stats'][1]['base_stat'];
		Speed = data['stats'][0]['base_stat'];

		var source   = document.getElementById("entry-template").innerHTML;
		var template = Handlebars.compile(source);
		var context = {
			pokename: pokeName, 
			imgurl: imgUrl,
			hitpoints: Hitpoints,
			attack: Attack,
			defence: Defence,
			specialattack: SpecialAttack,
			specialdefence: SpecialDefence,
			speed: Speed
		};
		var html = template(context);

		var mainDiv = document.getElementById('pokemons');
		mainDiv.setAttribute('style', 'display: none;');

		specificPokemon = document.getElementById('singlepokemon');
		specificPokemon.setAttribute('style', 'display: inline-block;');
		specificPokemon.innerHTML = html;
	}
}

const router = {
	allPokemon() {
		var promise = getData("https://pokeapi.co/api/v2/pokemon/?limit=50");
		promise.then(function(data) {
			render.home(data)
		}).catch(function(error) {
			console.log(error);
		})
	},
	specificPokemon(id) {
		var promise = getData("https://pokeapi.co/api/v2/pokemon/" + id);
		promise.then(function(data) {
			render.pokepage(data)
		}).catch(function(error) {
			console.log(error);
		})
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
	console.log("load image:" + urlstring);
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

//-----------VARIABLES-----------//
const render = Object.create(renderer);
const route = Object.create(router);

//-----------ROUTING-----------//
routie({
    'home': function() {
		route.allPokemon();
    },
    'pokeinfo/?:id': function(id) {
		id = id.substr(4) // '?:id=8' -> '8'
    	route.specificPokemon(id);
    }
});