document.addEventListener("deviceready", onDeviceReady, false);

var apiBaseUrl = 'http://pokeapi.co/api/v2/';

function onDeviceReady() {


    var pStore = window.localStorage;
   
    if(pStore.getItem('pokemon')){
        console.log('Current Pokémon in localStorage');

        var pokemon = JSON.parse(pStore.getItem('pokemon'));

        for(i = 0; i < pokemon.length; i++){
            console.log(pokemon[i]);
        }
        console.log(pokemon.length);
        console.log(pokemon);
    }
    else {
        console.log('Geen value');
        pStore.setItem('pokemon', JSON.stringify([]));
    }

    $(document).on('pageshow', '#mypokemon-page', function(){
        console.log('ShowMyPokemon');
    });

    $(document).on('pagebeforeshow', '#mypokemon-page', function(){
        console.log('Before show!!!');
        FetchPokemon(1, 3);
    });

   

    function FetchPokemon(startId, endId){

        console.log('Jajaa');
        for (pokemonId = startId; pokemonId <= endId; pokemonId++) {

            $.ajax({
                url : apiBaseUrl + 'pokemon/1/',
                type : 'GET',
                success : function(result){
                    console.log('Ajax call');
                    console.log(result);
                    SaveDataToLocalStorage(pokemon);
                },
                error : function(result){}
            });
        }

        console.log(pStore.getItem('pokemon'));
        
    }

    function SaveDataToLocalStorage(pokemon){

        var a = [];

        // Parse the serialized data back into an aray of objects
        a = JSON.parse(pStore.getItem('pokemon'));

        // Push the new data (whether it be an object or anything else) onto the array
        a.push(JSON.stringify(pokemon));
        
        // Re-serialize the array back into a string and store it in localStorage
        pStore.setItem('pokemon', JSON.stringify(a));
    }
}