# Web App From Scratch @cmda-minor-web 18-19

## Table Of Contents
1. Doel
2. Design Patterns
3. Installatie
4. API
5. Future Plans
6. Extra: Grading

## 1. Doel
Mijn site kan je gebruiken voor het opzoeken van alle nodige informatie over ALLE Pokemon!

Voor het vak 'Web App From Scratch' ga ik de komende 3 weken een site maken die gebruik maakt van de data uit een API. Voor de site gebruik ik de talen HTML, CSS en JavaScript en maak ik gebruik van de [PokeAPI](https://pokeapi.co/), een API met daarin alle informatie over alle pokemon. 

Live demo van de site: [Live Demo](https://roobinh.github.io/web-app-from-scratch-18-19/week1/index.html)

## 2. Design Patterns/Interaction
Voor de site gebruik ik een overzichtelijke front-page met daarin alle pokemon. Door te drukken op een pokemon wordt alle extra informatie over deze pokemon weergegeven.

## 3. Installatie
```
git clone https://github.com/roobinh/web-app-from-scratch-18-19

cd web-app-from-scratch-18-19/week1
```

## 4. API
De API die wordt gebruikt is de [PokeAPI](https://pokeapi.co/). Deze API heeft alle informatie over alle pokemon als data. 

PokeAPI geeft de volgende data:
* Een lijst met alle pokemon
* Een specifieke pokemon, met al zijn data (e.g. base speed, ability's en pokemon sprites.)

Restrictions: Er kunnen maximaal 100 API requests per IP-Adres per minuut gedaan worden. Verder staat alle informatie op de site. Voor de documentatie van deze API verwijs ik je naar de [Documentatie](https://pokeapi.co/docs/v2.html).

## 5. Future Plans
- Mogelijkheid om op pokemon te drukken voor alle informatie.
- Zoekbalk voor het zoeken naar pokemon.

## Extra: Grading
Naast dat de site goed werkt, voldoet de site aan alle gestelde eisen. Hieronder een korte toelichting:

**1.** Naar mijn mening is de code duidelijk te begrijpen en zit er een logische structuur in. Ook wordt er gebruik gemaakt van comments, zodat het overnemen van de code makkelijk is.

**2.** Er wordt in mijn code amper gebruik gemaakt van de globale scope, behalve voor de data uit de PokeAPI.

**3.** Ik heb me verdiept in de API en gebruik de meest efficiente manier van data ophalen. Het is alleen mogelijk om alle pokemon data op te vragen via de PokeAPI.

**4.** Voor het verwerken van de data heb ik andere slimme methodes gebruikt om JSON data te manipuleren. Een van die methodes is hieronder te zien.
```javascript
    pokeName = UpperCaseFirstLetter(data['name']);
	imgUrl = 			data['sprites']['front_default'];
	Hitpoints = 		data['stats'][5]['base_stat'];
	Attack = 			data['stats'][4]['base_stat'];
	Defence = 			data['stats'][3]['base_stat'];
	SpecialAttack = 	data['stats'][2]['base_stat'];
	SpecialDefence = 	data['stats'][1]['base_stat'];
	Speed = 			data['stats'][0]['base_stat'];
```

**5.** Voor het renderen van de data naar HTML heb ik de micro library HandleBars gebruikt. Code daarvan is hieronder te zien:
```javascript
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
```

**6.** Voor de routing heb ik de micro library Routie.js gebruikt. Code daarvan is hieronder te zien:
```javascript
routie({
    'home': function() {
		route.allPokemon();
    },
    'pokemon/?:id': function(id) {
		id = id.substr(4) // '?:id=8' -> '8'
    	route.pokemonID(id);
	},
	'search/:name': function(name) {
		route.pokemonName(name);
	}
});
```

**7.** Omdat de applicatie relatief simpel is, is het duidelijk wat er van de gebruiker verwacht wordt.

**8.** Ook heb ik feedback toegepast door een laad icoon tijdens het laden.

