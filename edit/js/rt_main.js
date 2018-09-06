var E = window.wangEditor;
var editor = new E('#rhToolbar', '#rhText');

var saveText;

editor.customConfig.fontNames = [
    '宋体',
    '微软雅黑',
    'Arial',
    'Tahoma',
    'Verdana'
]
editor.customConfig.pasteFilterStyle = false;
editor.customConfig.zIndex = 10;
// editor.customConfig.onchange = function (html) {
//     saveText=getContent(true);  //保存文本
// }
// editor.customConfig.onchangeTimeout = 1000; //五秒进行一次保存
editor.create();




function getText() {
    //获取文本
    var text = editor.txt.text();
    return text;
}

function getHtml() {
    //获取Html
    var h = editor.txt.html();
    return h;
}


//以下是对外暴露的接口


function getContent(needHtml=true){
    //获取内容，默认为html
    
    if(needHtml){
        return getHtml();
    }
    else{
        return getText();
    }

}

function setContent(html) {
    //设置内容
    editor.txt.html(html);
}

function appendContent(h){
    //追加内容
    editor.txt.append(h);
}

// function getAutoSave(){
//     //数据库获取保存的文本
//     return saveText;
// }





// document.getElementById("pbBt").addEventListener('click', function () {
//     //editor.change();  //手动触发onchange

//     // console.log("//getText");    //返回text
//     // console.log(getText());
    
//     // console.log("//getHtml");    //返回html
//     // console.log(getHtml());

//     // console.log("//getContent");    //返回内容
//     // console.log(getContent());
    
//     appendContent("<p>添加的一段<p>");
// })