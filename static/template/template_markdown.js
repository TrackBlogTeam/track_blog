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
    highlight: function (code)
    {
        return hljs.highlightAuto(code).value;
    }
});


contentDIV.innerHTML = contentDIV.innerHTML.trim();
contentDIV.innerHTML = marked(HTMLDecode(contentDIV.innerHTML), {breaks: true})

function HTMLDecode(text)
{
    // method from https://www.cnblogs.com/daysme/p/7100553.html   --- @小文
    const temp = document.createElement("div");
    temp.innerHTML = text;
    return temp.innerText || temp.textContent;
}

const app = new Vue({
    el: "#app",
    data()
    {
        return {
            numberOfArticles: 115,
            numberOfAgrees: 421,
            numberOfReads: 2311,
            articleUser: "",
            currentUser: "",
            signed: false,
            indexURL: "",
            articles: []
        }
    },
    methods: {
        updateArticleUser: function ()
        {
            const url = window.location.href;
            const trunks = url.split('/');
            for (let i = 0; i < trunks.length; ++i) {
                if (trunks[i] === "users") {
                    app.articleUser = trunks[i + 1];
                }
            }
            document.getElementById("portraitImage").setAttribute("src", `https://www.track-blog.com/users/${app.articleUser}/index.png`);
        },
        updateSigned: function ()
        {
            ajax({
                url: 'https://www.track-blog.com/back/api/have_signed.php',
                method: 'POST',
                success: (response) =>
                {
                    console.log(response);
                    const responseObject = JSON.parse(response);
                    app.signed = responseObject.signed;
                    if (app.signed && responseObject.role === "user") {
                        app.indexURL = "https://www.track-blog.com/users/" + responseObject.username
                        app.currentUser = responseObject.username;
                    }
                }
            })
        },
        jumpToIndex: function ()
        {
            window.location = app.indexURL;
        },
        jumpToEdit: function ()
        {
            window.location = "https://www.track-blog.com/edit/edit_markdown.html";
        },
        jumpToSetting: function ()
        {
            window.location = "https://www.track-blog.com/settings";
        },
        signOut: function ()
        {
            if (confirm("你确定要退出登录吗？")) {
                ajax({
                    url: "https://www.track-blog.com/back/api/sign_out.php",
                    method: "POST",
                    success: () =>
                    {
                        window.location.reload();
                    }
                })
            }
        }
    }
});
app.updateArticleUser();
app.updateSigned();