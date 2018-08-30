//点击头像
function clickMe() {
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
$('.iconMore').bind('click', function () {
    $('#switcher').slideToggle(300);
})



//公共--

function getTitle() {
    //获取标题
    return document.getElementById("title").value;
}

function setTitle(title) {
    //设置标题
    document.getElementById("title").value = title;
}


function publishArticle(articleType) {
    /*此为通用接口只接受getTitle()和getContent()*/
    console.log("title: " + getTitle());
    console.log("autosave: " + getContent())

    // let htmlContent = getContent(); //获取内容
    // let encodeDiv = document.createElement("div");
    // (encodeDiv.textContent != null) ? (encodeDiv.textContent = htmlContent) : (encodeDiv.innerText = htmlContent);
    // htmlContent = encodeDiv.innerHTML;
    // htmlContent = htmlContent.replace(/'/g, "&apos;");
    // htmlContent = htmlContent.replace(/"/g, '&quot;');
    // console.log(htmlContent);
    // htmlContent = encodeURIComponent(htmlContent);  // for &

    ajax({
        url: "https://www.track-blog.com/back/api/publish.php",
        method: "POST",
        data: {
            title: getTitle(),
            content: getContent(),
            articleType: articleType
        },
        success: (response) => {
            console.log(response)
            var code = JSON.parse(response).code;
            return code;
        }
    })
}

function publishConnect(articleType) {
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
                action: function () {
                    //调用发布函数 if()
                    var code = publishArticle(articleType);
                    if (code == 830) {
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
                                    action: function () {
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
                        if (code == 828) {
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
            },
            no: {
                text: "取消",
            }
        }
    })
}
