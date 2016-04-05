document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {

 	$(document).on('pageinit', '#pokemons', function(){ 
 	 	
 	 	var storage = window.localStorage;   
 	 	if(!storage.getItem('time-pokemonspok-set') === null){
 	 		console.log("een time-pokemon-set niet gevonden!");
 	 		var diff = event.timeStamp - storage.getItem('time-pokemon-set');
 	 		
 	 	} else if(diff < 60000){
 	 			console.log("Niet langer dan 1 minuut geleden!");
 	 			pokemonInfo.result = storage.getItem('pokemons');
 	 			$.each(pokemonInfo.result, function(i, row) {
                 	$('#pokemon-list').append('<li><a href=""><h3>' + row.name + '</h3></li>');   
          		});
                 $('#pokemon-list').append('<p>uit de local gevist!!</p>');
       			$('#pokemon-list').listview('refresh');  
 	 	} else{
 	 	  
	   		var url = 'http://pokeapi.co/api/v2/', 
	    	mode = 'pokemon?limit=60'      
	        
	        $.ajax({
	            url: url + mode,
	            beforeSend : function() {$.mobile.loading('show')},
			    complete   : function() {$.mobile.loading('hide')}, 
	            dataType: "json",
	            async: true,
	            success: function (result) {
	            	
	            	//store in temp pokemonInfo
	               	pokemonInfo.results = result.results;
	               	pokemonInfo.next = result.next;
	              
	               	//store local
	               	storage.setItem('pokemons', result);
	               	storage.setItem('time-pokemon-set', event.timeStamp)
	               	// generate list in dom
	                $.each(pokemonInfo.results, function(i, row) {
                  
                		
              			$('#pokemon-list').append('<li><a href="" ><h3>' + row.name + '</h3></a></li>');  
          			});

                 
       				$('#pokemon-list').listview('refresh');               
	               
	           },
	           error: function (request,error) {
	                console.log('Network error has occurred please try again!');  
	            }
	        });
        }         
    });


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
  $.mobile.loading("show", {
    text: "loading more..", 
    textVisible: true
  });
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
	           
	               	// generate list in dom
	                $.each(pokemonInfo.results, function(i, row) {
                  
                		
              			$('#pokemon-list').append('<li><a href="" ><h3>' + row.name + '</h3></a></li>');  
          			});

                 
       				$('#pokemon-list').listview('refresh');  
       				$.mobile.loading("hide");
    $(document).on("scrollstop", checkScroll);             
	               
	           },
	           error: function (request,error) {
	                console.log('Network error has occurred please try again!');  
	            }
	        });
    $("#pokemon-list", page).append(items).listview("refresh"); 
     
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