function backToMain(){
    document.getElementById("blurBackground").style.display="none";
    document.getElementById("signUpSite").style.display="none";
    document.getElementById("signInSite").style.display="none";
    document.getElementById("background").style.filter="none";
}

function signUp(){
    document.getElementById("blurBackground").style.display="inline-block";
    document.getElementById("signUpSite").style.display="inline-block";
    document.getElementById("signInSite").style.display="none";
    document.getElementById("background").style.filter="blur(3px)";
}

function signIn(){
    document.getElementById("blurBackground").style.display="inline-block";
    document.getElementById("signUpSite").style.display="none";
    document.getElementById("signInSite").style.display="inline-block";
    document.getElementById("background").style.filter="blur(3px)";
}

function signUpConfirm(){
    var checkPassword = document.getElementById("confirmPassword").value;
    var toCheckPassword = document.getElementById("password").value;

    if(checkPassword == toCheckPassword){
        ajax({
            url: "https://www.track-blog.com/back/api/sign_up.php",
            method: "POST",
            data: {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                phoneNumber: document.getElementById("phonenumber").value
            },
            success: (response) => {
                const responseObject = JSON.parse(response);
                if(responseObject.code == 824){
                    alert("注册成功");
                    window.location.href = "https://www.track-blog.com/front/me/a.html";
                }else{
                    alert("注册失败");
                }
            }
        });

    }else{
        document.getElementById("passwordNotMatch").innerHTML="Two password don't match.";
    }
}

function signInConfirm(){

}