document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

		$(document).on('vclick', '#reversebutton', function(){
			$('#pokemon-data').empty();
		});

	 //event: op een pokemon geklinkt. ID van het aangeklikte id vastleggen
	    $(document).on('tap', '#pokemon-list li a', function(){  

	    	var url = $(this).attr('data-url'); 
	       
	        $.mobile.changePage( "#headline-pokemon", { transition: "slide", changeHash: false });
	        $.mobile.loading('show');

	        $.ajax({
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
	           });


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
						$('#pokemon-list').append('<li><a data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>'); 
		
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
		
		$('#pokemon-list').append('<li><a data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>'); 
		
	});

	//$('#pokemon-list').listview('refresh');     
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
		
		addMore(activePage);
	}
}

/* add more function */
	function addMore(page) {
		$(document).off("scrollstop");
		$.mobile.loading("show");
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
								$('#pokemon-list').append('<li><a data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>');  
		
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