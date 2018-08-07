//点击头像
function clickMe()
{
    var menu = document.getElementById('meMenu');
    if (menu.style.display == "none") {
        menu.style.display = "unset";
    } else {
        menu.style.display = "none";
    }
}

//点击转换编辑器
function clickSwitch()
{
    var switcher = document.getElementById('switcher');
    if (switcher.style.display == "none") {
        switcher.style.display = "unset";
    } else {
        switcher.style.display = "none";
    }
}

//点击发布
function clickPublish()
{
    var publish = document.getElementById('publish');
    if (publish.style.display == "none") {
        publish.style.display = "unset";
    } else {
        publish.style.display = "none";
    }

}


//公共--

function getTitle()
{
    //获取标题
    return document.getElementById("title").value;
}

function setTitle(title)
{
    //设置标题
    document.getElementById("title").value = title;
}


function publishArticle(articleType)
{
    ajax({
        url: "../../back/api/publish.php",
        method: "POST",
        data: {
            title: getTitle(),
            content: getContent(),
            articleType: articleType
        },
        success: (response) =>
        {
            const responseObject = JSON.parse(response);
            if (responseObject.code === 830) {
                alert('发布成功');
                window.location.href = "https://www.track-blog.com/track_blog/main/main.html";
            }
        }
    })
}