document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    // Define the LatLng coordinates for the polygon's path.
    var denBoschCoords = [
        { lat: 51.691074816112994, lng : 5.249748229980469},
        { lat: 51.70990601725464, lng : 5.263996124267578},
        { lat: 51.711395156348466, lng : 5.293178558349609},
        { lat: 51.70628933248913, lng : 5.310859680175781},
        { lat: 51.694160690988255, lng : 5.319957733154297},
        { lat: 51.68415743573173, lng : 5.313434600830078},
        { lat: 51.677664778834455, lng : 5.292148590087891},
    ];

    $(document).on('pageshow', '#map-page', function(){
        console.log('ShowMap');
        InitializeMap();

    });

    function InitializeMap(){

        console.log('InitializeMap');

        /*
        * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
        * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
        */
    	
        var defaultLatLng = new google.maps.LatLng(51.687968, 5.286327);  // Default to Hollywood, CA when no geolocation support

    	/*if (navigator.geolocation ) {
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
        }*/

        drawMap(defaultLatLng);

    	function drawMap(latlng) {
    		
            console.log(latlng);
    		var myOptions = {
    			zoom: 16,
    			center: latlng,
    			mapTypeId: google.maps.MapTypeId.ROADMAP
    		};
    	       
            var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

            // Construct the polygon.
            var denBoschPolygon = new google.maps.Polygon({
                paths: denBoschCoords,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.10
            });

            denBoschPolygon.setMap(map);

            // Add an overlay to the map of current lat/lng
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: "Greetings!"
            });
    	}

    };// End CreateMap
    
}