
document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
 	 $(document).on('pageinit', '#races', function(){      
    var url = 'https://rocky-meadow-19237.herokuapp.com/',
    mode = 'api/races';       
        

        $.ajax({
            url: url + mode,
            dataType: "json",
            async: true,
            success: function (result) {
               raceInfo.result = result;
               console.log('hallo hallo'+JSON.stringify(raceInfo.result)) ;
               $.each(raceInfo.result, function(i, row) {
                    console.log("in de rij"); 
                
                    $('#race-list').append('<li><a href="" data-id="' + row.id + '"><h3>' + row.name + '</h3><p>Begint om: ' + row.started_at + '</i></p></a></li>');  
                });
                  $('#race-list').append("<a href='' id='addRace' data-role='button'>Nieuwe toevoegen</button>");
                $('#race-list').listview('refresh');
           },
           error: function (request,error) {
                console.log('Network error has occurred please try again!');
            }
        });         
    });
	
	$(document).on('vclick', '#addRace', function(){  
		var url = 'https://rocky-meadow-19237.herokuapp.com/',
    	mode = '';     
        $.ajax({
		    type       : "POST",
		    url        :  url+mode,
		    crossDomain: true,
		    beforeSend : function() {$.mobile.loading('show')},
		    complete   : function() {$.mobile.loading('hide')},
		    data       : {_id : '5700379905aeee282749c05b1', name : 'Zuipen tot we kruipen', _v : '1', participants : ''  },
		    dataType   : 'json',
		    success    : function(response) {
		        //console.error(JSON.stringify(response));
		        alert('Works!');
		    },
		    error      : function() {
		        //console.error("error");
		        alert('Now working!');                  
		    }
		}); 
    });
 	  


 }

  var raceInfo = {
        id : null, 
        result : null
    } 