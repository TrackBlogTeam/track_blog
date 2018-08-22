let pageNumber = 1;
let limit = 10;
let tableName = "user";

loadAdministratorProfile()
retrieveTable(tableName, 1, 10);

function loadAdministratorProfile()
{
    ajax({
        url: "https://www.track-blog.com/back/api/retrieve_profile.php",
        method: "POST",
        data: {
            role: "administrator"
        },
        success: (response) => {
            const responseObject = JSON.parse(response)
            document.getElementsByClassName("administratorInfo")[0].innerHTML = "Administrator:<br/>" + responseObject.username
            document.getElementsByClassName("administratorPortrait")[0].style.backgroundImage = "url(" + responseObject.portraitUrl + ")"
        }
    })
}

function retrieveTable(tableName, pageNumber, limit)
{
    // test
    const str = '{"head":["user_id","user_name","user_password","phone_number"],"data":[["25","root","yangjianwei","15521099506"],["34","yangceshi","yangceshi","15521099506"],["35","asd","asdasdasd","13979801582"]]}';
    const responseObject = JSON.parse(str);
    //loadTable(responseObject);
    // test

    // ajax({
    //     url: "https://www.track-blog.com/back/api/retrieve_table.php",
    //     method: "POST",
    //     data: {
    //         pageNumber: pageNumber,
    //         limit: limit,
    //         tableName: tableName
    //     },
    //     success: (response) =>
    //     {
    //         const responseObject = JSON.parse(response);
    //         loadTable(responseObject);
    //     }
    // })
}


function loadTable(responseObject)
{
    if (responseObject === null || typeof responseObject.head === "undefined") {
        return;
    }

    const table = document.getElementById("table");
    table.innerHTML = "";

    //
    // let tableHeadRow = document.createElement("div");
    // tableHeadRow.setAttribute("class", "tr");
    //
    // for (let i = 0; i < responseObject.head.length; ++i) {
    //     let tableHead = document.createElement("div");
    //     tableHead.setAttribute("class", "th");
    //     tableHead.innerText = responseObject.head[i];
    //     tableHeadRow.appendChild(tableHead);
    // }
    //
    // table.appendChild(tableHeadRow);

    // for (let i = 0; i < responseObject.data.length; ++i) {
    //     let tableRow = document.createElement("div");
    //     tableRow.setAttribute("class", "tr");
    //     let checkboxContainer = document.createElement("div");
    //     checkboxContainer.setAttribute("class", "checkboxContainer");
    //     let label = document.createElement("label");
    //     label.setAttribute("class", "checkbox");
    //     let spanIcon = document.createElement("span");
    //     spanIcon.setAttribute("class", "icons");
    //     let spanIconUnchecked = document.createElement("span");
    //     spanIconUnchecked.setAttribute("class", "icon-unchecked");
    //     let spanIconChecked = document.createElement("span");
    //     spanIconChecked.setAttribute("class", "icon-checked");
    //     let inputCheckbox = document.createElement("input");
    //     inputCheckbox.setAttribute("type", "checkbox");
    //     inputCheckbox.setAttribute("class", "custom-checkbox");
    //     inputCheckbox.setAttribute("data-toggle", "checkbox");
    //
    //     label.appendChild(inputCheckbox);
    //     spanIcon.appendChild(spanIconUnchecked);
    //     spanIcon.appendChild(spanIconChecked);
    //     label.appendChild(spanIcon);
    //
    //     checkboxContainer.appendChild(label);
    //     tableRow.appendChild(checkboxContainer);
    //     for (let j = 0; j < responseObject.data[i].length; ++j) {
    //         let tableData = document.createElement("td")
    //         tableData.innerText = responseObject.data[i][j]
    //         tableRow.appendChild(tableData)
    //     }
    //     table.appendChild(tableRow)
    // }
}


function toggleExpand(e)
{
    let targetElement = e.nextElementSibling
    let imageElement = e.firstElementChild.nextElementSibling.nextElementSibling
    if (e.getAttribute("data-expand") === "false") {
        e.setAttribute("data-expand", "true");
        targetElement.setAttribute("data-expand", "true")
        imageElement.setAttribute("data-expand", "true")
    } else {
        e.setAttribute("data-expand", "false");
        targetElement.setAttribute("data-expand", "false")
        imageElement.setAttribute("data-expand", "false")
    }
}


function logout()
{
    if (confirm("你确定要退出登录吗？")) {
        ajax({
            url: "https://www.track-blog.com/back/api/sign_out.php",
            method: "POST",
            success: () => {
                window.location.href = "login.html"
            }
        })
    }
}

function clickTable(clickedTable)
{
    tableName = clickedTable;
    pageNumber = 1;
    retrieveTable(tableName, pageNumber, limit);
}

function goToPreviousPage()
{
    if (pageNumber === 1) {
        return;
    }
    retrieveTable(tableName, --pageNumber, limit);
}

function goToNextPage()
{
    retrieveTable(tableName, ++pageNumber, limit);
}

function goToCertainPage()
{
    pageNumber = document.getElementsByClassName("pageInput")[0].value || 1;
    retrieveTable(tableName, pageNumber, limit);
}

