/**
 * 首页js显示
 * @author zhangxituan
 * @type
 */
	var MainHome = {
		hot_shop_page : 0, //热门商家的图标个数
		hot_shop_count : 7,  //热门商家每页显示的个数
		// 初始化css样式
		initCss : function() {
			//4:推荐专场中每副图片，当鼠标移动上去，显示文字注释
		   MainHome.initRecPicText();
			
		   // 5:滚动图片的加载
		   MainHome.imgSlider("rec_pic_Slider",15000,2000);
		   MainHome.imgSlider("pop_pic_unslider",10000,5000);
		   
		   //6:绑定热门商家点击事件
		   MainHome.initImg();
		   
		   //7:左侧固定楼层导航条js
		   MainHome.initLeftFloorBar();
		   
		   //8:右侧固定楼层导航条js
		   MainHome.initRightFloorBar();
		   
		   //9:即将开拍 用户点击围观和收藏按钮
		   //MainHome.addToMyFavorite();
		   
		   //10:首页搜索框，全文搜索样式,原来有按拍品名称，年代，分类查询，现在只有按名称查询，故
		 //  MainHome.initSeachInput();
		   
		   //11:获取首页底部最新出价和即将开拍的拍品数据
		   MainHome.initBiddingData();
		   
		   //12:如果首页配置了"即将开拍"的图文内容，则初始化这部分数据
		   MainHome.initWillStartInfo();
		},
		initRecPicText:function(){
			$(".pop_pic_children").hover(function() {
				var des = $(this).find(".pop_pic_textDes");
				des.css("display","block");
				
			}, function() {
				var des = $(this).find(".pop_pic_textDes");
				$(des).css("display","block");
			});
		},
		/**
		 * jquery-superslide轮播插件
		 */
		superSlider:function(ele,setting,showBtn){
			if(setting == null || setting == undefined){
				setting = {};
			}
			var _setting={
					mainCell:".bd ul",
			        autoPlay:true,
			        effect:"fold", 
			        autoPlay:false, 
			        delayTime:1000	
			}
			$.extend(_setting,setting);
			if(showBtn && showBtn == true){
				  ele.hover(function(){
						$(this).find(".prev,.next").stop(true, true).fadeTo("show", 1);
				 },function(){
						$(this).find(".prev,.next").fadeOut();
				 });
			}
			if(ele != null){
				ele.slide(_setting);
			}
		},
	    imgSlider:function(id,delay,speed){
	    	var _delay = 5000;
	    	var _speed = 500;
	    	if(delay != null && delay ==""){
	    	    _delay = delay;
	    	}
	    	if(speed != null && speed ==""){
	    	    _speed = speed;
	    	}
	    	if("imgSlider" ===id){
	    		var unslider = $("#" + id + "").unslider({
					animation : 'fade',
					autoplay : true,
					delay : _delay,
					speed : _speed,
					dots : true, //  是否显示白色圆点，用于slider切换
					pause:true  //鼠标移动上去停止播放
				}), data0 = unslider.data('unslider');
			    $('.unslider-arrow_my').click(function() {
				   var fn = this.className.split(' ')[1];
				     data0[fn]();
				 });
	    	}else{
	    		 $("#" + id + "").unslider({
					animation : 'fade',
					autoplay : true,
					delay : _delay,
					speed : _speed,
					dots : true, //  是否显示白色圆点，用于slider切换
					pause:true  //鼠标移动上去停止播放
				});
	    	}
	    	
	    },
	    showIcon:function(obj, id){
	       var objDiv = $("#" + id + "");
			if (objDiv.is(":hidden")) {
				$(obj).attr("src", baseUrl + "/image/ecp/pullup.png");
				$(objDiv).css("display", "block");
			} else {
				$(obj).attr("src", baseUrl + "/image/ecp/pulldown.png");
				$(objDiv).css("display", "none");
			}
	    },
	    hideIcon:function(obj, id){
	    	var objDiv = $("#" + id + "");
		    $(objDiv).css("display", "none");
	    },
	    initImg:function(){
	    	var imagesObj = $(".hot_logo_img");
		    $("#hot_shop_logo_ul").empty();
		    var _classShow = "hot_shop_logo_ul_li";
		    var _classHide = "img_hidden";
		    for(var i=0; i<imagesObj.length;i++){
		        var _li = "<li class='"+_classShow+"'id="+i+">" +
		       		           " <img src='"+imagesObj[i].src+"'  class='hot_logo_img'/>" +
		       			 "</li>";
		       $("#hot_shop_logo_ul").append(_li);
		    }
			//向右滚动 
	        $("#goNext").click(function(){ //点击事件 
	            var li_width_default = 169;//每个logo的宽度默认值
		        var li_width = 0;
			    var v_show = $("#hot_brand_scroll_list"); //找到logo展示的区域 
			    var v_cont = $("#hot_brand_box"); //找到logo展示区域的外围区域 
			    var len = v_show.find("li").length; //logo图片个数
			    if(len > 0){
			      li_width = v_show.find("li").width();
			    }
			    li_width == 0 ? li_width_default : li_width;
			    var v_width = v_cont.width();
			    var page_count = len-MainHome.hot_shop_count; //只要不是整数，就往大的方向取最小的整数 
			    if (!v_show.is(":animated")) {
			        if (MainHome.hot_shop_page == page_count) {
			            v_show.animate({
			                left: '0px'
			            }, "slow");
			            MainHome.hot_shop_page = 0;
			        }
			        else {
			            v_show.animate({
			                left: '-=' + li_width
			            }, "slow");
			            MainHome.hot_shop_page++;
			        }
			    }
	        });
	        
	        //向左点击滚动
	           $("#goPrev").click(function(){ //点击事件 
	            var li_width_default = 169;//每个logo的宽度默认值
		        var li_width = 0;
			    var v_show = $("#hot_brand_scroll_list"); //找到logo展示的区域 
			    var v_cont = $("#hot_brand_box"); //找到logo展示区域的外围区域 
			    var len = v_show.find("li").length; //logo图片个数
			    if(len > 0){
			      li_width = v_show.find("li").width();
			    }
			    li_width == 0 ? li_width_default : li_width;
			    var v_width = v_cont.width();
			    var page_count = len-MainHome.hot_shop_count; //只要不是整数，就往大的方向取最小的整数 
			    if (!v_show.is(":animated")) {
			        if (MainHome.hot_shop_page == 0) {
	                    v_show.animate({
	                        left: '-=' + li_width * page_count
	                    }, "slow");
	                    MainHome.hot_shop_page = page_count;
	                }
	                else {
	                    v_show.animate({
	                        left: '+=' + li_width
	                    }, "slow");
	                    MainHome.hot_shop_page--;
	                }
			    }
	        });
	    },
	    /**
	     * 初始化左侧固定条
	     */
	    initLeftFloorBar:function(){
	    	//1:用于存储元素距离顶端的距离
	    	 var _list = []; 
	    	 $("div.fixedLeftFloor .fixedLeftFloor_p").each(function(i,item){
	    		 var _obj = {};
	    		 var barId = $(this).attr("barId");
	            var idx = $(this).attr("idx");
				var topVal = $('#_stafloor'+barId).offset().top;
				_obj["idx"] = idx;
				_obj["barId"] = barId;
				_obj["targetId"] = "_stafloor"+barId;
				_list.push(_obj);
	    	 });
	    	 
	    	 //2：完成点击事件动画效果
	    	 $("div.fixedLeftFloor .fixedLeftFloor_p").on("click",function(){
		            var barId = $(this).attr("barId");
					var topVal = $('#_stafloor'+barId).offset().top;
					$('body,html').animate({scrollTop:topVal-30},1000);
					
					var _this = this;
					$(_this).addClass("fixedLeftFloor_chBg").siblings()
				                .removeClass("fixedLeftFloor_chBg");
					
				  
    	     });
	    	
	        //判断滚动条的位置高度，滚动条过了首页图片之后，显示左侧固定导航条
	    	 var hasSetting = false;
			 $(window).bind("scroll",function(){ 
			    var scrollTop = $(window).scrollTop();
				    if(scrollTop >= 625){
				       //固定条开始显示
	    		       $("#fixedLeftFloor").show();
	    		       if(! hasSetting){
	    		          var _leftBarHeight = $("#fixedLeftFloor").height(),
	    		             _winScreenHeigh = $(window).height(),
	    		             _winScreenWidth = $(window).width();
	    		          $("#fixedLeftFloor").css("top",(_winScreenHeigh-_leftBarHeight)/2);
	    		          $("#fixedLeftFloor").css("left",(_winScreenWidth-1240)/2 - $("#fixedLeftFloor").width());
	    		          hasSetting = true;
	    		       }
				    }else{
				       $("#fixedLeftFloor").hide();
				    }
				    
				//绑定滚动条与左侧导航菜单的滚动事件
				    var fixLeftdiv = $('div.fixedLeftFloor .fixedLeftFloor_p');
				    $(_list).each(function(i,ele){
				    	var f_height = $("#"+ele.targetId).offset().top;
				    	if(scrollTop>=f_height-130){
				    		fixLeftdiv.eq(ele.idx-1).addClass('fixedLeftFloor_chBg').siblings().removeClass('fixedLeftFloor_chBg');
						}
				    });
			 });
	    },
	    /**
	     * 初始化右侧固定条
	     */
	    initRightFloorBar:function(){
	        $(".content_second").each(function(i,item){
	            var _this = this;
	            $(_this).hover(function() {
								$(_this).addClass("content_second_chBg").siblings()
						                .removeClass("content_second_chBg");
						        //该节点紧邻的第一个节点显示
						         var _prev = $(_this).prev();
						           _prev.show();
							}, function() {
								$(_this).removeClass("content_second_chBg");
							});
	        });
	        
	        $(".fixedRightFloor_p").each(function(i,item){
	                var _this = this;
	                $(_this).hover(function() {
	                }, function() {
					    //获取第一个子元素,并隐藏 
						var _firstChi = $(_this).find(".content_first");
						_firstChi.hide();
					});
	        });
	        
	        $(".content_first").each(function(i,item){
	               var _this = this;
	               $(_this).hover(function() {
	               	    //获取相邻元素，并显示样式
						 var _next = $(_this).next();
				         _next.addClass("content_second_chBg");
					}, function() {
						 var _next = $(_this).next();
				         _next.removeClass("content_second_chBg");
					});
	        });
	    },
	    /**
	     * 对于即将开拍的模板，当用户在首页点击收藏时，添加到用户的收藏夹中
	     */
	    addToMyFavorite:function(){
	        $(".strat_img_fav").each(function(i,item){
	            var _this = this;
	            //获取该节点的子节点
	            var _roomId = $(_this).attr("id");  //房间id
	            var _eyeImg = $(_this).children("img");
	            /*var _src = _eyeImg.attr("src");
	            var _picOrgName = _src.substr(_src.lastIndexOf("/")+1,_src.length);*/
	            $(_this).hover(function() {
	               	  $(_eyeImg).attr("src",baseUrl+"/image/ecp/fav_red_s.png"); 
				}, function() {
					 $(_eyeImg).attr("src",baseUrl+"/image/ecp/fav_red_sh.png");
				});
	        });
	    },
	    /**
	     * 初始化首页搜索框
	     */
	    /*initSeachInput:function(){
	       $("#selectPanel_list li").each(function(i,item){
	       	   $(this).unbind("click");
	           $(this).bind("click",function(){
	              $(this).parent().hide();
	           }).hover(function(){
	              $(this).css({
	                 "background":"#C81623",
	                 "color":"#fff"
	              });
	            },function(){
	              $(this).css({
	                 "background":"#fff",
	                 "color":"#7A2A30"
	              });
	            });
	       });
	       
	       $("#selectPanel_list").hover(function(){
	       	  $("#pdIcon").attr("src", baseUrl + "/image/ecp/pullup.png");
	          $(this).show();
	       },function(){
	       	  $("#pdIcon").attr("src", baseUrl + "/image/ecp/pulldown.png");
	          $(this).hide();
	       });
	    },*/
	    /**
	     * 绑定即将开拍数据
	     */
	    bindWaitStartEle:function(_wsitems){
	    	if(_wsitems !=null){
	    		$(_wsitems).each(function(i,item) {
	    			var _ul=$("<ul class='news_info_ul_news_ul'></ul>");
					var _li_left=$("<li class='news_info_ul_news_ul_lef'></li>");
					var _li_img=$("<img src='"+baseUrl+"/image/ecp/new_yuandian.png'  class='news_info_img'/>");
					var _span = $("<span></span>");
					var _alink = $("<a href='"+lotUrl+""+item.LOT_ID+"' target='_blank'></a>");
					_alink.append(item.ITEM_NAME);
					_span.append(_alink);
					_li_left.append(_li_img).append(_span);
					
					var _li_rig = $("<li class=news_info_ul_news_ul_rig></li>");
					_li_rig.append(new Date(item.LOT_START_TIME).format("yyyy-MM-dd"));
					_ul.append(_li_left);
					_ul.append(_li_rig);
					$("#bidwaitStartDiv").append(_ul);
				});
	    	}
	    },
	    /**
	     * 绑定最新出价信息
	     */
	    bindLastBidEle:function(_bids){
	    	if(_bids != null){
	    		$(_bids).each(function(i,item) {
	    			var _ul=$("<ul class='news_info_ul_bidding_ul'></ul>");
					var _li_left=$("<li class='news_info_ul_bidding_ul_lef'></li>");
					var _li_img=$("<img src='"+baseUrl+"/image/ecp/new_yuandian.png'  class='news_info_img'/>");
					var _span = $("<span></span>");
					var _alink = $("<a href='"+lotUrl+""+item.LOT_ID+"' target='_blank'></a>");
					_alink.append(item.ITEM_NAME);
					_span.append(_alink);
					_li_left.append(_li_img).append(_span);
					
					var _li_rig = $("<li class=news_info_ul_bidding_ul_rig></li>");
					_li_rig.append(FormatMoney(item.BID_PRICE+""));
					_ul.append(_li_left);
					_ul.append(_li_rig);
					$("#lastbids").append(_ul);
				});
	    	}
	    },
	    /**
	     * 滚动显示最新出价信息
	     */
	    initBiddingData:function(){
	    	doController("common/index/getindexfootinfo.action", null,function(_response) {
	    		if (_response.result) {
	    			var _data = _response.data;
	    			var _bids = _data.bids;
	    			var _wsitems = _data.wsItems;
	    			//绑定即将开拍数据
	    			MainHome.bindWaitStartEle(_wsitems);
                    //绑定最新出价数据
	    			MainHome.bindLastBidEle(_bids);
	    		}
	    	},false);
	    	
	    	$(".news_info_ul_bidding").slide({
	    		         mainCell:".bidTopDiv",
	    		         autoPlay:true,
	    		         effect:"topMarquee",
	    		         vis:10,
	    		         interTime:50
	    	});
	    	$(".news_info_ul_news").slide({
			    		 titCell:".hd ul",
			    		 mainCell:".bidwaitStartDiv",
			    		 autoPage:true,
			    		 effect:"top",
			    		 autoPlay:true,
			    		 vis:10,
			    		 scroll:10,
			    		 delayTime:50,
			    		 interTime:50000
	        });
	    },
	    /**
	     * 即将开拍的图文信息初始化
	     */
	    initWillStartInfo:function(){
	    	var _wpperLen = $(".start_action_wrapper_div").length;
	    	if(_wpperLen>0){
	    	    var _liDivs = $(".start_action_wrapper_div").find(".start_action_ul_li_lef_wraper");
	    	    if(_liDivs && _liDivs.length>0){
	    	    	//解析url链接地址
	    	    	MainHome.initUrlParams(_liDivs);
	    	    }
	    	}
	    },
	    /**
	     * 解析url链接地址
	     */
	    initUrlParams:function(_liDivs){
	    	$(_liDivs).each(function(i,ele){
	    		var _url = $(ele).attr("pageUrl");
	    		var _urlObj = parseStandURL(_url);
	    		if(_urlObj !=null){
	    			//填充单个即将开拍的拍品信息
	    			MainHome.setWillStartInfo(_urlObj,ele); 
	    		}
	    	});
	    },
	    //填充单个即将开拍的拍品信息
	    setWillStartInfo:function(_urlObj,ele){
	    	var _params = _urlObj.params;
	    	if(_params && _params.lotid){
	    		//依据拍品的lotid获取单个拍品的拍品信息
	    		MainHome.getItemInfobyLotId(_params,ele);
	    	}else if(_params && _params.saleroomid){
	    		//依据专场号获取专场的信息
	    		MainHome.getSaleRoomInfoById(_params,ele);
	    	}
	    },
	    /**
	     * 依据拍品lotid获取拍品信息
	     */
	    getItemInfobyLotId:function(_params,ele){
	    	doController("common/index/getinfobylotid.action", {"lotid":_params.lotid+""},function(_response) {
	    		if(_response.result){
	    			var _data = _response.data;
	    			if(_data && _data !=''){
	    				//设置拍品开拍倒计时
	    				MainHome.setItemInfoCountDown.call(ele,_data,ele);
	    			}
	    		}
	    	});
	    },
	    
	    /**
	     * 依据专场saleroomid获取专场信息
	     */
	    getSaleRoomInfoById:function(_params,ele){
	    	doController("common/index/getsaleroominfobyid.action", {"sroomId":_params.saleroomid+""},function(_response) {
	    		if(_response.result){
	    			var _data = _response.data;
	    			if(_data && _data !=''){
	    				//设置专场的开拍倒计时
	    				MainHome.setSaleRoomCountDown.call(ele,_data,ele);
	    			}
	    		}
	    	});
	    },
	    /**
	     * 设置拍品详情页的开拍倒计时
	     */
	    setItemInfoCountDown:function(_data,ele) {
	    	sDate = null;
	    	var biddingStartTime = _data.STARTTIME;
	    	var biddingEndTime = _data.ENDTIME;
	    	var startTimeStep = 0;
	    	var biddingEndTimeStep = 0;
	    	var name=getItemTitle(_data.ITEMNAME,_data.GLIDEMARK,_data.FIRSTCATGID,_data.AUTHORNAME,_data.ITEMAGE);
		
	    	$(ele).find("span.concernCounts").html(_data.counts);//设置关注次数
	    	$(ele).find("li.start_img_des_ul_li_title1").html(name);//标题展示名称
	    	setIntervalP = setInterval(function() {
	    		var currDate = countDownTime(new Date(biddingStartTime
	    				- startTimeStep).format("yyyy-MM-dd hh:mm:ss"));
	    		startTimeStep += 1000;
	    		if (fixMath(fixMath(fixMath(currDate.day, currDate.hour, "+"),
	    				currDate.minute, "+"), currDate.second, "+") == 0) {
					if($(ele).data("pageStatus")=="noAction"){
						biddingEndTimeStep = 0;
						sDate=null
					}
	    			currDate = countDownTime(new Date(fixMath(biddingEndTime
	    					, biddingEndTimeStep,"-")).format("yyyy-MM-dd hh:mm:ss"));
	    			biddingEndTimeStep += 1000;
					
	    			if (fixMath(fixMath(fixMath(currDate.day, currDate.hour, "+"),
	    					currDate.minute, "+"), currDate.second, "+") == 0) {
			
	    				MainHome.setPageStatus(ele,"actioned");
						$(ele).data("pageStatus","actioned");	
	    			} else {
	    				MainHome.setPageStatus(ele,"actioning");
						$(ele).data("pageStatus","actioning");
	    			}
	    		} else {
	    			 MainHome.setPageStatus(ele,"noAction");
					$(ele).data("pageStatus","noAction");
	    		}
	    		$(ele).find("span.day").html(currDate.day);// 距开拍几天
	    		$(ele).find("span.hour").html(currDate.hour);// 距开拍几时
	    		$(ele).find("span.minute").html(currDate.minute);// 距开拍几分
	    		if(currDate.day==0&&currDate.hour==0&&currDate.minute==0&&currDate.second<30){
	    		var cssSecond="<font style='font-size:16px;'>"+currDate.second+"</font>";
	    		    $(ele).find("span.second").html(cssSecond);// 距开拍几秒	
	    		}else{
	    			$(ele).find("span.second").html(currDate.second);// 距开拍几秒
	    		}
	    	}, 1000);
	    },
	    //依据状态调用图片显示
	    //@param statusType:拍卖状态【noAction:预展;actioning:竞拍中actioned:已结束;】
	    setPageStatus:function(ele,statusType){
	    	switch (statusType) {
	    	case "noAction":
	    		$(ele).find("li div.start_img_des_ul_li_title2_divright").css({"color":"#A56322","border":"2px solid #A56322"}).html("预展中");
				break;
	    	case "actioning":
	    		$(ele).find("span.xiaxianspan").html("距结束时间:");// 距开拍几秒
	    		//$(ele).find("div.start_img_des_ul_li_content_lef").css("visibility","hidden");// x天x时x分x秒
	    		$(ele).find("li div.start_img_des_ul_li_title2_divright").css({"color":"#d23030","border":"2px solid #d23030"}).html("竞拍中");
				break;
	    	case "actioned":
	    		$(ele).find("li div.start_img_des_ul_li_title2_divright").css("color","#999").html("已下线");
				break;
	    	default:
	    		
	    	}
	    },
	    /**
	     * 设置专场页面的拍倒计时
	     */
	    setSaleRoomCountDown:function(_data,ele) {
	    	sDate = null;
	    	var biddingStartTime = _data.srStartTime;
	    	var biddingEndTime = _data.srEndTime;
	    	var startTimeStep = 0;
	    	var biddingEndTimeStep = 0;
	    	var name=_data.srName == null ? "" :_data.srName;
	    	$(ele).find("div.start_img_des_ul_li_content_rig").hide();//隐藏关注次数
	    	$(ele).find("li.start_img_des_ul_li_title1").html(name);//标题展示名称
	    	setIntervalP = setInterval(function() {
	    		var currDate = countDownTime(new Date(biddingStartTime
	    				- startTimeStep).format("yyyy-MM-dd hh:mm:ss"));
	    		startTimeStep += 1000;
	    		if (fixMath(fixMath(fixMath(currDate.day, currDate.hour, "+"),
	    				currDate.minute, "+"), currDate.second, "+") == 0) {
	    			currDate = countDownTime(new Date(biddingEndTime
	    					- biddingEndTimeStep).format("yyyy-MM-dd hh:mm:ss"));
	    			biddingEndTimeStep += 1000;
	    			if (fixMath(fixMath(fixMath(currDate.day, currDate.hour, "+"),
	    					currDate.minute, "+"), currDate.second, "+") == 0) {
			
	    				MainHome.setPageStatus(ele,"actioned");
	    			} else {
	    				MainHome.setPageStatus(ele,"actioning");
	    			}
	    		} else {
	    			 MainHome.setPageStatus(ele,"noAction");
	    		}
	    		$(ele).find("span.day").html(currDate.day);// 距开拍几天
	    		$(ele).find("span.hour").html(currDate.hour);// 距开拍几时
	    		$(ele).find("span.minute").html(currDate.minute);// 距开拍几分
	    		if(currDate.day==0&&currDate.hour==0&&currDate.minute==0&&currDate.second<30){
	    		var cssSecond="<font style='font-size:16px;'>"+currDate.second+"</font>";
	    		    $(ele).find("span.second").html(cssSecond);// 距开拍几秒	
	    		}else{
	    			$(ele).find("span.second").html(currDate.second);// 距开拍几秒
	    		}
	    	}, 1000);
	    }
	}
	
	/**
	 * 右上方搜索框输入后查询
	 */
	function doSearch(){
		var val = $("#keywordInput").val();
		var setting={
	 	"action":baseUrl+"/jsp/ecp/item/manage/itemquerylist.jsp",
	 	"datas":[{"name":"value","value":val}]	
	  };	
	  simulateFormSubmit(setting);
	}
	
	
	$(function() {
		
		//从左上部显示遮罩效果 开始
		$(".ecmall_img").hover(function() {
			$(this).find(".ecmall_txt").stop().animate({"left": 0,"top":0});
		}, function() {
			$(this).find(".ecmall_txt").stop().animate({"left":-190,"top":-190});
		})
		//从左上部显示遮罩效果 结束
			   
		// 隐藏首页链接
		$("#indexLinkDiv").hide();
		// 初始化数据
		MainHome.initCss();
		

	})
	
	