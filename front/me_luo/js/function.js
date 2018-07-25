
$(function(){
	var Box="box_2";
	var Title="C++的4种强制类型转换";
	var Href="https://blog.csdn.net/cztqwan/article/details/80267691";
	var Content="一、4种强制类型转换C++不是类型安全的，C++有4种强制类型转换，分别为：static_castdynamic_castconst_castreinterpret_cast二、static_cast（编译时类型检查）主要用法：";
	var _date="2018/7/23";
	var Time="18:04";
	var Read="阅读量:234";
	var Comment="评论：7";
	$('.firstInfo').append("<div class='box' id="+Box+"></div>");
	$('#'+Box).append(" <div class='boxA'></div><div class='boxB'></div> ");
	$('#'+Box+' .boxB').append("<a class='title' href="+Href+" target='_blank'>"+Title+"</a>");
	$('#'+Box+' .boxB').append("<p class='content'>"+Content+"</p>");
	$('#'+Box+' .boxB').append("<p class='detail' id='date'>"+_date+"</p>");
	$('#'+Box+' .boxB').append("<p class='detail' id='time'>"+Time+"</p>");
	$('#'+Box+' .boxB').append("<p class='detail' id='read'>"+Read+"</p>");
	$('#'+Box+' .boxB').append("<p class='detail' id='comment'>"+Comment+"</p>");
	$(".container>div").hide();
	$(".container>div:eq(0)").show();	
	
	$(".navContent a").click(function(){
		var n = $(".navContent a").index(this);
		$(".navContent a").index(this);
		$(".container>div").hide();
		$(".container>div:eq("+n+")").show();	
	})
	$('.boxA,.content').click(function () {
          window.open('https://blog.csdn.net/cztqwan/article/details/80267691','_blank');  
    });
    $('.write').click(function () {
          window.open('../edit/edit_markdown.html');  
    });
	
})