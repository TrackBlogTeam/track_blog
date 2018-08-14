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
// function clickSwitch()
// {
//     var switcher = document.getElementById('switcher');
//     if (switcher.style.display == "none") {
//         // switcher.style.display = "unset";
//         switcher.slideDown();
//     } else {
//         // switcher.style.display = "none";
//         switcher.slideUp();
//     }
// }

$('.iconMore').bind('click',function(){
    $('#switcher').toggle(500);
})



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
    //console.log(getContent());
    /*此为通用接口只接受getTitle()和getContent()*/
    console.log("title: " + getTitle());
    console.log("autosave: " + getContent())

    let htmlContent = getContent(); //获取内容
    let encodeDiv = document.createElement("div");  
    (encodeDiv.textContent != null) ? (encodeDiv.textContent = htmlContent) : (encodeDiv.innerText = htmlContent);
    htmlContent = encodeDiv.innerHTML;
    htmlContent = htmlContent.replace(/'/g, "&apos;");
    htmlContent = htmlContent.replace(/"/g, '&quot;');
    console.log(htmlContent);
    htmlContent = encodeURIComponent(htmlContent);  // for &

    ajax({
        url: "https://www.track-blog.com/back/api/publish.php",
        method: "POST",
        data: {
            title: getTitle(),
            content: htmlContent,
            articleType: articleType
        },
        success: (response) =>
        {
            console.log(response)
        }
    })
}
