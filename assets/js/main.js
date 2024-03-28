function displayRegister(){
    let modal=document.getElementById("modal");
    modal.style.display="flex";

    let register=document.querySelector(".auth-form-register");
    register.style.display="block";
}

function displayLogin(){
    let modal=document.getElementById("modal");
    modal.style.display="flex";

    let login=document.querySelector(".auth-form-login");
    login.style.display="block";
}

function displayNone(){
    let modal=document.getElementById("modal");
    modal.style.display="none";

    let register=document.querySelector(".auth-form-register");
    register.style.display="none";

    let login=document.querySelector(".auth-form-login");
    login.style.display="none";
}
