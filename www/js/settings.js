document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

  var defaultTheme = 'a';

  if(window.localStorage.getItem('theme') === null){
    window.localStorage.setItem('theme', defaultTheme);  
  }

  var currentTheme = window.localStorage.getItem('theme');

  // Apply themes on startup (home)
  $('[data-role="page"]').removeClass('ui-page-theme-a ui-page-theme-b').addClass('ui-page-theme-' + currentTheme);

  /* Apply theme newly created pages */
  $(document).on('pagebeforecreate', function(event){

    console.log('Apply theme: ' + currentTheme);
    $(event.target).removeClass('ui-page-theme-a ui-page-theme-b').addClass('ui-page-theme-' + currentTheme);

  });

  /* Store theme in localstorage */
  $(document).on('vclick', '#changeTheme', function(){
    
    window.localStorage.setItem('theme', $('#themeswitch').val());
    currentTheme = window.localStorage.getItem('theme');

    /* Apply theme after new theme is selected and saved */
    $('[data-role="page"]').removeClass('ui-page-theme-a ui-page-theme-b').addClass('ui-page-theme-' + currentTheme);

  });

  $(document).on('vclick', '#clearcache', function(){
    window.localStorage.removeItem('pokemon');
  });

  $(document).on('pagebeforecreate', '#settings-page', function(event){

    $('#themeswitch option[value="' + currentTheme + '"]').attr('selected', true);

  });
};