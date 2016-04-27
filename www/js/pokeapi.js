document.addEventListener("deviceready", onDeviceReady, false);

var pokemonDetails; // Opgeslagen details van een Pokémon

function onDeviceReady() {

	$(document).on('vclick', '#reversebutton', function(){
		$('#pokemon-data').empty();
	});

	$(document).on('vclick' , '#wikiButton', function (e) {
		e.preventDefault();

		// Calls Your Function with the URL from the custom data attribute 
		window.open($(e.currentTarget).attr('href'), '_system', '');

	});

	// Pokémin detailpagina DOM geladen
	$(document).on('create', '#pokemon-details', function(event){

		$('#pokemon-details ul').append('<li><img src="'+pokemonDetails.sprites.front_default+'" /></li>');
		$('#pokemon-details ul').append('<li>Naam: ' + pokemonDetails.name + '</li>');
		$('#pokemon-details ul').append('<li>Lengte: ' + pokemonDetails.height + '</li>');
		$('#pokemon-details ul').append('<li>Gewicht: ' + pokemonDetails.weight + '</li>');

		//types
		$('#pokemon-details ul').append('<li id="types">Type: ');

		$.each(pokemonDetails.types, function(i, row){
			$('#types').append(row.type.name+', ');
		});

		$('#pokemon-details ul').append('</li>');
		$('#pokemon-details ul').listview('refresh');
		$('#pokemon-details #wikiButton').attr('href','http://pokemon.wikia.com/wiki/' + pokemonDetails.name);
		$.mobile.loading('hide');
	});

	//event: op een pokemon geklinkt. detail pagina opvragen
	$(document).on('swipeleft', '#pokemon-list li a', function(){  

		$.ajax({
			url : $(this).attr('data-url'),
			beforeSend : function(result){
				$.mobile.loading('show', {
					text: 'Pokémon laden',
					textVisible: true,
					html: ""
				});
			},
			success : function(result){
				pokemonDetails = result;
				$.mobile.pageContainer.pagecontainer('change', "pokemon_details.html");
			},
		});
	});

	

	$(document).on('pagecreate', '#pokemon-list', function(){ 

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
						$('#pokemon-list ul').append('<li><a data-name='+row.name+' data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>'); 
		
					});

					$('#pokemon-list ul').listview('refresh');           

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
		
		$('#pokemon-list ul').append('<li><a data-name='+row.name+' data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>'); 
		
	});

	$('#pokemon-list ul').listview('refresh');     
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

	if (activePage[0].id == "pokemon-list" && scrolled >= scrollEnd) {
		
		addMore();
	}
}

/* add more function */
	function addMore() {
		$(document).off("scrollstop");
		 $.mobile.loading( 'show', {
				text: 'Meer Pokémon downloaden',
				textVisible: true,
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
								$('#pokemon-list ul').append('<li><a data-name='+row.name+' data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>');  
		
							});

						$('#pokemon-list ul').listview('refresh');         
		               	$.mobile.loading("hide");
		               	$(document).on("scrollstop", checkScroll);             

		               },
		               error: function (request,error) {
		               	console.log('Network error has occurred please try again!');  
		               }
		           });
	 

	}, 500);
}


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