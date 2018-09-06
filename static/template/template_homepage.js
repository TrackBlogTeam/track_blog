const app = new Vue({
    el: "#app",
    data()
    {
        return {
            numberOfArticles: 0,
            numberOfLikes: 0,
            numberOfComments: 0,
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