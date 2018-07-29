
$(function(){
	var box="box_2";
	var title="C++的4种强制类型转换";
	// htmlobj=$.ajax({url:"1.txt",async:false});
	// alert(htmlobj.responseText);
	// var title=htmlobj.responseText;
	var href="https://blog.csdn.net/cztqwan/article/details/80267691";
	var content="一、4种强制类型转换C++不是类型安全的，C++有4种强制类型转换，分别为：static_castdynamic_castconst_castreinterpret_cast二、static_cast（编译时类型检查）主要用法：";
	var _date="2018/7/23";
	var time="18:04";
	var read=234;
	var comment=7;
	$('.firstInfo').append("<div class='box' id="+box+"></div>");
	$('#'+box).append(" <div class='boxA'></div><div class='boxB'></div> ");
	$('#'+box+' .boxB').append("<a class='title' href="+href+" target='_blank'>"+title+"</a>");
	$('#'+box+' .boxB').append("<p class='content'>"+content+"</p>");
	$('#'+box+' .boxB').append("<p class='detail' id='date'>"+_date+"</p>");
	$('#'+box+' .boxB').append("<p class='detail' id='time'>"+time+"</p>");
	$('#'+box+' .boxB').append("<p class='detail' id='read'>阅读量:"+read+"</p>");
	$('#'+box+' .boxB').append("<p class='detail' id='comment'>评论:"+comment+"</p>");

	$(".container>div").hide();
	$(".container>div:eq(0)").show();	
	
	$(".navContent a").click(function(){
		var n = $(".navContent a").index(this);
		$(".navContent a").index(this);
		$(".container>div").hide();
		$(".container>div:eq("+n+")").show();	
	})
	$('.boxA,.content,.detail').click(function () {
          window.open('https://blog.csdn.net/cztqwan/article/details/80267691','_blank');  
    });
    $('.write').click(function () {
          window.open('../edit/edit_markdown.html');  
    });
	
})