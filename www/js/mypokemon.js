document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    $(document).on('pageshow', '#mypokemon-page', function(){
        console.log('ShowMyPokemon');
        CreateMyPokémonList();
    });

    function CreateMyPokémonList(){

        console.log('CreateMyPokémonList');
        console.log(MyPokemon);

        $('#mypokemon-page ul').empty();

        for(i = 0; i < MyPokemon.length; i++){

            GetPokemonById(MyPokemon[i].id, function(pokemon){
                $('#mypokemon-page ul').append('<li>' + pokemon.name + '</li>');
            });
                
        }  
    }
}