// console/js/index.js

loadAdministratorProfile()
retrieveTable("user")

function loadAdministratorProfile()
{
    ajax({
        url: "../../back/business.php",
        method: "POST",
        data: {
            type: "retrieve",
            role: "administrator",
            content: "profile"
        },
        success: (response) =>
        {
            const responseObject = JSON.parse(response)
            document.getElementsByClassName("administratorInfo")[0].innerHTML = "Administrator:<br/>" + responseObject.username
            document.getElementsByClassName("administratorPortrait")[0].style.backgroundImage = "url(" + responseObject.portraitUrl + ")"
        }
    })
}

function retrieveTable(tableName)
{
    ajax({
        url: "../../back/business.php",
        method: "POST",
        data: {
            type: "retrieve",
            role: "administrator",
            content: "table",
            tableName: tableName
        },
        success: (response) =>
        {
            const responseObject = JSON.parse(response)
            loadTable(responseObject)
        }
    })
}


function loadTable(responseObject)
{
    if (typeof responseObject.table === "undefined") {
        alert("表格暂无数据")
        return
    }

    let table = document.getElementsByTagName("table")[0]
    table.innerHTML = ""

    let tableHeadRow = document.createElement("tr")
    for (let i = 0; i < responseObject.table.head.length; ++i) {
        let th = document.createElement("th")
        th.innerText = responseObject.table.head[i]
        tableHeadRow.appendChild(th)
    }
    table.appendChild(tableHeadRow)

    for (let i = 0; i < responseObject.table.data.length; ++i) {
        let tableRow = document.createElement("tr")
        for (let j = 0; j < responseObject.table.data[i].length; ++j) {
            let tableData = document.createElement("td")
            tableData.innerText = responseObject.table.data[i][j]
            tableRow.appendChild(tableData)
        }
        table.appendChild(tableRow)
    }
}


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
    if (confirm("你确定要退出登录吗？")) {
        ajax({
            url: "../../back/business.php",
            method: "POST",
            data: {
                type: "logout"
            },
            success: () =>
            {
                window.location.href = "login.html"
            }
        })
    }
}