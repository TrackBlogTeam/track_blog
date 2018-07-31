//接入Ace
var editor=ace.edit("editor");
editor.setTheme("ace/theme/github");
editor.setFontSize(15);
editor.getSession().setMode("ace/mode/markdown");
editor.renderer.setShowPrintMargin(false);
editor.setOption('wrap', 'free'); //自动换行

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
    var acount=document.getElementById("Count");
    var length=document.getElementById("result").innerText.length;
    acount.innerHTML="共 "+length+" 字";
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