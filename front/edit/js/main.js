//接入Ace
var editor=ace.edit("editor");
editor.setTheme("ace/theme/github");
editor.setFontSize(15);
editor.getSession().setMode("ace/mode/markdown");
editor.renderer.setShowPrintMargin(false);
editor.setOption('wrap', 'free'); //自动换行

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
    document.getElementById("result").innerHTML=marked(editor.getValue());
    count();
}



