//fullPage的初始化函数
var myFullpage = new fullpage('#fullpage',
    {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        anchors: ['firstPage', 'secondPage', '3rdPage'],
        menu: '#menu',
        onLeave: function(origin, destination, direction){

            if(destination.index==1){
                document.getElementById("signInSiteFigure").classList.add('signInSiteFigureAnimation');
                document.getElementById("signInFrame").classList.add('signInFrameAnimation');

                document.getElementById("signUpSiteFigure").classList.remove('signUpSiteFigureAnimation');
                document.getElementById("signUpFrame").classList.remove('signUpFrameAnimation');
            }else if(destination.index==2){
                document.getElementById("signUpSiteFigure").classList.add('signUpSiteFigureAnimation');
                document.getElementById("signUpFrame").classList.add('signUpFrameAnimation');

                document.getElementById("signInSiteFigure").classList.remove('signInSiteFigureAnimation');
                document.getElementById("signInFrame").classList.remove('signInFrameAnimation');
            }else {
                document.getElementById("signInSiteFigure").classList.remove('signInSiteFigureAnimation');
                document.getElementById("signInFrame").classList.remove('signInFrameAnimation');
                document.getElementById("signUpSiteFigure").classList.remove('signUpSiteFigureAnimation');
                document.getElementById("signUpFrame").classList.remove('signUpFrameAnimation');
            }
        }
	}
    );

window.onload=function(){
    //获取整段url
    var str =window.location.href;
    //获取长度，进而获取最后一个字符的位置
    var num = str.length;
    //获取最后一个字符
    var page = str.charAt(num - 1);

    //判断跳转的页面
    if(page === 1){
        fullpage_api.moveTo("secondPage");
    }else if(page === 2){
        fullpage_api.moveTo("3rdPage");
    }else{
        fullpage_api.moveTo("firstpPage");
    }

}

function signInConfirm(){
    var inputUsername = document.getElementById("usernameInSignIn").value;

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
            if(responseObject.code == 814){
                //已经登陆
                showSignInError("This account had already sign in!");
            }else if(responseObject.code == 816){
                //成功登陆
                showSignInError("Sign in successfully!");
                setTimeout(function(){},1500);
                window.open('https://www.track-blog.com/users/'+ inputUsername);
            }else if(responseObject.code == 818){
                //账号和密码不匹配
                showSignInError("Username or password error!")
            }else{
                //其他返回状态码
                showSignInError("Unknow error!");
            }
        }
    })
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
                    showSignUpError("Sign up successfully!");
                    signUpToSignIn();
                }else{
                    showSignUpError("UnknowError");
                }
            }
        });

    }else{
        showSignUpError("Two password doesn't match!");
    }
}

function signUpToSignIn(){
    var inputUsername = document.getElementById("usernameInSignUp").value;

    ajax({
        url: "https://www.track-blog.com/back/api/sign_in.php",
        method: "POST",
        data: {
            role: "user",
            username: document.getElementById("usernameInSignUp").value,
            password: document.getElementById("passwordInSignUp").value
        },
        success: (response) =>{
            const responseObject = JSON.parse(response);
            if(responseObject.code == 814){
                //已经登陆
                showSignUpError("This account had already sign in!");
                window.open('https://www.track-blog.com/users/' + inputUsername);
            }else if(responseObject.code == 816){
                //成功登陆
                setTimeout(function(){},1500);
                window.open('https://www.track-blog.com/users/'+ inputUsername);
            }else if(responseObject.code == 818){
                //账号和密码不匹配
                showSignUpError("Username or password error!")
            }else{
                //其他返回状态码
                showSignUpError("Unknow error!");
            }
        }
    })
}



//测试显示错误信息的函数
function test(){
    var username = document.getElementById("usernameInSignIn").value;
    console.log(username);
}

function showSignInError(error){
    document.getElementById("signInErrorInfo").innerHTML=error;
    var e = document.getElementById("signInError");
    e.style.color="#34495E";
    setTimeout(function(){e.style.color="white";},3000);
}

function showSignUpError(error){
    document.getElementById("signUpErrorInfo").innerHTML=error;
    var e = document.getElementById("signUpError");
    e.style.color="#34495E";
    setTimeout(function(){e.style.color="white";},3000);
}


