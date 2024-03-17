function displayRegisterinLogin(){
    let register=document.querySelector(".auth-form-register");
    register.style.display="block";

    let login=document.querySelector(".auth-form-login");
    login.style.display="none";
}

function displayLogininRegister(){
    let login=document.querySelector(".auth-form-login");
    login.style.display="block";

    let register=document.querySelector(".auth-form-register");
    register.style.display="none";
}

function Register(e){
    event.preventDefault();
    var mail=document.getElementById('emailR').value;
    var pass=document.getElementById('passR').value;
    var repass=document.getElementById('repassR').value;

    if(mail!="" && pass!="" && repass!=""){
        if(pass==repass){
            var user={
                email: mail,
                password: pass,
                re_password: repass
            };
        
            var json=JSON.stringify(user);
            localStorage.setItem("username",json);
            alert("Đăng ký thành công");
        }
        else{
            alert("Mật khẩu không giống");
        }
    }
    else{
        alert("Vui lòng nhập thông tin");
    }


    document.getElementById('emailR').value="";
    document.getElementById('passR').value="";
    document.getElementById('repassR').value="";
}

function Login(e){
    event.preventDefault();
    var mail=document.getElementById('email').value;
    var password=document.getElementById('password').value;

    if(mail=="" && password==""){
        alert("Vui lòng nhập thông tin");
    }
    else{
        var user=localStorage.getItem("username");
        var data=JSON.parse(user);

        if(user==null){
            alert("Tài khoản chưa đăng ký");
        }
        else if(mail==data.email && password==data.password){
            window.location.href="./assets/html/home.html";
        }
        else {
            alert("Tài khoản chưa đăng ký");
        }
    }    
}