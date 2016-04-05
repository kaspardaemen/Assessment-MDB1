document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

		$(document).on('vclick', '#reversebutton', function(){
			$('#pokemon-data').empty();
		});

	 //event: op een pokemon geklinkt. ID van het aangeklikte id vastleggen
	    $(document).on('vclick', '#pokemon-list li a', function(){  

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
	                console.log(result.stats);
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
		if(storage.getItem('time-pokemonspok-set') === null){
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
	            	pokemonInfo.results = result;
	            	pokemonInfo.next = result.next;

	               	//store local
	               	storage.setItem('pokemons', result);
	               	storage.setItem('time-pokemon-set', event.timeStamp)
	               	// generate list in dom
	               	generatePokeList(result);          

	               },
	               error: function (request,error) {
	               	console.log('Network error has occurred please try again!');  
	               }
	           });

		} else{
			console.log("we zien iets in geheugen!");
			
		}        
});

// generate list in dom
function generatePokeList(result) {
	$.each(result.results, function(i, row) {
		$('#pokemon-list').append('<li><a data-url='+row.url+' href="" ><h3>' + row.name + '</h3></a></li>'); 
		
	});

	$('#pokemon-list').listview('refresh');     
}


function addMore() {


	var items = '',
	last = $("li", page).length,
	cont = last + 50;
	for (var i = last; i < cont; i++) {
		items += "<li>pokemon" + i + "</li>"; 
	}
	$("#list", page).append(items).listview("refresh");


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
		console.log("adding...");
		addMore(activePage);
	}
}

/* add more function */
	function addMore(page) {
		$(document).off("scrollstop");
		$.mobile.loading("show");
		setTimeout(function() {
			console.log("next: " + pokemonInfo.next);
			$.ajax({

				url: pokemonInfo.next,

				dataType: "json",
				async: true,
				success: function (result) {

		            	//store in temp pokemonInfo
		            	pokemonInfo.results = result.results;
		            	pokemonInfo.next = result.next;


		            	pokemonInfo.results = result.results;
		            	pokemonInfo.next = result.next;

		               	// generate list in dom
		               	generatePokeList(result); 
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
	results : null, 
	url: null,
	next: null
}

var pokemon = {

	id : null,
	sprite: null 


}