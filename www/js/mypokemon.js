document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    var myPokemon = [];

    $(document).on('pageshow', '#mypokemon-page', function(){
        console.log('ShowMyPokemon');
        CreateMyPokémonList();
    });

    function CreateMyPokémonList(){

        console.log('CreateMyPokémonList');

        $('#mypokemon-page ul').empty();

        for(i = 0; i < 10; i++){

            GetPokemonById(i, function(pokemon){
                $('#mypokemon-page ul').append('<li>' + pokemon.name + '</li>');
            });
                
        }
        
    }
}