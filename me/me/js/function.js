let title="aaa";
let content="bbbbb";
//var articleTpye;
retrieveArticle(title, content);

function retrieveArticle(title, content)
{
	ajax({
		url:"https://www.track-blog.com/back/api/retrieve_articles.php",
		method:"POST",
		data:{
			title:title,
		    content:content,
		    //articleTpye:articleTpye
	    },
	    success: (response) =>
        {
            const responseObject = JSON.parse(response);
            loadTable(responseObject);
        }
	})
}
function loadTable(responseObject)
{
    if (responseObject === null || typeof responseObject.head === "undefined") {
        return;
    }

    let table = document.getElementsByTagName("table")[0];
    table.innerHTML = "";

    let tableHeadRow = document.createElement("tr");
    let th = document.createElement("th");
    th.innerText = "";
    tableHeadRow.appendChild(th);
    for (let i = 0; i < responseObject.head.length; ++i) {
        let th = document.createElement("th");
        th.innerText = responseObject.head[i];
        tableHeadRow.appendChild(th);
    }

    table.appendChild(tableHeadRow);

    for (let i = 0; i < responseObject.data.length; ++i) {
        let tableRow = document.createElement("tr");
        let checkboxContainer = document.createElement("div");
        checkboxContainer.setAttribute("class", "checkboxContainer");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkboxContainer.appendChild(checkbox);
        tableRow.appendChild(checkboxContainer);
        for (let j = 0; j < responseObject.data[i].length; ++j) {
            let tableData = document.createElement("td")
            tableData.innerText = responseObject.data[i][j]
            tableRow.appendChild(tableData)
        }
        table.appendChild(tableRow)
    }
}
// $(function(){
// 	// var styleherf="style/canvas-point.min.js";
// 	// // htmlobj=$.ajax({url:"1.txt",async:false});
// 	// alert(htmlobj.responseText);
// 	// var title=htmlobj.responseText;
// 	// var box="box_2";
// 	// var title="C++的4种强制类型转换";
// 	// var href="https://blog.csdn.net/cztqwan/article/details/80267691";
// 	// var content="一、4种强制类型转换C++不是类型安全的，C++有4种强制类型转换，分别为：static_castdynamic_castconst_castreinterpret_cast二、static_cast（编译时类型检查）主要用法：";
// 	// var _date="2018/7/23";
// 	// var time="18:04";
// 	// var read=234;
// 	// var comment=7;
// 	// $('.blog-list').append("<div class='box' id="+box+"></div>");
// 	// $('#'+box).append(" <div class='boxA'></div><div class='boxB'></div> ");
// 	// $('#'+box+' .boxB').append("<a class='title' href="+href+" target='_blank'>"+title+"</a>");
// 	// $('#'+box+' .boxB').append("<p class='content'>"+content+"</p>");
// 	// $('#'+box+' .boxB').append("<p class='detail' id='date'>"+_date+"</p>");
// 	// $('#'+box+' .boxB').append("<p class='detail' id='time'>"+time+"</p>");
// 	// $('#'+box+' .boxB').append("<p class='detail' id='read'>阅读量:"+read+"</p>");
// 	// $('#'+box+' .boxB').append("<p class='detail' id='comment'>评论:"+comment+"</p>");

// })