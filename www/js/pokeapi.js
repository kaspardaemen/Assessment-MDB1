document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	
		$(document).on('vclick', '#reversebutton', function(){
			$('#pokemon-data').empty();
		});

	 //event: op een pokemon geklinkt. detail pagina opvragen
	    $(document).on('swipeleft', '#pokemon-list li a', function(){  

	    	var url = $(this).attr('data-url');
	       	console.log("LOG VAN KASPAR:",name); 
	        $.mobile.changePage( "#headline-pokemon", { transition: "slide", changeHash: false });
	        $.mobile.loading( 'show', {
				text: 'Momentje...',
				textVisible: true,
				theme: 'b',
				html: ""
			});

			 $.ajax({
			      url : url,
			      type : 'GET',
			      success : function(result){

			         //naam
	                $('#pokemon-data').append('<li><img src="'+result.sprites.front_default+'" /></li>');
	                $('#pokemon-data').append('<li>Naam: '+result.name+'</li>');
	                $('#pokemon-data').append('<li>Lengte: '+result.height+'</li>');
	               	$('#pokemon-data').append('<li>Gewicht: '+result.weight+'</li>');  

	                //types
	                $('#pokemon-data').append('<li id="types">Type: ');  
	                
	                $.each(result.types, function(i, row){

	                	$('#types').append(row.type.name+', '); 
	                });
	        		$('#pokemon-data').append('</li>');
	                		
	                $('#pokemon-data').listview('refresh'); 
	                $.mobile.loading('hide');

			      },
			      error : function(result){}
			    });  
/*
			 GetPokemonById( name ,function(result){
                $('#pokemon-data').empty();
					
	                //naam
	                $('#pokemon-data').append('<li><img src="'+result.sprites.front_default+'" /></li>');
	                $('#pokemon-data').append('<li>Naam: '+result.name+'</li>');
	                $('#pokemon-data').append('<li>Lengte: '+result.height+'</li>');
	               	$('#pokemon-data').append('<li>Gewicht: '+result.weight+'</li>'); 

	                //types
	                $('#pokemon-data').append('<li id="types">Type: ');  
	                
	                $.each(result.types, function(i, row){

	                	$('#types').append(row.type.name+', '); 
	                });
	        		$('#pokemon-data').append('</li>');
	                		
	                $('#pokemon-data').listview('refresh'); 
	                $.mobile.loading('hide');
            });*/

	       /* $.ajax({
				url: url ,
				dataType: "json",
				async: true,
				success: function (result) {

					$('#pokemon-data').empty();
					
	                //naam
	                $('#pokemon-data').append('<li><img src="'+result.sprites.front_default+'" /></li>');
	                $('#pokemon-data').append('<li>Naam: '+result.name+'</li>');
	                $('#pokemon-data').append('<li>Lengte: '+result.height+'</li>');
	               	$('#pokemon-data').append('<li>Gewicht: '+result.weight+'</li>'); 

	                //types
	                $('#pokemon-data').append('<li id="types">Type: ');  
	                
	                $.each(result.types, function(i, row){

	                	$('#types').append(row.type.name+', '); 
	                });
	        		$('#pokemon-data').append('</li>');
	                		
	                $('#pokemon-data').listview('refresh'); 
	                $.mobile.loading('hide');
	          
	                  

	               },
	               error: function (request,error) {
	               	console.log('Network error has occurred please try again!');  
	               }
	           });*/


	    });

	$(document).on('pageinit', '#pokemons', function(){ 

		var storage = window.localStorage;   
		if(storage.getItem('pokemons') === null ){
			var url = 'http://pokeapi.co/api/v2/', 
			mode = 'pokemon?limit=20'      

			$.ajax({
				url: url + mode,
				beforeSend : function() {$.mobile.loading('show')},
				complete   : function() {$.mobile.loading('hide')}, 
				dataType: "json",
				async: true,
				success: function (result) {

	            	//store in temp pokemonInfo
	            	$.each(result.results, function(i, row) {
		            		
		            		pokemonInfo.results.push(row); 
		            	});
	            	pokemonInfo.next = result.next;
	            	
	               	//store local
	               	storage.setItem('pokemons', JSON.stringify(result));
	               	// generate list in dom
	               	$.each(result.results, function(i, row) {
						$('#pokemon-list').append('<li><a data-name='+row.name+' data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>'); 
		
					});

					$('#pokemon-list').listview('refresh');           

	               },
	               error: function (request,error) {
	               	console.log('Network error has occurred please try again!');  
	               }
	           });

		} else{
			var retrievedObject = storage.getItem('pokemons');
			console.log("wat krijgen we: "+ JSON.parse(retrievedObject));
			pokemonInfo.next = JSON.parse(retrievedObject).next;

			generatePokeList(JSON.parse(retrievedObject)); 
			
		}        
});

// generate list in dom
function generatePokeList(result) {
	var array = result;
	//console.log("wat gaat er fout: "+ result['results'] + result.results, result);   
	$.each(result.results, function(i, row) {
		console.log(row);
		
		$('#pokemon-list').append('<li><a data-name='+row.name+' data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>'); 
		
	});

	$('#pokemon-list').listview('refresh');     
}


/* check scroll function */
function checkScroll() {

	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
	screenHeight = $.mobile.getScreenHeight(),
	contentHeight = $(".ui-content", activePage).outerHeight(),
	header = $(".ui-header", activePage).outerHeight() - 1,
	scrolled = $(window).scrollTop(),
	footer = $(".ui-footer", activePage).outerHeight() - 1,
	scrollEnd = contentHeight - screenHeight + header + footer;

	if (activePage[0].id == "pokemons" && scrolled >= scrollEnd) {
		
		addMore();
	}
}

/* add more function */
	function addMore() {
		$(document).off("scrollstop");
		 $.mobile.loading( 'show', {
				text: 'Niewe data laden...',
				textVisible: true,
				theme: 'b',
				html: ""
			})
		var storage = window.localStorage; 
		var retrievedObject = storage.getItem('pokemons');
		setTimeout(function() {
			
			$.ajax({

				url: pokemonInfo.next,

				dataType: "json",
				async: true,
				success: function (result) {

		            	//store in temp pokemonInfo
		            
		            	pokemonInfo.next = result.next;
		            	$.each(JSON.parse(retrievedObject).results, function(i, row) { 
		            		
		            		pokemonInfo.results.push(row); 
		            	});
		            	$.each(result.results, function(i, row) {
		            		
		            		pokemonInfo.results.push(row);
		            	});
		            	storage.setItem('pokemons', JSON.stringify(pokemonInfo)); 
		            	
		            	console.log("dit hebben we:" + JSON.stringify(storage.getItem('pokemons'))); 
		               	// generate list in dom
		               		$.each(result.results, function(i, row) {
								$('#pokemon-list').append('<li><a data-name='+row.name+' data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>');  
		
							});

						$('#pokemon-list').listview('refresh');         
		               	$.mobile.loading("hide");
		               	$(document).on("scrollstop", checkScroll);             

		               },
		               error: function (request,error) {
		               	console.log('Network error has occurred please try again!');  
		               }
		           });
	 

	}, 500);
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

/* attach if scrollstop for first time */
$(document).on("scrollstop", checkScroll);

}

var pokemonInfo = {
	results : [], 
	url: null,
	next: null
}

var pokemon = {

	id : null,
	sprite: null 


}