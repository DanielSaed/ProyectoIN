window.onload = init;

function init(){
    if(localStorage.getItem("token")){
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "Interfaz.html"
    });

    }
    else{
        window.location.href = "Interfaz.html";
      }
    
}

