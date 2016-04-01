$(document).on('pageinit', '#home', function(){      
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
                console.log(JSON.stringify(row));
                $('#kroeg-list').append('<li><a href="" data-id="' + row.id + '"><img src="'+row.icon+'"/><h3>' + row.name + '</h3><p>' + row.rating + '</p></a></li>');  
            });
            $('#kroeg-list').listview('refresh');
       },
       error: function (request,error) {
            //alert('Network error has occurred please try again!');
        }
    });         
});



var kroegInfo = {
    id : null,
    result : null
}

