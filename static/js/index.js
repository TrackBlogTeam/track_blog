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