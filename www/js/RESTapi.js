
 	  
  
document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
 	


 	 //event: op een race geklinkt. ID van het aangeklikte id vastleggen
	    $(document).on('vclick', '#race-list li a', function(){  

	        raceInfo.id = $(this).attr('data-id');
	       
	        $.mobile.changePage( "#headline-race", { transition: "slide", changeHash: false });
	    });

	 //krijg een lijst van alle races
 	 $(document).on('pageinit', '#races', function(){ 
 	 	console.log("ik kom hier hierr");
 	 	var storage = window.localStorage;   
 	 	if(!storage.getItem('time-race-set') === null){
 	 		console.log("een time-race-set niet gevonden!");
 	 		var diff = event.timeStamp - storage.getItem('time-race-set');
 	 		
 	 	} else if(diff < 60000){
 	 			console.log("Niet langer dan 1 minuut geleden!");
 	 			raceInfo.result = storage.getItem('races');
 	 			$.each(raceInfo.result, function(i, row) {
                 	$('#race-list').append('<li><a href="" data-id="' + row._id + '"><h3>' + row.name + '</h3><p>Begint om: ' + row.started_at + '</i></p></a></li>');  
          		});
                 $('#race-list').append('<p>uit de local gevist!!</p>')
       			$('#race-list').listview('refresh');  
 	 	} else{
 	 	  	console.log('toch maar met ajax');
	   		var url = 'https://rocky-meadow-19237.herokuapp.com/', 
	    	mode = 'api/races';       
	        
	        $.ajax({
	            url: url + mode,
	            beforeSend : function() {$.mobile.loading('show')},
			    complete   : function() {$.mobile.loading('hide')}, 
	            dataType: "json",
	            async: true,
	            success: function (result) {
	            	
	            	//store in temp raceInfo
	               	raceInfo.result = result;
	               	//store local
	               	storage.setItem('races', result);
	               	storage.setItem('time-race-set', event.timeStamp)
	               	// generate list in dom
	                $.each(raceInfo.result, function(i, row) {
                  
                
              			$('#race-list').append('<li><a href="" data-id="' + row._id + '"><h3>' + row.name + '</h3><p>Begint om: ' + row.started_at + '</i></p></a></li>');  
          			});

                 
       				$('#race-list').listview('refresh');              
	               
	           },
	           error: function (request,error) {
	                console.log('Network error has occurred please try again!');  
	            }
	        });
        }         
    });

 	/* //krijg een lijst van alle users
 	 $(document).on('pageinit', '#races', function(){      
   		var url = 'https://rocky-meadow-19237.herokuapp.com/',
    	mode = 'api/races';       
        
        $.ajax({
            url: url + mode,
            beforeSend : function() {$.mobile.loading('show')},
		    complete   : function() {$.mobile.loading('hide')}, 
            dataType: "json",
            async: true,
            success: function (result) {
               raceInfo.result = result;
               
               $.each(raceInfo.result, function(i, row) {
                  
                
                    $('#race-list').append('<li><a href="" data-id="' + row._id + '"><h3>' + row.name + '</h3><p>Begint om: ' + row.started_at + '</i></p></a></li>');  
                });
                 
                $('#race-list').listview('refresh');
           },
           error: function (request,error) {
                console.log('Network error has occurred please try again!');
            }
        });         
    });*/
	
	//lijst met waypoints ophalen voor race toevoegen
 	 $(document).on('pageinit', '#add-race', function(){      
   		 var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
    	radius = '&radius=5000',
    	location = '&location=51.788394,%205.848014', 
    	type= '&type=cafe',        
   		key = 'key=AIzaSyDZHWVrdN6pma0WKoAVhV2zEwHywXETnh0';  
        
        $.ajax({
            url: url + key + location + radius + type ,
             beforeSend : function() {$.mobile.loading('show')},
			  complete   : function() {$.mobile.loading('hide')}, 
            dataType: "json",
            async: true,
            success: function (result) {
               kroegInfo.result = result.results;
              
               $.each(result.results, function(i, row) { 
                    //console.log(JSON.stringify(row)); 
                  
                    
                    $('#add-race-waypoint-select').append('<option value='+ row.id +'>' + row.name + '</option>');  
                });
                $('#add-race-waypoint-select').selectmenu('refresh');   
           },
           error: function (request,error) {
                console.log('Network error has occurred please try again!');
            }
        });         
    });        
   
	
	//de deail gegevens van één race genereren
	$(document).on('pagebeforeshow', '#headline-race', function(){   
	      
	        $('#race-data').empty();
	        $.each(raceInfo.result, function(i, row) {
	          
	            if(row._id == raceInfo.id) {
	                //naam
	                 
	                $('#race-data').append('<li>Naam: '+row.name+'</li>');
	                //deelnemers
	                $('#race-data').append('<li>Deelnemers: ');
	                	/*$.each(row.particpants, function(j, participant){
	                		$('#race-data').append(participant.name+', '); 
	                	});*/
	                $('#race-data').append('</li>');
	                //kroegen
	                 $('#race-data').append('<li id="waypoint-data">Kroegen: ');
	                	$.each(row.waypoints, function(k, waypoint){
	                		 
	                		$('#waypoint-data').append(waypoint.name+', '); 
	                	});
	                $('#race-data').append('</li>');			
	                $('#race-data').listview('refresh');              
	            }
	        });    
    });
	
	$(document).on('vclick', '#addRace', function(){  
		var kroegen;
		 $.each(kroegInfo.result, function(i, row) {
		 	
		 	if($("#add-race-waypoint-select").val() == row.id){
		 		kroegen = {longitude : row.geometry.location.lng, latitude: row.geometry.location.lat , name: row.name, _id: row.id };
		 		
		 	}
		 });

		var url = 'https://rocky-meadow-19237.herokuapp.com/',
    	mode = 'api/races',
    	name = $('#add-race-name').val();  
    	
    	var data = {
    		name: name,
    		waypoints: kroegen
    	}
    	console.log('gaan we sturen:'+ JSON.stringify( data)); 


        
        $.ajax({
		    
		    url        :  "http://rocky-meadow-19237.herokuapp.com/api/races", 
		    type       :  "POST",  
		    
		    
		    beforeSend : function() {$.mobile.loading('show')},
		    complete   : function() {$.mobile.loading('hide')},
		    data       : data,
		    crossDomain: true,
		    dataType   : 'json',
		    jsonp: false,
		    success    : function(response) { 
		        //console.error(JSON.stringify(response));
		       console.log('success'); 
		    },
		    error      : function(response) {
		        //console.error("error");
		        console.log('response van Tobias:' + JSON.stringify(response));                 
		    } 
		}); 
    });

   


 }




  var raceInfo = {
        id : null, 
        result : null
    } 

  var kroegInfo = {
  	id : null,
  	result: null
  }  