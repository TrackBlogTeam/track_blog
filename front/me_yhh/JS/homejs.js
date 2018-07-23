function saveInformation()
{
	alert("保存成功！")
}

function chooseHead()
{
	alert("进行头像更改")
}

$(document).ready(function(){
 $("div#informationbutton").click(function(){
  $("div.information").show();
  $("div.article").hide();
  $("div.collection").hide();
  $("div.setting").hide();
  $("div.cover").hide();
  });
});

$(document).ready(function(){
 $("div#articlebutton").click(function(){
  $("div.information").hide();
  $("div.article").show();
  $("div.collection").hide();
  $("div.setting").hide();
  $("div.cover").hide();
  });
});

$(document).ready(function(){
 $("div#coverbutton").click(function(){
  $("div.cover").show();
  $("div.article").hide();
  $("div.information").hide();
  $("div.setting").hide();
  $("div.collection").hide();
  });
});

$(document).ready(function(){
 $("div#settingbutton").click(function(){
  $("div.setting").show();
  $("div.article").hide();
  $("div.collection").hide();
  $("div.information").hide();
  $("div.cover").hide();
  });
});

$(document).ready(function(){
 $("div#collectionbutton").click(function(){
  $("div.collection").show();
  $("div.article").hide();
  $("div.information").hide();
  $("div.setting").hide();
  $("div.cover").hide();
  });
});