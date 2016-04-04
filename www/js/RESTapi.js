
 	  
  
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

 	 $(document).on('pageinit', '#add-race', function(){      
   		var url = 'https://rocky-meadow-19237.herokuapp.com/',
    	mode = 'api/races';       
        
        $.ajax({
            url: url + mode,
            dataType: "json",
            async: true,
            success: function (result) {
               raceInfo.result = result;
              
               $.each(raceInfo.result, function(i, row) {
                     $.each(row.waypoints, function(j, waypoint) {
                     	$('#waypoint-select').append('<option  data-id="' + waypoint._id + '">'+waypoint.name+'</option>');   
                     });
                
                    
                });
                 
                $('#waypoint-select').selectmenu('refresh');
           },
           error: function (request,error) {
                console.log('Network error has occurred please try again!');
            }
        });         
    });
	
	//de deail gegevens van één race toevoegen
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
		
		var url = 'https://rocky-meadow-19237.herokuapp.com/',
    	mode = 'api/races',
    	name = $('#add-race-name').val();    
        $.ajax({
		    type       : "POST",
		    url        :  url+mode,
		    
		    beforeSend : function() {$.mobile.loading('show')},
		    complete   : function() {$.mobile.loading('hide')},
		    data       : { name : $('#add-race-name').val(), waypoints: [ {
                _id: "57003d4219464d540d7c3ca5",
                longitude: "50000",
                latitude: "50000",
                name: "'t Paultje"
            }] },   
		    dataType   : 'json',
		    success    : function(response) { 
		        //console.error(JSON.stringify(response));
		        alert('Works!');
		    },
		    error      : function() {
		        //console.error("error");
		        alert('Not working!');                  
		    } 
		}); 
    });

   


 }




  var raceInfo = {
        id : null, 
        result : null
    } 