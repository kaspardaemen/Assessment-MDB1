document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    var myPokemon = [];

    
    $(document).on('pageshow', '#mypokemon-page', function(){
        console.log('ShowMyPokemon');
        CreateMyPokémonList();
    });


    $(document).on('pagebeforeshow', '#mypokemon-page', function(){
        console.log('Before show!!!');
        //FetchPokemon(1, 3);
    });

    function CreateMyPokémonList(){

        console.log('CreateMyPokémonList');

        $('#mypokemon-page ul').empty();

        for(i = 0; i < 10; i++){

            GetPokemonById(i, function(pokemon){
                $('#mypokemon-page ul').append('<li>' + pokemon.name + '</li>');
            });
                
        }
        
        /*if(myPokemon.length == 0){
            $('#mypokemon-page ul').append('<li>Je hebt geen Pokémon</li>');
        }
        else {
            $('#mypokemon-page ul').empty();
            for(i = 0; i < myPokemon.length; i++){
                $('#mypokemon-page ul').append('<li>' + myPokemon[i].name + '</li>');
            }
        }*/
    }

    function FetchPokemon(startId, endId){

        for (pokemonId = startId; pokemonId <= endId; pokemonId++) {

            found = myPokemon.filter(function( obj ) {

                console.log('finding object');
                console.log(obj);
                return obj.id == pokemonId;
            });

            console.log(found);

            if(found.length > 0){
                console.log('Maak geen call Pokémon zit in cache');
            }

            else{
                console.log('Call Pokémon API');
                $.ajax({
                    url : apiBaseUrl + 'pokemon/' + pokemonId,
                    type : 'GET',
                    success : function(result){
                        var parsedresult = JSON.parse(result)

                        console.log('parsed result');
                        console.log(parsedresult);
                        myPokemon.push(parsedresult);

                        SaveDataToLocalStorage('my_pokemon', myPokemon);
                    },
                    error : function(result){}
                });
            }
        }
        
    }

    function SaveDataToLocalStorage(key, data){
        
        // Re-serialize the array back into a string and store it in localStorage
        pStore.setItem(key, JSON.stringify(myPokemon));
    }
}