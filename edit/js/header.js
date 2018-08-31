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

//jqurey实现动态下拉
$('.iconMore').bind('click', function ()
{
    $('#switcher').slideToggle(300);
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


function publishArticle(type)
{
    /*此为通用接口只接受getTitle()和getContent()*/

    var obj = urlParse();

    ajax({
        url: "https://www.track-blog.com/back/api/publish_article.php",
        method: "POST",
        data: {
            title: getTitle(),
            content: getContent(),
            articleType: type,
            articleID: obj.articleID
        },
        success: (response) =>
        {
            const code = JSON.parse(response).code;
            if (code === 830) {
                $.confirm({
                    icon: 'fa fa-check-circle',
                    title: "发布成功！",
                    content: "点击\'查看文章\'跳转到对应文章页面，此消息在5秒后自动关闭",
                    autoClose: 'cancelAction|8000',
                    type: 'green',
                    typeAnimated: true,
                    draggable: true,
                    closeIcon: true,
                    theme: 'modern',
                    animation: 'rotateY',
                    closeAnimation: 'rotateYR',
                    buttons: {
                        flip: {
                            text: "查看文章",
                            btnClass: 'btn-green green',
                            action: function ()
                            {
                                $.alert('跳转到对应文章页面');
                            }
                        },
                        cancelAction: {
                            text: '取消'
                        }
                    }
                });
            } else {
                var reason;
                if (code === 828) {
                    reason = "失败原因：当前为管理员，请用用户账号登陆后发布！";
                } else {
                    reason = "失败原因：未知，请重新发布！"
                }
                $.confirm({
                    icon: 'fa fa-exclamation-circle',
                    title: "发布失败！",
                    content: reason,
                    // autoClose: 'cancelAction|8000',
                    type: 'red',
                    typeAnimated: true,
                    draggable: true,
                    closeIcon: true,
                    theme: 'modern',
                    animation: 'rotateY',
                    closeAnimation: 'rotateYR',
                    buttons: {
                        cancelAction: {
                            text: '取消'
                        }
                    }
                })
            }
        }
    })
}

function postDraft()
{
    //保存草稿
    if (draft != "") {
        var obj = urlParse();

        ajax({
            url: "https://www.track-blog.com/back/api/save_draft.php",
            method: "POST",
            data: {
                title: getTitle(),
                content: getContent(),
                draftID: obj.draftID
            },
            success: (response) =>
            {
                console.log(response)
                var code = JSON.parse(response).code;
                return code;
            }
        })
    }

}

function load()
{
    //onLoad
    //获得个人信息
    ajax({
        url: "https://www.track-blog.com/back/api/have_signed.php",
        method: "POST",
        success: (response) =>
        {
            console.log(response)
            const responseObject = JSON.parse(response);
            if (responseObject.signed) {
                const url = "https://www.track-blog.com/users/" + responseObject.username + "/index.png";
                document.getElementById("meBt").src = url;
            }
            else {
                //重定位到登录
                window.open("www.track-blog.com/?section=2");
            }
        }
    })

    //获取文章内容
    var obj = urlParse();
    if (obj.articleID != undefined && obj.draftID != undefined) {
        if (obj.articleID == undefined) {
            //获取草稿内容
            ajax({
                url: "https://www.track-blog.com/back/api/edit_draft.php",
                method: "POST",
                data: {
                    draftID: obj.draftID
                },
                success: (response) =>
                {
                    console.log(response)
                    var code = JSON.parse(response).code;
                    var title = JSON.parse(response).title;
                    var content = Json.parse(response).content;
                    setTitle(title);
                    setContent(content);
                    return code;
                }
            })
        } else {
            //获取文章内容
            ajax({
                url: "https://www.track-blog.com/back/api/edit_article.php",
                method: "POST",
                data: {
                    articleID: obj.articleID
                },
                success: (response) =>
                {
                    console.log(response)
                    var code = JSON.parse(response).code;
                    var title = JSON.parse(response).title;
                    var content = Json.parse(response).content;
                    setTitle(title);
                    setContent(content);
                    return code;
                }
            })
        }
    }
}

//定时保存为草稿
window.setInterval("postDraft()", 1000 * 300);

//发布确认
function publishConnect(articleType)
{
    //发布前连接服务器并给出消息提示
    $.confirm({
        icon: 'fa fa-question',
        title: "确认发布？",
        content: false,
        draggable: true,
        closeIcon: true,
        theme: 'modern',
        buttons: {
            yes: {
                text: "确认发布",
                btnClass: 'btn-green green',
                action: function ()
                {
                    //调用发布函数 if()
                    var code = publishArticle(articleType);

                }
            },
            no: {
                text: "取消",
            }
        }
    })
}

//url解析
function urlParse()
{
    const url = window.location.href;
    var obj = {};
    var reg = /[?&][^?&]+=[^?&]+/g;

    var arr = url.match(reg);
    if (arr) {
        arr.forEach((item) =>
        {
            var tempArr = item.substring(1).split('=');
            var key = decodeURIComponent(tempArr[0]);
            var val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}

