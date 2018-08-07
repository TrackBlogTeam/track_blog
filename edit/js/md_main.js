//接入Ace
var editor=ace.edit("editor");
editor.setTheme("ace/theme/github");
editor.setFontSize(15);
editor.getSession().setMode("ace/mode/markdown");
editor.renderer.setShowPrintMargin(false);
editor.setOption('wrap', 'free'); //自动换行

//跟随滚动

//scrollTop  滚动条高度

var currentTab=0;   //区分滚动容器
var result = document.getElementById("result");
var rp=document.getElementById("resultParent");
var ep=document.getElementById("editorParent");
var editorHeight; //文本内容高度
var scale;

ep.addEventListener('mouseover',function(){
    currentTab=1;   //说明在编辑区
    //console.log("\ncurrentTab:",currentTab);
})

result.addEventListener('mouseover',function(){
    currentTab=2;   //说明在预览区
    //console.log("\ncurrentTab:",currentTab);
})

editor.session.on('changeScrollTop',function(delta){
    editorHeight=editor.getSession().getScreenLength()*editor.renderer.lineHeight; 
    scale=rp.scrollHeight/editorHeight;
    //console.log("active");
    if(currentTab==1){
        //r.scrollTop=l.scrollTop/scale
        //console.log("\nresult scrollTop:",result.scrollTop);
        rp.scrollTop=editor.renderer.getScrollTop()*scale;
        //console.log("scale: ",scale);
        //console.log("editor scrollTop:",editor.renderer.getScrollTop());
        //console.log("result scrollTop:", result.scrollTop);
    }
    else
        return;
})

rp.addEventListener('scroll',function(){

    editorHeight=editor.getSession().getScreenLength()*editor.renderer.lineHeight; 
    scale=editorHeight/rp.scrollHeight;

    if(currentTab==2){
        //l.scrollTop=r.scrollTop/scale
        //console.log("\nresult sumScrollTop",rp.scrollHeight);
        //console.log("editor Height:",editorHeight);
        //editor.renderer.scrollTop=result.scrollTop/scale;
        editor.session.setScrollTop(rp.scrollTop*scale);
        //console.log("scale:",scale);
        //console.log("result scrollTop",result.scrollTop);
        //console.log("result scrollTop:",rp.scrollTop);
        //console.log("editor scrollTop:",editor.renderer.getScrollTop());
    }
    else
        return;
})


//自动存储的文本
var saveText;

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
    return hljs.highlightAuto(code).value;
    }
});

//统计字数
function count(){
    var account=document.getElementById("Count");
    var length=document.getElementById("result").innerText.length;
    account.innerHTML="共 "+length+" 字";
}

//marked
function convert() {
    document.getElementById("result").innerHTML=marked(editor.getValue(),{breaks:true});
    count();
}


function getContent() {
    return editor.getValue();
}

function setContent(text) {
    editor.setValue(text);
}

function insertBold(){
    //获取选中的范围
    range=editor.getSelectionRange();
    //获取选中的文本
    text=editor.session.getTextRange(range);

    //替换用的文本
    rText="**"+text+"**";

    //替换
    editor.session.replace(range,rText);

    //重新marked
    convert();
}

function insertItalic(){
    //获取选中的范围
    range=editor.getSelectionRange();
    //获取选中的文本
    text=editor.session.getTextRange(range);

    //替换用的文本
    rText="*"+text+"*";

    //替换
    editor.session.replace(range,rText);

    //重新marked
    convert();
}

function insertStrike(){
    //获取选中的范围
    range=editor.getSelectionRange();
    //获取选中的文本
    text=editor.session.getTextRange(range);

    //替换用的文本
    rText="~~"+text+"~~";

    //替换
    editor.session.replace(range,rText);

    //重新marked
    convert();
}

function insertLink(){
    //获取选中的范围
    range=editor.getSelectionRange();
    //获取选中的文本
    text=editor.session.getTextRange(range);

    //替换用的文本
    rText="["+text+"]()";

    //替换
    editor.session.replace(range,rText);

    //重新marked
    convert();
}

function insertQuote(){
    //获取选中的范围
    range=editor.getSelectionRange();
    //获取选中的文本
    text=editor.session.getTextRange(range);

    //替换用的文本
    rText="\n> "+text;

    //替换
    editor.session.replace(range,rText);

    //重新marked
    convert();
}

function insertCode(){
    //获取选中的范围
    range=editor.getSelectionRange();
    //获取选中的文本
    text=editor.session.getTextRange(range);

    //替换用的文本
    rText="```\n"+text+"\n```";

    //替换
    editor.session.replace(range,rText);

    //重新marked
    convert();
}

function insertHLine(){
    //获取选中的范围
    range=editor.getSelectionRange();
    //获取选中的文本
    text=editor.session.getTextRange(range);

    //替换用的文本
    rText="\n---\n"+text;

    //替换
    editor.session.replace(range,rText);

    //重新marked
    convert();
}

function getAutoSave(){
    //数据库获取保存的文本
    return saveText;
}

editor.session.on('change',function(delta){
    //保存到saveText
    saveText=getContent();

    //scale=(result.offsetHeight-rp.offsetHeight)/(editor.renderer.getScrollTop()-editorHeight);
});


document.getElementById("boldBt").addEventListener('click',function(){
    insertBold();
});

document.getElementById("italicBt").addEventListener('click',function(){
    insertItalic();
});

document.getElementById("strikeBt").addEventListener('click',function(){
    insertStrike();
});

document.getElementById("linkBt").addEventListener('click',function(){
    insertLink();
});

document.getElementById("quoteBt").addEventListener('click',function(){
    insertQuote();
});

document.getElementById("codeBt").addEventListener('click',function(){
    insertCode();
});

document.getElementById("hLineBt").addEventListener('click',function(){
    insertHLine();
});


//显示或隐藏预览
var isExpand=true;
document.getElementById("expandOrShrinkBt").addEventListener('click',function(){
    console.log(isExpand);
    if(isExpand==true){
        //隐藏预览
        document.getElementById("preview").style.display="none";
        //更改图标
        document.getElementById("expandOrShrink").src="icons/shrink.png";
        isExpand=false;
    }
    else{
        //显示预览
        document.getElementById("preview").style.display="flex";
        //更改图标
        document.getElementById("expandOrShrink").src="icons/expand.png";
        isExpand=true;
    }
});