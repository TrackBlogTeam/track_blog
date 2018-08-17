let divElement = document.getElementsByTagName("div")[0]


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code)
    {
        return hljs.highlightAuto(code).value;
    }
});

divElement.innerHTML = marked(string, {breaks: true})