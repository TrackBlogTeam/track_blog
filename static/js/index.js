//fullPage的初始化函数
var myFullpage = new fullpage('#fullpage',
    {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        anchors: ['firstPage', 'secondPage', '3rdPage'],
        menu: '#menu',
        onLeave: function(origin, destination, direction){
            console.log(destination);

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

}