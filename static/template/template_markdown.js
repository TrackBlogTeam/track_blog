const contentDIV = document.getElementById("content");

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


contentDIV.innerHTML = contentDIV.innerHTML.trim();
contentDIV.innerHTML = marked(HTMLDecode(contentDIV.innerHTML), {breaks: true})

function HTMLDecode(text) {
    // method from https://www.cnblogs.com/daysme/p/7100553.html   --- @小文
    const temp = document.createElement("div");
    temp.innerHTML = text;
    return temp.innerText || temp.textContent;
}