document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {

    //krijg de details van een café
    $(document).on('vclick', '#pokemap', function(){  
    	console.log('Je moeder is je oma');
    	$.mobile.changePage( "#pokemap", { transition: "slide", changeHash: false });
    });


    $.mobile.pageContainer.pagecontainer('load', '../map.html');    
}

/*console.log('run MAP.js');

document.addEventListener("deviceready", map, false);

function map() {

	$(document).on('pageinit', '#pokemap', function(){ 
		console.log('POKEMAP');
	});

	/*console.log('MAP onDeviceReady');
	$(document).on("loadmap", function(){
		console.log('loadmap page!!!!');
		$.mobile.loadPage("../map.html");
		alert('dsfsdf');
	});*/
//});

/*
function initMap() {
    var mapDiv = document.getElementById('pokemap');
    var map = new google.maps.Map(mapDiv);
};


document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
 	$(document).ready(function(){


 	});

	$( document ).on( "pageinit", "#map-page", function() {





	    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
	    if ( navigator.geolocation ) {
	        function success(pos) {
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
	            title: "Hier ben ik!"
	        });
	    }
	});

 }*/