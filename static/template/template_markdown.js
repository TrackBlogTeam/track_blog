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

console.log(divElement.innerHTML)
let regularExpression = new RegExp("\&lt;", "g")
let string = divElement.innerHTML.replace(regularExpression, "<")
regularExpression = new RegExp("\&gt;", "g")
string = string.replace(regularExpression, ">")
console.log(string)
divElement.innerHTML = marked(string, {breaks: true})