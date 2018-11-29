var langu = "e";//e = English, s= Spanish

console.log("Entrando en language");


function lang() {//Inicializar...
    if(typeof(Storage) !== "undefined") {
        if (!localStorage.langu) {
            localStorage.langu = "e"; //Si no hay nada, por defecto English
        }else{
            langu = localStorage.langu;
        }
      
    } else {
        console.log("Languajes not supported");
    }
}

comprobarIdioma = function(){
    if(langu =="e"){
        console.log("Entrando en inglés");
        ponerIngles();    
    }else if( langu =="s"){
       console.log("Entrando en español");
        ponerEspanol();
    }  
}


$("#buttonSpanish").click(function(){
	ponerEspanol();
    
});
$("#buttonEnglish").click(function(){
	ponerIngles();
    
});

function ponerEspanol(){
    $(".spanish").attr("hidden", false);
	$(".english").attr("hidden", true);
    
    
    if(typeof(Storage) !== "undefined") {
        
        localStorage.langu = "s";
        langu = "s";
        
      
    } else {
        console.log("Languajes not supported");
    }
}

function ponerIngles(){
    $(".english").attr("hidden", false);
	$(".spanish").attr("hidden", true);
    
    if(typeof(Storage) !== "undefined") {
        
        localStorage.langu = "e";
        langu = "e";
        
      
    } else {
        console.log("Languajes not supported");
    }
    
}
lang();

comprobarIdioma();