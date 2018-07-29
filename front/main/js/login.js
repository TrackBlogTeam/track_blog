function login(){

    ajax({
        url: "https://www.track-blog.com/track_blog/back/api/login.php",
        method: "POST",
        data: {
            role: "user",
            username: document.getElementById("userName").value,
            password: document.getElementById("password").value
        },
        success: (response) =>{
            const responseObject = JSON.parse(response);
            if(responseObject.code == 816){
                alert("登陆成功！")
                window.location.href = "../me.html";
            }else if(responseObject.code == 818){
                alert("账号与密码不匹配!");
            }else{
                alert("登陆失败！")
            }
        }
    })
}

function switchToSignIn(){
	window.open("sign_in.html","_self");
}