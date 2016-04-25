document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    // My Pokémon List Page pageshow Handler
    $(document).on('create', '#mypokemon-page', function(){
        CreateMyPokémonList();
    });

    // Fill list with caught Pokémon
    function CreateMyPokémonList(){


        $('#mypokemon-page ul').empty();

        if(MyPokemon.length <= 0){
            $('#mypokemon-page ul').append('<li>Je hebt nog geen Pokémon gevangen!</li>');
        }
        else{
            $.each(MyPokemon, function(index, value){
                $('#mypokemon-page ul').append('<li>\
                    <img src="'+ value.sprites.front_default +'" />' + value.name + '</li>');
            });
        }

        $('#mypokemon-page ul').listview('refresh');  
    }
}