/*
* @Object       : CommonWinForm
* @author       : ruanqingfeng zhangxituan
* @version      : 对话框组件1.0版本
* @for example  : 将本js引入后，在需要显示组件的地方加入
*/
var CommonWinFormIndex = 10000;
var EcpWinForm = function(_cfg){
	this.width = 600;//宽度
	this.height = 300;//高度
	this.title = "系统提示";
	this.msg = "";
	this.iconCls = "";
	this.url = "";
	this.animateType = "fadeSlide";//fadeSlide,fade
	this.header={
	    height:30,
		background:"#E8E8E8",
		color:"#525252"
	};
	this.listeners = {};
	this.iframHeight=0;
	this.msgAsk="确定要删除吗?";
	$.extend(this,_cfg);
	var _this = this;
	var modalBackgroundDiv = null;
	var windowDiv = null;
    
	//弹出框包裹层
	var winFormWrapDiv = null;//主要的内容区域
	var windowDiv_mainContent = null; //九宫格中中间的格子，放置内容区域
	/**
	 * 创建弹出框
	 * @returns
	 */
	var createWindowDiv = function (){
		//$("#allModalBackgroundDiv").remove(); //移除全局遮罩div
		var modalBackgroundDivHeight = $(document).height();
		//创建全局div遮罩层
		modalBackgroundDiv = $("<div id='allModalBackgroundDiv' style='position:absolute;width:" + ($(top.document.body).width()) + "px;height:" + modalBackgroundDivHeight + "px;background-color:#000000;z-index:" + (CommonWinFormIndex++) +";'></div>");
		modalBackgroundDiv.css("opacity","0");
		//创建弹出框,按照九宫格的形式给弹出框添加周围的阴影效果
		windowDiv = $("<div class='windowDiv' style='z-index:" + (CommonWinFormIndex++) +";'></div>");
		
		//第一行内容
		var windowDiv_r1=$("<div class='windowDiv_r1' style='width:"+(_this.width+18)+"px;'></div>");
		windowDiv_r1.append($("<div class ='windowDiv_r1_1'></div>"));
		windowDiv_r1.append($("<div class ='windowDiv_r1_2' style='width:"+_this.width+"px;'></div>"));
		windowDiv_r1.append($("<div class ='windowDiv_r1_3'></div>"));
		windowDiv.append(windowDiv_r1);
		
		
		//第二行内容
		var windowDiv_r2=$("<div class='windowDiv_r2' style='width:"+(_this.width+18)+"px;height:"+_this.height+"px;'></div>");
		windowDiv_r2.append($("<div class ='windowDiv_r2_1' style='height:"+_this.height+"px;'></div>"));
		windowDiv_mainContent = $("<div class ='windowDiv_r2_2' style='width:"+_this.width+"px;height:"+_this.height+"px;'></div>");
		var mainBody = createBody();
		windowDiv_mainContent.append(mainBody);
		windowDiv_r2.append(windowDiv_mainContent);
		//设置右侧的阴影效果
		var windowDiv_r2_r3=$("<div class ='windowDiv_r2_3' style='height:"+_this.height+"px;'></div>");
		windowDiv_r2_r3.append($("<div class ='windowDiv_r2_3_1'></div>"));
		windowDiv_r2_r3.append($("<div class ='windowDiv_r2_3_2' style='height:"+(_this.height-36)+"px;'></div>"));
		windowDiv_r2.append(windowDiv_r2_r3);
		windowDiv.append(windowDiv_r2);
		
		//第三行内容
		var windowDiv_r3=$("<div class='windowDiv_r3' style='width:"+(_this.width+18)+"px;'></div>");
		windowDiv_r3.append($("<div class ='windowDiv_r3_1'></div>"));
		windowDiv_r3.append($("<div class ='windowDiv_r3_2' style='width:"+(_this.width+18-17-28)+"px;'></div>"));
		windowDiv_r3.append($("<div class ='windowDiv_r3_3'></div>"));
		windowDiv.append(windowDiv_r3);
		
		windowDiv.css("opacity","0").css("left",($(top.document).width() - _this.width)/2);
		$(top.document.body).children().eq(0).before(modalBackgroundDiv);
		$(top.document.body).children().eq(0).before(windowDiv);
	}


	//创建主要body信息
	function createBody() {
		winFormWrapDiv = $("<div class='winFormWrapDiv' style='z-index:" + (CommonWinFormIndex++) +";'></div>");
		//添加div头部内容
		var winFormHeader = $("<div class='winForm_header' style='width: " + _this.width + "px;' id='winFormHeader'></div>");
		winFormHeader.css({
		      height:_this.header.height+"px",
		      background:_this.header.background
		});
		var winFormHeader_title= $("<div class='winForm_header_r1'>"+_this.title+"</div>");
		winFormHeader_title.css({
		      color:_this.header.color
		}); 
		winFormHeader.append(winFormHeader_title);
		var winFormHeaderColseBtn =$("<div class='winForm_hearder_closeDiv'><img src='"+baseUrl+"/common/javascript/lib/winform/image/close_a.png' id='winForm_closeBtn' class='headecolseImg'/></div>");
		
		//如果是错误或其他消息，修改关闭按钮的颜色
		
		winFormHeader.append(winFormHeaderColseBtn);
		winFormHeader.append($("<br style='clear:both;' />"));
		//绑定事件到关闭按钮处
		winFormHeaderColseBtn.unbind("mouseover").unbind("mouseout").unbind("click");
		winFormHeaderColseBtn.bind("mouseover",function(){
		    	$("#winForm_closeBtn").attr('src',baseUrl+"/common/javascript/lib/winform/image/close.png");
		}).bind("mouseout",function(){
				$("#winForm_closeBtn").attr('src',baseUrl+"/common/javascript/lib/winform/image/close_a.png");
		}).bind("click",function(){
			_this.close();
		});
		winFormWrapDiv.append(winFormHeader);
		//添加主消息体
		var winFormContent = $("<div id='winForm_content'class='winForm_content' style='height:"+(_this.height-(winFormHeader.height()+60))+"px;width: " + _this.width + "px;'></div>");
		if(_this.msg != ""){
			winFormContent.css("height",_this.height-(winFormHeader.height()));//总体高度-头部高度40
			var window_msg_wrap = $("<div class='window_msgClass' style='height:"+(_this.height-60)+"px;'></div>");
			var windMsgIconSrc = baseUrl+"/common/javascript/lib/winform/image/msg_error_icon.png";
			if(_this.iconCls == "info"){
			    windMsgIconSrc = baseUrl+"/common/javascript/lib/winform/image/msg_ok_icon.png";
			}
			var windowMsgIcon = $("<div class='windMsgIcon'></div");
			var windowMsgIconImg = $("<img src='"+windMsgIconSrc+"'/>");
			var winddowMsgCont = $("<div class='windMsgCont'>"+_this.msg+"</div>");
			if(_this.iconCls != ""){
				//如果是错误提示的要改变标题头颜色
				if(_this.iconCls == "sysError" || _this.iconCls == "info" ||  _this.iconCls == "confirm"){
					window_msg_wrap.append(winddowMsgCont);
					winFormContent.append(window_msg_wrap);
				}
			}else{
				//没有iconCls标志时默认执行该方法,仅添加提示内容
				winFormContent.append(window_msg_wrap);
			}
		}else if(_this.url != ""){
			
			//设置body颜色
			winFormContent.css("background","#F7F7F7");
			if(_this.iframHeight ==0){
			   winFormContent.css("overflow-y","hidden");
			}
			
			var window_frame = $('<iframe id="winFormContentIframe" frameborder="0" scrolling="'+(_this.iframHeight ==0 ? "no" : "yes")+'" width="'+ (_this.width) +'" height="'+(_this.iframHeight ==0 ? (_this.height-60) : _this.iframHeight)+'" src="' + _this.url + '"></iframe>');
			winFormContent.append(window_frame);
		}
		winFormWrapDiv.append(winFormContent);
		
		
		
		//添加底部div
		var winFromBottDiv = $(" <div id='winForm_foot' class='winForm_foot' style='width: " + _this.width + "px;'></div>");
		var winFromBottDiv_r1 = $("<div style='margin-top:13px;float:right'></div>");
		//点击确定按钮时默认执行该方法 
		if(_this.listeners.sure != null){
			var sureBtn = $("<div class='winForm_foot_sureBtnDiv_r1'><div class='winForm_foot_sureBtnDiv_r2'>"+_this.listeners.sure.text+"</div></div> ");
			sureBtn.bind("mouseover",function(){
				sureBtn.removeClass("winForm_foot_sureBtnDiv_r1").addClass("winForm_foot_sureBtnDiv_r3");
			}).bind("mouseout",function(){
				sureBtn.removeClass("winForm_foot_sureBtnDiv_r3").addClass("winForm_foot_sureBtnDiv_r1");
			}).bind("click",function(){
				var result = null;
				var value = null;
				if(_this.url != ""){
					if((top.$("#winFormContentIframe")[0].contentWindow).getSaveValue){
					    value = (top.$("#winFormContentIframe")[0].contentWindow).getSaveValue();
						result = _this.listeners.sure.execute(value,_this);
					}
				}else{
				       result = _this.listeners.sure.execute(_this);
				}
				if(result!=false){
					_this.close();
				}
			});
			winFromBottDiv_r1.append(sureBtn);
		}
		
		//清除按钮会调用该方法
		if(_this.listeners.clear != null){
			var clearBtn = $("<div class='winForm_foot_clearBtnDiv_r1'><div class ='winForm_foot_clearBtnDiv_r2'>"+_this.listeners.clear.text+"</div></div> ");
			clearBtn.bind("mouseover",function(){
				clearBtn.removeClass("winForm_foot_clearBtnDiv_r1").addClass("winForm_foot_clearBtnDiv_r3");
			}).bind("mouseout",function(){
				clearBtn.removeClass("winForm_foot_clearBtnDiv_r3").addClass("winForm_foot_clearBtnDiv_r1");
			}).bind("click",function(){
				var result = null;
				if(_this.url != ""){
					var value = null;
					value = (top.$("#winFormContentIframe")[0].contentWindow).doReset();
					if(_this.listeners.clear.execute != null){
						result = _this.listeners.clear.execute(value,_this);
					}else{
						result = _this.listeners.clear(value,_this);
					}
				}else{
				   result = _this.listeners.clear.execute();
				}
				if(result!=false){
					_this.close();
				}
			});
			winFromBottDiv_r1.append(clearBtn);
		}
		if(_this.listeners.clear != null || _this.listeners.sure != null){
			winFromBottDiv.append(winFromBottDiv_r1);
			winFormWrapDiv.append(winFromBottDiv);
		}
		return winFormWrapDiv;
	}
	
	
	
	
	
	var movingWin = function (){
		$('.winForm_header').bind("mousedown",function (event) {
			var isMove = true;
			var abs_x = event.pageX - $(windowDiv).offset().left;
			var abs_y = event.pageY - $(windowDiv).offset().top;
			$(document).mousemove(function (event) {
				if (isMove) {
					var obj = $(windowDiv);
					obj.css({'left':event.pageX - abs_x, 'top':event.pageY - abs_y});
				}
			}).mouseup(function () {
				isMove = false;
			});
		});
	}

	var setWindowFadeSlideAnimate = function(){
		modalBackgroundDiv.animate({
			opacity:0.5
		},500);

		var clientHeight = top.document.documentElement.clientHeight;
		var winSrcol = $(window).scrollTop();
		
		//自身的宽度 + 左边距10px+y图片的宽度+
		windowDiv.animate({
			opacity:0.5,
			width:_this.width+20,
			height:(_this.height+24)
		},500,function(){
			windowDiv.animate({
				top:(winSrcol+(clientHeight - _this.height)/2)
			},500,function(){
				windowDiv.css("opacity","1");
			});
		});
		$("html,body").animate({scrollTop:winSrcol},500);//修改页面滚动条的高度
	};
	var closeWindowFadeSlideAnimate = function(){
		modalBackgroundDiv.animate({
			opacity:0
		},300,function(){
			modalBackgroundDiv.remove();
		});
		windowDiv.animate({
			top:0,
			opacity:0
		},500,function(){
			windowDiv.remove();
		});
	};


	var setWindowFadeAnimate = function(){
		var clientHeight = top.document.documentElement.clientHeight;
		var winSrcol = $(window).scrollTop();
		modalBackgroundDiv.animate({
			opacity:0.5
		},500);
		windowDiv.css("width",_this.width+20).css("height",(_this.height+24)).css("top",(winSrcol+(clientHeight - _this.height)/2));
		windowDiv.animate({
			opacity:1
		},500);
       $("html,body").animate({scrollTop:winSrcol},500);//修改页面滚动条的高度
	};

	var closeWindowFadeAnimate = function(){
		modalBackgroundDiv.fadeOut(500,function(){
			modalBackgroundDiv.remove();
		});
		windowDiv.fadeOut(500,function(){
			windowDiv.remove();
		});
	};
	this.show = function(){
		createWindowDiv();
		if(this.animateType == "fadeSlide"){
			setWindowFadeSlideAnimate();
		}else if(this.animateType == "fade"){
			setWindowFadeAnimate();
		}

		movingWin();
	}

	this.close = function(){
		if(this.animateType == "fadeSlide"){
			closeWindowFadeSlideAnimate();
		}else if(this.animateType == "fade"){
			closeWindowFadeAnimate();
		}
	}
}


function showEcpWinForm(_cfg){
	var ecpWinForm = new top.EcpWinForm(_cfg);
	ecpWinForm.show();
	return ecpWinForm;
}