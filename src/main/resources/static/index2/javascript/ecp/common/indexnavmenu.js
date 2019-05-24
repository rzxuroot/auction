
var IndexNavMenu={
	menuLi_Count:0, //一级菜单的个数
	menuLi_Height:40,//一级菜单的高度
   initData : function() {
		// 清空ul 里 li的内容
       	    $(".showppClassify_ul li").each(function(){
				$(this).remove();
			}); 
       	// 添加一级导航菜单数据
	        $.each(EcpIdxMenus, function(i, item) {
	        	menuLi_Count = i;
               $("#showppClassify_ul").append("<li class='showppClassify_ul_li' id="+item.id+" l1Text="+item.text+">" +
               		" <span class='showppClassify_li_span'>"+item.text+"</span></li>");
               $("#"+item.id).data("id",item.id);
               $("#"+item.id).data("l1Text",item.text);
               $("#"+item.id).data("l1Id",item.id);
               $("#"+item.id).data("l2Text","");
               $("#"+item.id).data("l2Id","");
               $("#"+item.id).data("level",item.attributes['curLevel']);
	        });
	        // 2:初始化css样式
			IndexNavMenu.initCss();
	},
	initCss:function(){
	   function initSecondMenuData(id,_p){
			var _childItem = null;
			$.ajaxSettings.async = false; //设置查询数据同步
		    
	        for(var j=0;j<EcpIdxMenus.length;j++){
       	  		var item = EcpIdxMenus[j];
       	  		 if(item.id == id){
                   _childItem = item;
                   break;
                }
       	  	}
          
           $.ajaxSettings.async = true;
           if(_childItem != null){
           	  $("#shcfy_rig_first").empty();
           	  if(_childItem.children && _childItem.children.length >0){
           	  	for(var j=0;j<_childItem.children.length;j++){
           	  		var child = _childItem.children[j];
           	  	 $("#shcfy_rig_first").append("<div class='shcfy_rig_first_content' id="+child.id+" l1Text="+_childItem.text+">"+child.text+"</div>");
           	  	 $("#"+child.id).data("id",child.id);
               	 $("#"+child.id).data("l1Text",_childItem.text);
               	 $("#"+child.id).data("l1Id",_childItem.id);
              	 $("#"+child.id).data("l2Text",child.text);
              	 $("#"+child.id).data("l2Id",child.id);
           	  	 $("#"+child.id).data("level",child.attributes['curLevel']);
           	  	}
           	   
           	  	//二级菜单点击事件
				/*$(".shcfy_rig_first_content").bind("click",function(){
				      var _id = $(this).data("id");
				      var _lev = $(this).data("level");
				      var _l1Id = $(this).data("l1Id");
				      var _l1Text = $(this).data("l1Text");
				      var _l2Id = $(this).data("l2Id");
				      var _l2Text = $(this).data("l2Text");
					  var setting={
			        	"action":baseUrl+"/jsp/ecp/item/manage/itemquerylist.jsp",
			        	"datas":[{"name":"categoryId","value":_id},
							     {"name":"l1Id","value":_l1Id},
							     {"name":"l1Text","value":_l1Text},
							     {"name":"l2Id","value":_l2Id},
							     {"name":"l2Text","value":_l2Text},
								 {"name":"lev","value":_lev}],	
			            "target":"_self"
					  };	
			         simulateFormSubmit(setting);
				});*/
		
		         //鼠标经过二级菜单文字事件
				$(".shcfy_rig_first_content").hover(function() {
					$(this).addClass("shcfy_rig_first_content_activity").siblings()
					.removeClass("shcfy_rig_first_content_activity");
				}, function() {
					$(this).removeClass("shcfy_rig_first_content_activity");
				});
           	  }
           }
		}
		
		
		
		
		// 1:导航条菜单点击事件
		$(".menu_ul_li a").hover(function(e) {
			var _this = this;
			$(".menu_ul_li a").each(function(){
			    $(this).removeClass("menu_active");
			});
			$(_this).addClass("menu_active").siblings()
					.removeClass("menu_active");
		});
		

		// 2:鼠标经过一级菜单事件
		$(".showppClassify_ul_li").hover(function(e) {
			//定义右边显示框距离顶端的位置
			var _this = this;
            var _scrollHeight = $(document).scrollTop();
            if(_scrollHeight >190){
               $("#showppClassify_rig").css({"top":""+(_scrollHeight-190)+"px"});
            }else{
               $("#showppClassify_rig").css({"top":"0px"});
            }
            //获取当前元素的id，遍历子元素，填充右边
              initSecondMenuData($(_this).attr("id"),_this);
            //定义右浮动框的最小高度
            $("#showppClassify_rig").css("min-height",parseInt(IndexNavMenu.menuLi_Height)*parseInt(menuLi_Count+1)+"px");
            $(".shcfy_rig_second").css("height",parseInt(IndexNavMenu.menuLi_Height)*parseInt(menuLi_Count+1)+"px");
            //移除子元素中span的bodder-bottom
			var _span = $(_this).children();
			_span.css("border-bottom", 0);
			$(_this).addClass("showppClassify_li_activity").siblings()
					.removeClass("showppClassify_li_activity");
					
		}, function() {
			var _span = $(this).children();
			_span.css("border-bottom", "1px solid #545051");
		});
		
		//鼠标经过一级菜单包括框事件
		$(".showppClassify_wrap").hover(function() {
			$("#showppClassify_rig").fadeIn(500);
		}, function() {
			$("#showppClassify_rig").fadeOut(1000);
			$(".showppClassify_ul_li").each(function(){
			   $(this).removeClass("showppClassify_li_activity");  
			});
		});
		
		   //3：当用户点击一级时，跳转到相应的页面
	    	/*IndexNavMenu.goToItemQueryList();*/
		
		
		
	},
    /**
     * 当用户点击一级或二级拍品分类时，执行
     */
    /*goToItemQueryList:function(){
    	// 一级菜单点击事件
        $(".showppClassify_ul_li").bind("click",function(){
        	 var _id = $(this).data("id");
        	 var _lev = $(this).data("level");
	 
			  var _l1Id = $(this).data("l1Id");
			  var _l1Text = $(this).data("l1Text");
			  var _l2Id = $(this).data("l2Id");
			  var _l2Text = $(this).data("l2Text");
			 
			 var setting={
	        	"action":baseUrl+"/jsp/ecp/item/manage/itemquerylist.jsp",
	        	"datas":[{"name":"categoryId","value":_id},
						 {"name":"l1Id","value":_l1Id},
						 {"name":"l1Text","value":_l1Text},
						 {"name":"l2Id","value":_l2Id},
						 {"name":"l2Text","value":_l2Text},
						 {"name":"lev","value":_lev}],
	        	"target":"_self"
	         };	
	         simulateFormSubmit(setting);
		});
    },*/
    showIcon:function(obj, id){
       var objDiv = $("#" + id + "");
		if (objDiv.is(":hidden")) {
			$(obj).attr("src", baseUrl + "/image/ecp/pullup.png");
			$(objDiv).css("display", "block");
		} else {
			$(obj).attr("src", baseUrl + "/image/ecp/pulldown.png");
			$(objDiv).css("display", "none");
		}
    }
}

$(function() {
		// 初始化数据
		IndexNavMenu.initData();
})