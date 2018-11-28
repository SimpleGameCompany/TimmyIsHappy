if((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)){  
   $('head').append('<script src="js/main_mobile.js"><\/script>');
}else{
    $('head').append('<script src="js/main.js"><\/script>');
}