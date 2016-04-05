document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {

 	//apply theme
 	//console.log(window.localStorage.getItem('theme'));

 	var theme = null;
 		if(window.localStorage.getItem('theme') === null){
    		$(".page").attr("data-theme", "b"); 
    		$("#home").attr("data-theme", "b"); 
    		$("themeswitch").val("b");    
   		}else {
   			$(".page").attr("data-theme", window.localStorage.getItem('theme'));   
   			$("#home").attr("data-theme", window.localStorage.getItem('theme')); 
   			$("themeswitch").val( window.localStorage.getItem('theme'));     
   		}
   
    $(document).on('vclick', '#changeTheme', function(){  

 			var storage = window.localStorage; 
 			console.log($('#themeswitch').val());
	      	storage.setItem('theme', $('#themeswitch').val());     
	      	console.log(window.localStorage.getItem('theme'));

	    });
};


	

 	
