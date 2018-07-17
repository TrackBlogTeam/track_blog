var signInStatus = 0;

function switchToEmail(){
	if(signInStatus === 0){
    //无需转换状态
	}else{
		var tempEmail = document.getElementById('emailButton');
		tempEmail.style.backgroundColor = "#00d1a5";

		var tempPhone = document.getElementById('phoneButton');
		tempPhone.style.backgroundColor = "#a0a0a0";

		signInStatus = 0;
	}
}

function switchToPhone(){
	if(signInStatus === 1){
    //无需转换状态
	}else{
		var tempPhone = document.getElementById('phoneButton');
		tempPhone.style.backgroundColor = "#00d1a5";

		var tempEmail = document.getElementById('emailButton');
		tempEmail.style.backgroundColor = "#a0a0a0";

		signInStatus = 1;
	}
}
function test(){
	
}