document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    $(document).on('pageshow', '#map-page', function(){
        InitializeMap();
    });

    function InitializeMap(){

        /*
        * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
        * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
        */
    	
        var defaultLatLng = new google.maps.LatLng(51.687968, 5.286327);  // Default to Hollywood, CA when no geolocation support

    	if ( !navigator.geolocation ) {
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

    	function drawMap(latlng) {
    		
            console.log(latlng);
    		var myOptions = {
    			zoom: 16,
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

    };// End CreateMap
    
}