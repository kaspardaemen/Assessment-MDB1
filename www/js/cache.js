document.addEventListener("deviceready", onDeviceReady, false);

var apiBaseUrl = 'http://pokeapi.co/api/v2/';
var pStore = window.localStorage;
var Pokemon = [];
var MyPokemon = [];

// All Pokémon
if(pStore.getItem('pokemon')){
  Pokemon = JSON.parse(pStore.getItem('pokemon'));

  console.log('Current Pokémon in localStorage');
  console.log(Pokemon);
}

// My Pokémon
if(window.localStorage.getItem('my_pokemon')){
  MyPokemon = JSON.parse(window.localStorage.getItem('my_pokemon'));

  console.log('Current Pokémon in localStorage');
  console.log(MyPokemon);
}

var GetPokemonById = function(pokemonId, callback){

  // Search in cache
  found = Pokemon.filter(function( obj ) {
    console.log('Searching Pokémon in cache');
    return obj.id == pokemonId || obj.name == pokemonId; 
  });

  // Nothing found in cache
  if(found.length == 0){
    console.log('Call Pokémon API');

    $.ajax({
      url : apiBaseUrl + 'pokemon/' + pokemonId,
      type : 'GET',
      success : function(result){



        var parsedresult = result; 


        if(result.detail == 'Not found.')
        {
          return;
        }

        Pokemon.push(result);
        window.localStorage.setItem('pokemon', JSON.stringify(Pokemon));

        console.log(result);
        callback(result);

      },
      error : function(result){}
    });
  }
  else {
    console.log('Maak geen call Pokémon zit in cache');
    callback(found[0])
  }

};

function onDeviceReady() {

};


	

 	
