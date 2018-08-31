const app = new Vue({
    el: "#app",
    data()
    {
        return {
            signed: true,
            indexURL: ""
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
                    }
                }
            })
        },
        jumpToIndex: function ()
        {
            window.location.href = app.indexURL;
        }
    }
});

app.updateSigned();

retrieveArticle();

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

function jumpTo(url)
{
    window.location.href = url;
}