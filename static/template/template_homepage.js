const app = new Vue({
    el: "#app",
    data()
    {
        return {
            indexUser: "",
            currentUser: "",
            signed: false,
            indexURL: "",
            articles: []
        }
    },
    methods: {
        updateSigned: function ()
        {
            ajax({
                url: 'https://www.track-blog.com/back/api/have_signed.php',
                method: 'POST',
                success: (response) =>
                {
                    const responseObject = JSON.parse(response);
                    app.signed = responseObject.signed;
                    if (app.signed && responseObject.role === "user") {
                        app.indexURL = "https://www.track-blog.com/users/" + responseObject.username
                        app.currentUser = responseObject.username;
                    }
                }
            })
        },
        jumpToArticle: function (articleKey)
        {
            window.location = "https://www.track-blog.com/users/" + app.indexUser + "/articles/" + articleKey + ".html";
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
        },
        retrieveArticles: function ()
        {
            app.indexUser = document.getElementsByClassName("username")[0].innerHTML.trim();
            ajax({
                url: "https://www.track-blog.com/back/api/retrieve_articles.php",
                method: "POST",
                data: {
                    username: app.indexUser
                },
                success: (response) =>
                {
                    app.articles = JSON.parse(response);
                }
            })
        },
        editArticle: function (id)
        {
            window.location = "https://www.track-blog.com/edit/edit_markdown.html?articleID=" + id;
        },
        deleteArticle: function (id)
        {
            console.log(id);
        }
    }
});

app.updateSigned();

app.retrieveArticles();

function retrieveArticle()
{
    ajax({
        url: "https://www.track-blog.com/back/api/retrieve_articles.php",
        method: "POST",
        success: ((response) =>
        {
            console.log(response);
            const articles = JSON.parse(response);
            const mainDIV = document.getElementById("main");
            for (let i = 0; i < articles.length; ++i) {
                const articleDIV = document.createElement("div");
                const articleTitleDIV = document.createElement("div");
                const articleTimeDIV = document.createElement("div");
                articleDIV.setAttribute("class", "article rounded d-flex justify-content-between align-items-center");
                const url = "https://www.track-blog.com/users/" + articles[i].author_name + "/articles/" + articles[i].article_key + ".html";
                articleDIV.setAttribute("onclick", "jumpTo('" + url + "')");
                articleTitleDIV.setAttribute("class", "articleTitle");
                articleTimeDIV.setAttribute("class", "articleTime");
                articleTitleDIV.innerHTML = articles[i].article_title;
                articleTimeDIV.innerHTML = articles[i].created_time;
                articleDIV.appendChild(articleTitleDIV);
                articleDIV.appendChild(articleTimeDIV);
                mainDIV.appendChild(articleDIV);
            }
        })
    })
}