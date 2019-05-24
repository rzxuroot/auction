
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
               $("#shcfy_rig_first").append("<div class='shcfy_rig_first_content' id="+item.id+" l1Text="+item.text+">" +
               		" <span class='showppClassify_li_span'>"+item.text+"</span></div>");
               $("#"+item.id).data("id",item.id);
               $("#"+item.id).data("l1Text",item.text);
               $("#"+item.id).data("l1Id",item.id);
               $("#"+item.id).data("l2Text","");
               $("#"+item.id).data("l2Id","");
               $("#"+item.id).data("level",item.attributes['curLevel']);
			   $("#2,#3,#4,#5,#6,#7").css({
						   "margin":"0px"
						   });
			   
			   
               	var _childItem=item;
               	for(var j=0;j<_childItem.children.length;j++){
           	  		var child = _childItem.children[j];
           	  	 $("#shcfy_rig_first").append("<div class='shcfy_rig_first_content' id="+child.id+" l1Text="+_childItem.text+">"+child.text+"</div>");
           	  	 $("#"+child.id).data("id",child.id);
               	 $("#"+child.id).data("l1Text",_childItem.text);
               	 $("#"+child.id).data("l1Id",_childItem.id);
              	 $("#"+child.id).data("l2Text",child.text);
              	 $("#"+child.id).data("l2Id",child.id);
           	  	 $("#"+child.id).data("level",child.attributes['curLevel']);
				 
			
				 
				$("#"+child.id).off("click"); 

				/*列表的时间*/
				$("#"+child.id).bind("click",function(){
				      var _id = $(this).data("id");
				      var _lev = $(this).data("level");
				      var _l1Id = $(this).data("l1Id");
				      /*获得一级目录的名称*/
				      var _l1Text = $(this).data("l1Text");
				      var _l2Id = $(this).data("l2Id");
				      /*获得2级目录的名称*/
				      var _l2Text = $(this).data("l2Text");
					  var setting={
			        	"action":baseUrl+"/jsp/ecp/item/manage/itemquerylist.jsp",
			        	"datas":[{"name":"categoryId","value":_id},
							     {"name":"l1Id","value":_l1Id},
							     {"name":"l1Text","value":_l1Text},
							     {"name":"l2Id","value":_l2Id},
							     {"name":"l2Text","value":_l2Text},
								 {"name":"lev","value":_lev}],	
			            "target":"_blank"
					  };
					  if(_l2Text != "" && _l2Text != null){
                          location.href="index.html?list="+_l1Text+"&content="+_l2Text
					  }else{
                          location.href="index.html?content="+_l2Text
					  }
					  //将原方法注释，添加新方法,为二级目录的点击事件

					/*location.href="index.html?content="+encodeURI(encodeURI(_l2Text))*/
			         /*simulateFormSubmit(setting);*/
				});
				 
           	  	}
			   
			   
			   
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
				$(".shcfy_rig_first_content").bind("click",function(){
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
			            "target":"_blank"
					  };	
			         simulateFormSubmit(setting);
				});
		
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
		

		
		
		   //3：当用户点击一级时，跳转到相应的页面
	    	IndexNavMenu.goToItemQueryList();
		
		
		
	},
    /**
     * 当用户点击一级或二级拍品分类时，执行
     */
    goToItemQueryList:function(){
    	// 一级菜单点击事件
        $("#2,#3,#4,#5,#6").bind("click",function(){
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
	        	"target":"_blank"
	         };
			/*一级目录跳转*/
            /*location.href="index.html?list="+encodeURI(encodeURI(_l1Text))*/
            location.href="index.html?list="+_l1Text
	        /* simulateFormSubmit(setting);*/
		});
    },
    showIcon:function(obj, id){
       var objDiv = $("#" + id + "");
		if (objDiv.is(":hidden")) {
			//此处更改了图片路径
			/*$(obj).attr("src", baseUrl + "/image/ecp/pullup.png");*/
            $(obj).attr("src", baseUrl + "/index1/image/ecp/pullup.png");
			$(objDiv).slideToggle("slow");
		} else {
			/*$(obj).attr("src", baseUrl + "/image/ecp/pulldown.png");*/
            $(obj).attr("src", baseUrl + "/index1/image/ecp/pulldown.png");
			$(objDiv).slideToggle("fast");
		}
    }
}

$(function() {
		// 初始化数据
		IndexNavMenu.initData();
})