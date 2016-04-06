document.addEventListener("deviceready", onDeviceReady, false);

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

var spawnPoints = [];
var attackingPokemon;

function onDeviceReady() {

    var attackingPokemon
    $(document).on('pageshow', '#map-page', function(){
        console.log('ShowMap');
        InitializeMap();
    });

    $(document).on('pageshow', '#catch-page', function(){
        console.log('Catch pokemon');
        $('#catch-page audio').attr({'src' : '../res/107-battle-vs-wild-pokemon-.mp3', 'autoplay' : 'autoplay'});
        $('#catch-page #catch').empty(); // Clear page
        $('#catch-page button').hide();
       
        var randomPokemon = function(){
            GetPokemonById(Math.floor((Math.random() * 100) + 1), function(pokemon){
                console.log('random pokemon');
                console.log(pokemon);
                if(pokemon.details){
                    randomPokemon();
                }
                else{
                    attackingPokemon = pokemon;
                    $('#catch-page #catch').append('<h2>' + pokemon.name + '</h2>');
                    

                    $('#catch-page #catch').append('<table data-role="table" data-mode="columntoggle" class="ui-responsive" id="myTable"><tbody>\
    <tr><th>Naam</th><td>'+ pokemon.name+'</td></tr>\
    <tr><th>Lengte</th><td>'+ pokemon.height+'</td></tr>\
    <tr><th>Gewicht</th><td>'+ pokemon.weight+'</td></tr>\
    </tbody></table>');
                    $('#catch-page #catch').append('<img src="' + pokemon.sprites.front_default + '" />');
  
                    $('#catch-page button').show();


                }
            });
            
        };

        randomPokemon();
        
    });

    $(document).on('vclick', '#catch-page button', function(){
        console.log('catch!!!');
        MyPokemon.push(attackingPokemon);
        window.localStorage.setItem('my_pokemon', JSON.stringify(MyPokemon));
        $.mobile.pageContainer.pagecontainer('change', '#mypokemon-page');
    });

    $(document).on('pagehide', '#catch-page', function(){
        console.log('change');
        $('#catch-page audio').attr({'src' : '', 'autoplay' : ''});
        $('#catch-page #catch').empty(); // Clear page
        $('#catch-page button').hide();
    });



    function InitializeMap(){

        console.log('InitializeMap');
    	
        // Avans Hogeschool Den Bosch
        var defaultLatLng = new google.maps.LatLng(51.687968, 5.286327);

    	if (navigator.geolocation ) {
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

        //drawMap(defaultLatLng);

    	function drawMap(latlng) {
    		
    		var myOptions = {
    			zoom: 16,
    			center: new google.maps.LatLng(51.687968, 5.286327),
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
            GenerateSpawnPoints(map, denBoschPolygon);

            new google.maps.Marker({position:latlng, map:map, icon : '../img/current_location_marker.png'})

    	}

    };
    // End CreateMap

    function GenerateSpawnPoints(map, polygon){

        var bounds = new google.maps.LatLngBounds();

        // calculate the bounds of the polygon
        for (var i=0; i < polygon.getPath().getLength(); i++) {
            bounds.extend(polygon.getPath().getAt(i));
        }

        var sw = bounds.getSouthWest();
        var ne = bounds.getNorthEast();

        for (var i = 0; i < 100; i++) {
            var ptLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat();
            var ptLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
            var point = new google.maps.LatLng(ptLat,ptLng);


            if (google.maps.geometry.poly.containsLocation(point, polygon)) {
                spawnPoints.push(new google.maps.Marker({position:point, map:map}));
            }

    
        }
    };
     
}