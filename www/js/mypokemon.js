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

        if(MyPokemon.length == 0){
            $('#mypokemon-page ul').append('<li>Je hebt nog geen Pokémon gevangen!</li>');
            return;
        }

        for(i = 0; i < MyPokemon.length; i++){

            GetPokemonById(MyPokemon[i].id, function(pokemon){
                $('#mypokemon-page ul').append('<li>' + pokemon.name + '</li>');
            });
                
        }  
    }
}