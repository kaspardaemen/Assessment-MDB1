document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    /*$('body').load('map.html', function (result) {
        $('body').append(result);
   // $(this).trigger('create');
});*/
    // 
    $(document).on('vclick', '#nav-map', function(){  
    	console.log('Je moeder is je oma');
       // $.mobile.pageContainer.pagecontainer('load', '../map.html', { } );
    	//$.mobile.pageContainer.pagecontainer('change', '#pokemap', {} );
    });
    
    /*
    * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
    * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
    */

    $.mobile.pageContainer.on( "load", "#pokemap", function() {
    	console.log("POKEmap paginit");
    	CreateMap();
	});

	function CreateMap(){

        console.log('CreateMap');
		var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support

		if ( navigator.geolocation ) {
			function success(pos) {
                console.log('Using navigator.geolocation' + pos.coords.latitude);
				// Location found, show map with these coordinates
            	drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        	}
        	function fail(error) {
            	drawMap(defaultLatLng);  // Failed to find location, show default map
        	}
        	
        	// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        	navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    	} else {
        	drawMap(defaultLatLng);  // No geolocation support, show default map
    	}
	}

	function drawMap(latlng) {
		
        console.log(latlng);
		var myOptions = {
			zoom: 10,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	       
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
	}
    
}