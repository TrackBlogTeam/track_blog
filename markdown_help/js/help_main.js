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


//marked
function convert() {
    var title="### 这是标题3\n#### 这是标题4\n ##### 这是标题5";
    var olist="1. 有序列表 \n2. 有序列表 \n3. 有序列表";
    var ulist="* 无序列表1\n* 无序列表2\n- 无序列表1\n- 无序列表2";
    var link="[轨迹博客](https://www.track-blog.com)";
    var font="**粗体**\n*斜体*\n~~删除线~~";
    var quote="> 如果你无法简洁地表达你的想法，那只能说明你还不够了解它 ——阿尔伯特·爱因斯坦";
    var todoList="- [ ] 待办事项1\n- [ ] 待办事项2\n- [x] 已完成事项";
    document.getElementById("title").innerHTML=marked(title,{breaks:true});
    document.getElementById("olist").innerHTML=marked(olist,{breaks:true});
    document.getElementById("ulist").innerHTML=marked(ulist,{breaks:true});
    document.getElementById("link").innerHTML=marked(link,{breaks:true});
    document.getElementById("font").innerHTML=marked(font,{breaks:true});
    document.getElementById("quote").innerHTML=marked(quote,{breaks:true});
    document.getElementById("todoList").innerHTML=marked(todoList,{breaks:true});
    
}

convert();