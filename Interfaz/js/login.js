window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-primary').addEventListener('click', login)
    }
    else{
        window.location.href = "Interfaz.html";
    }
}

function login (){
    var usuario = document.getElementById('input-user').value;
    var pass = document.getElementById('input-password').value;
    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data:{
            user_name: usuario,
            user_password: pass
        }
    }).then(function(res){
        if(res.data.code === 200 ){
            localStorage.setItem("token",res.data.message);
            window.location.href = "Interfaz.html";
        }
        else{
            alert("Usuario y/o contra incorrectos")
        }
    }).catch(function(err){
        console.log(err);
    });
};
