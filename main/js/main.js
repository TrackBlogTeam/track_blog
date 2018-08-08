function backToMain(){
    document.getElementById("blurBackground").style.display="none";
    document.getElementById("signUpSite").style.display="none";
    document.getElementById("signInSite").style.display="none";
}

function signUp(){
    document.getElementById("blurBackground").style.display="block";
    document.getElementById("signUpSite").style.display="block";
    document.getElementById("signInSite").style.display="none";
}

function signIn(){
    document.getElementById("blurBackground").style.display="block";
    document.getElementById("signUpSite").style.display="none";
    document.getElementById("signInSite").style.display="block";
}

function signUpConfirm(){

}

function signInConfirm(){
    
}