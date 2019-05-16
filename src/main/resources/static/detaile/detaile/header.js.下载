// 从后台获取最新的几条公告
//var timer = null; //计时器
function getNotices(){
	doController("common/notice/getnoticesbycount.action",null, function(_response) {
		if (_response.result) {
			var obj = $("#noticeList");
			for(var i=0; i<_response.data.length; i++ ){
				_title = window.encodeURIComponent(_response.data[i].title);
				var _li = $("<li></li>");
				var _alink = $('<a href="'+baseUrl+'/jsp/ecp/public/notice.jsp?id='+ _response.data[i].noticeId +'&title='+  _title +'" target="_blank">'+ _response.data[i].title +'</a>');
				_li.append(_alink);
				obj.append(_li);
				//if(i==0){
//					obj.append('<li><a href="'+baseUrl+'/jsp/ecp/public/notice.jsp?noticeid='+ _response.data[i].noticeId +'&title='+  _title +'" target="_blank"><b>'+ _response.data[i].title +'</b></a></li>');
//				}else{
//					obj.append('<li style="display:none"><a href="'+baseUrl+'/jsp/ecp/public/notice.jsp?noticeid='+ _response.data[i].noticeId +'&title='+  _title +'" target="_blank"><b>'+ _response.data[i].title +'</b></a></li>');
//				}
			}
		}
	},false);
	
	
	//实现公告信息从下到上滚动，如果多条则滚动，3秒一刷
//	if($("#noticeList li").length>1){
//		timer = setInterval(function(){noticeScroll();},3000);
//	}
	
}

//实现公告从下往上滚动
//function noticeScroll(){
//	var noticeList = $("#noticeList");//公告滚动ul对象
//	var firstNotice = noticeList.children().eq(0);
//	var secondNotice = noticeList.children().eq(1);
//	firstNotice.slideUp(500, function(){
//		firstNotice.attr("style","display:none");
//		firstNotice.remove();
//		secondNotice.attr("style","");
//		noticeList.append(firstNotice);
//	});
//}

// 悬停时显示菜单
function menuHover(_div, _ul_li){
	_div.hover(
			function(){
				_ul_li.each(function(){
					$(this).attr("style","");
				});
			}, 
			function(){
				_ul_li.each(function(){
					$(this).attr("style","display:none");
				});
			}
		);
}

// 初始化首页
function headerInit(){
	// 从后台获取最新的几条公告
	if(showNotice == "true" || (window.location.href.indexOf("/index.jsp") !=-1)
		|| window.location.href =="http://www.artrade.com"
        || window.location.href =="http://www.artrade.com/")
	{
		getNotices();
	}else{
		$("#noticeDivBox").html("");	
	}
	

	
	// 悬停时显示所有公告，离开时恢复正常
//	$("#noticeList").hover(
//		function(){
//			if(timer!=null){
//				clearTimeout(timer);
//			}
//			$("#noticeList li").each(function(){
//				$(this).attr("style","");
//			});
//		}, 
//		function(){
//			$("#noticeList li").each(function(){
//				$(this).attr("style","display:none");
//			});
//			$("#noticeList li").eq(0).attr("style","");
//			timer = setInterval(function(){noticeScroll();},3000);
//		}
//	);
	
	// 悬停时显示菜单
	menuHover($("#myDealDiv"), $("#myDeal li"));
	menuHover($("#sellerCenterDiv"), $("#sellerCenter li"));
	menuHover($("#shopSupportDiv"), $("#shopSupportTop li"));
	menuHover($("#shopSupportDiv"), $("#shopSupportLeft li"));
	menuHover($("#shopSupportDiv"), $("#shopSupportRight li"));
	menuHover($("#shopSupportDiv"), $("#shopSupportBottom li"));
	menuHover($("#mavinDiv"), $("#mavinUlDiv li"));
	menuHover($("#helpCenterDiv"), $("#helpCenter li"));
		
}

/**
 * 登出
 */
function logout(){
	window.location.href= baseUrl + "/ecp/logout.action";
}

$(function() {
	// 初始化数据
		headerInit();
		
	//调用superslider插件
	 $(".noticeDivBox").slide({
		  mainCell:".noticeDiv ul",
		  autoPlay:true,
		  effect:"topLoop",
		  vis:1,
		  interTime:3000
    });

})

