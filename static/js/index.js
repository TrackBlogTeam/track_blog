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
    var checkPassword = document.getElementById("confirmPasswordInSignUp").value;
    var toCheckPassword = document.getElementById("passwordInSignUp").value;

    if(checkPassword == toCheckPassword){
        ajax({
            url: "https://www.track-blog.com/back/api/sign_up.php",
            method: "POST",
            data: {
                username: document.getElementById("usernameInSignUp").value,
                password: document.getElementById("passwordInSignUp").value,
                phoneNumber: document.getElementById("phonenumberInSignUp").value
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
    ajax({
        url: "https://www.track-blog.com/back/api/sign_in.php",
        method: "POST",
        data: {
            role: "user",
            username: document.getElementById("usernameInSignIn").value,
            password: document.getElementById("passwordInSignIn").value
        },
        success: (response) =>{
            const responseObject = JSON.parse(response);
            if(responseObject.code == 816){
                alert("登陆成功！")
                window.location.href = "../me/a.html";
            }else if(responseObject.code == 818){
                alert("账号与密码不匹配!");
            }else{
                alert("登陆失败！")
            }
        }
    })
}

function test(){
    document.getElementById("notification").innerHTML="密码错误！！！！";
}