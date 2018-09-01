const app = new Vue({
    el: "#app",
    data()
    {
        return {
            currentInfo: "general",
            signed: true,
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
                    }
                }
            })
        },
        jumpToIndex: function ()
        {
            window.location.href = app.indexURL;
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
        showInfo: function (info)
        {
            app.currentInfo = info;
        }
    }
});

app.updateSigned();