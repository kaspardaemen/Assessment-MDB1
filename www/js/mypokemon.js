document.addEventListener("deviceready", onDeviceReady, false);

var apiBaseUrl = 'http://pokeapi.co/api/v2/';

function onDeviceReady() {

    //window.localStorage.removeItem('my_pokemon');
    var pStore = window.localStorage;
    var myPokemon = [];

    // Get my Pokémon from localStorage
    if(pStore.getItem('my_pokemon')){
        
        myPokemon = JSON.parse(pStore.getItem('my_pokemon'));

        console.log(myPokemon.length);
        for(i = 0; i < myPokemon.length; i++){
            console.log('Hoi');
            //var pokemon = JSON.parse(myPokemon[i]);
            //myPokemon[i] = pokemon;
        }
        console.log('Current Pokémon in localStorage');
        console.log(myPokemon);
    }
    
    $(document).on('pageshow', '#mypokemon-page', function(){
        console.log('ShowMyPokemon');
        CreateMyPokémonList();
    });


    $(document).on('pagebeforeshow', '#mypokemon-page', function(){
        console.log('Before show!!!');
        FetchPokemon(1, 3);
    });

    function CreateMyPokémonList(){

        console.log('CreateMyPokémonList');
        if(myPokemon.length == 0){
            $('#mypokemon-page ul').append('<li>Je hebt geen Pokémon</li>');
        }
        else {
            for(i = 0; i < myPokemon.length; i++){
                $('#mypokemon-page ul').append('<li>' + myPokemon[i].name + '</li>');
            }
        }
    }

   

    function FetchPokemon(startId, endId){

        for (pokemonId = startId; pokemonId <= endId; pokemonId++) {

            $.ajax({
                url : apiBaseUrl + 'pokemon/' + pokemonId,
                type : 'GET',
                success : function(result){
                    myPokemon.push(JSON.parse(result));
                    SaveDataToLocalStorage('my_pokemon', myPokemon);
                },
                error : function(result){}
            });
        }
        
    }

    function SaveDataToLocalStorage(key, data){

        console.log('Save to LocalStorage');
        
        // Re-serialize the array back into a string and store it in localStorage
        pStore.setItem(key, JSON.stringify(myPokemon));
    }
}