

document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {

    $(document).on('vclick', '#kroeg-list li a', function(){  

        kroegInfo.id = $(this).attr('data-id');
        $.mobile.changePage( "#headline-kroeg", { transition: "slide", changeHash: false });
    });
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    $(document).on('pageinit', '#indebuurt', function(){      
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
    radius = '&radius=5000',
    location = '&location=51.788394,%205.848014', 
    type= '&type=cafe',        
    key = 'key=AIzaSyDZHWVrdN6pma0WKoAVhV2zEwHywXETnh0';        
        

        $.ajax({
            url: url + key + location + radius + type ,
            dataType: "json",
            async: true,
            success: function (result) {
               kroegInfo.result = result.results;

               $.each(result.results, function(i, row) {
                    //console.log(JSON.stringify(row)); 
                    var icon = row.icon;
                    
                    if (row.hasOwnProperty('photos')) {
                        console.log(imgUrl.url + imgUrl + row.photos[0].photo_reference + imgUrl.key); 
                        icon = imgUrl.url + row.photos[0].photo_reference + imgUrl.key; 
                    };
                    $('#kroeg-list').append('<li><a href="" data-id="' + row.id + '"><img src="'+icon+'"/><h3>' + row.name + '</h3><p>' + row.rating + '<i class="fa fa-star"></i></p></a></li>');  
                });
                $('#kroeg-list').listview('refresh');
           },
           error: function (request,error) {
                console.log('Network error has occurred please try again!');
            }
        });         
    });

    $(document).on('pagebeforeshow', '#headline-kroeg', function(){   
       
        $('#kroeg-data').empty();
        $.each(kroegInfo.result, function(i, row) {
            
            if(row.id == kroegInfo.id) {
                
                var icon = row.icon;
                    console.log(JSON.stringify(row));
                    if (row.hasOwnProperty('photos')) {
                        console.log(imgUrl.url + imgUrl + row.photos[0].photo_reference + imgUrl.key);    
                        icon = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=' + row.photos[0].photo_reference + imgUrl.key; 
                    };
                $('#kroeg-data').append('<li><img src="'+icon+'"></li>');
                $('#kroeg-data').append('<li>Naam: '+row.name+'</li>');
                $('#kroeg-data').append('<li>Beoordeling: '+row.rating+'</li>');
                $('#kroeg-data').append('<li>Adres: '+row.vicinity+'</li>');   
                $('#kroeg-data').append('<li>place_id : '+row.place_id+'</li>');             
                $('#kroeg-data').listview('refresh');              
            }
        });    
    });

    

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }



        
}



    var imgUrl = {
        url : 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=',
        key : '&key=AIzaSyDZHWVrdN6pma0WKoAVhV2zEwHywXETnh0'
    }

    var kroegInfo = {
        id : null,
        result : null
    } 
