$(function(){
	
	$(".infos>div").hide();
	$(".infos>div:eq(0)").show();
	$(".navContent a").click(function(){
		var n = $(".navContent a").index(this);
		$(".infos>div").hide();
		$(".infos>div:eq("+n+")").show();	
	});
})
