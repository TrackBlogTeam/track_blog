var signInStatus = 0;

function switchToPhone(){
	if(signInStatus === 0){
    //无需转换状态
	}else{
		var tempPhone = document.getElementById('phoneButton');
		tempPhone.style.backgroundColor = "#00d1a5";

		var tempEmail = document.getElementById('emailButton');
		tempEmail.style.backgroundColor = "#a0a0a0";

		signInStatus = 0;
	}
}

function switchToEmail(){
	if(signInStatus === 1){
    //无需转换状态
	}else{
		var tempEmail = document.getElementById('emailButton');
		tempEmail.style.backgroundColor = "#00d1a5";

		var tempPhone = document.getElementById('phoneButton');
		tempPhone.style.backgroundColor = "#a0a0a0";

		signInStatus = 1;
	}
}

function register(){
	var checkPassword = document.getElementById("confirmPassword").value;
	var toCheckPassword = document.getElementById("password").value;

	if(checkPassword == toCheckPassword){
		ajax({
		url: "../back/api/register.php",
		method: "POST",
		data: {
			username: document.getElementById("userName").value,
			password: document.getElementById("password").value,
			phoneNumber: document.getElementById("phoneNumber").value
		},
		success: (response) => {
			const responseObject = JSON.parse(response);
			if(responseObject.code == 824){
				alert("注册成功");
				//window.location.href = "../me/a.html";
			}else{
				alert("注册失败");
			}
		}
		});

	}else{
		document.getElementById("passwordNotMatch").innerHTML = "两次密码不一致！";
	}
}