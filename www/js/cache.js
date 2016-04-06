document.addEventListener("deviceready", onDeviceReady, false);

var apiBaseUrl = 'http://pokeapi.co/api/v2/';
var pStore = window.localStorage;
var Pokemon = [];

// Get my Pokémon from localStorage
if(pStore.getItem('pokemon')){
  Pokemon = JSON.parse(pStore.getItem('pokemon'));

  console.log('Current Pokémon in localStorage');
  console.log(Pokemon);
}

var GetPokemonById = function(pokemonId, callback){

  found = Pokemon.filter(function( obj ) {
    console.log('Searching Pokémon in cache');
    return obj.id == pokemonId || obj.name == pokemonId; 
  });

  if(found.length == 0){
    console.log('Call Pokémon API');

    $.ajax({
      url : apiBaseUrl + 'pokemon/' + pokemonId,
      type : 'GET',
      success : function(result){

        var parsedresult = JSON.parse(result)

        if(parsedresult.detail == 'Not found.')
        {
          return;
        }

        Pokemon.push(parsedresult);
        SavePokemon();
        callback(parsedresult);

      },
      error : function(result){}
    });
  }
  else {
    console.log('Maak geen call Pokémon zit in cache');
    callback(found[0])
  }

};

function SavePokemon(){
  // Re-serialize the array back into a string and store it in localStorage
  pStore.setItem('pokemon', JSON.stringify(Pokemon));
}

function onDeviceReady() {

  GetPokemonById(1, function(pokemon){
    console.log('Pokémon opgehaald:');
    console.log(pokemon);
  });

  GetPokemonById(100, function(pokemon){
    console.log('Pokémon opgehaald:');
    console.log(pokemon);
  });
};


	

 	
