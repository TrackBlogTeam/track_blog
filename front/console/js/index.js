function toggleExpand(e)
{
    let targetElement = e.nextElementSibling
    let imageElement = e.firstElementChild.nextElementSibling.nextElementSibling
    if (targetElement.getAttribute("data-expand") === "false") {
        targetElement.setAttribute("data-expand", "true")
        imageElement.setAttribute("data-expand", "true")
    } else {
        targetElement.setAttribute("data-expand", "false")
        imageElement.setAttribute("data-expand", "false")
    }
}

function logout()
{
    confirm("你确定要退出登录吗？")
}

function retrieveUser()
{
    ajax({
        url: "../../back/business.php",
        method: "POST",
        data: {},
        success: (message_back) =>
        {
            alert("连接成功，仅仅连接成功")
        }
    })
}

function retrieveArticle()
{
    ajax({
        url: "../../back/business.php",
        method: "POST",
        data: {
            type: "retrieve",
            table: "user"
        },
        success: (message_back) =>
        {
            alert("连接成功，仅仅连接成功")
        }
    })
}

function retrieveComment()
{
    alert("即将开放，敬请期待")
}