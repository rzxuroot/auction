
/**
 * @Object : ecpBase对象
 * @author : zengxuechen
 * @desc : 嘉德在线弹出框模块通用的方法集合对象
 * @version : 0.1版本
 * @singleton
 */
(function() {

	if (typeof this.ecpBase === 'undefined') {
		this.ecpBase = this.ecpBase = {};
	}
	ecpBase.token = null;
	$(function() {
		// ecpBase.token = getToken();
	})

	/**
	 * @desc : 弹出提示信息
	 * @param1 : msg(需要显示的信息)
	 * @param2 : callback(回调函数)
	 * @for example: 将本js引入后，直接在页面上调用ecpBase.alert("显示内容",function(_btn){});
	 */
	ecpBase.alert = function(param, callback) {
		myAlert("error",param, callback);
	};

	ecpBase.alert4Reg = function(msg, callback_Ok, callback_No) {
		GenerateHtml("register", msg, "确认", "取消");
		$("#mb_btn_ok").css({
			backgroundColor : '#FFFFFF',
			color : '#000000'
		});
		btnOk(callback_Ok);
		btnNo(callback_No);
	};

	ecpBase.tip = function(msg, time,callback) {
		var ecpBaseTimer; // 计时器
		GenerateHtml("tip", msg, "确认", "取消");
			ecpBaseTimer = setTimeout(function(){
				$("#mb_box,#mb_con").remove();
				if(callback)callback();	
			}, time);
		
	};

	/*
	 * alert 确认框 param 弹出内容 html text btn_ok_value 按钮msg
	 */
	ecpBase.error = function(param) {
		myAlert("error",param);
	};
	/*
	 * alert 确认框 注册成功 param 弹出内容 html text callback 回掉 btn_ok_value 按钮msg
	 */
	ecpBase.register = function(param, callback_Ok, btn_ok_value) {
		myAlert("register",param, callback_Ok, btn_ok_value);
	};
	/*
	 * alert 确认 + 取消 param 弹出内容 html text callback 回掉 btn_ok_value 确认按钮value
	 * btn_no_value 取消按钮value
	 */
	ecpBase.confirm = function(msg,callback,cancelBack) {
		return top.showEcpWinForm({
			header:{
		    	height:30,
		    	background:"#D73660",
		    	color:"#fff"
		    },
			width:400,
			height:120,
			msg:msg,
			title:"温馨提示",
			iconCls:"confirm",
			listeners: {
				"sure":{
					text:"确定",
					execute:function(_obj){
						if(callback){
						   callback(true);
						}
						return true;
					}
				},
				"clear":{
					text:"取消",
					execute:function(){
						if(cancelBack){
						   cancelBack();
						}
						return true;
					}
				}
			}
		});
	};
	//自定义按钮文字
	ecpBase.customConfirm = function(msg,SureBtnText,CancelBtnText,callback,cancelBack) {
		return top.showEcpWinForm({
			header:{
				height:30,
				background:"#D73660",
				color:"#fff"
			},
			width:400,
			height:120,
			msg:msg,
			title:"温馨提示",
			iconCls:"confirm",
			listeners: {
				"sure":{
					text:SureBtnText,
					execute:function(_obj){
						if(callback){
							callback(true);
						}
						return true;
					}
				},
				"clear":{
					text:CancelBtnText,
					execute:function(){
						if(cancelBack){
							cancelBack();
						}
						return true;
					}
				}
			}
		});
	};

	/*
	 * type confirm or  error or register
	 * arguments[1] html or text
	 * arguments[2],arguments[3] callback
	 * arguments[4] 确认value
	 * arguments[5] 取消value
	 */
	var myAlert = function() {
		if (arguments[0] == "error") {
			switch (arguments.length) {
			case 2:
				GenerateHtml("error", arguments[1], "确认", "");
				btnOk();
				btnNo();
				break;
			case 3:
				GenerateHtml("error", arguments[1], "确认", "");
				btnOk(arguments[2]);
				btnNo();
				break;
			case 4:
				GenerateHtml("error", arguments[1], arguments[3], "");
				btnOk(arguments[2]);
				btnNo();
				break;
			}
		}else if (arguments[0] == "register") {
				GenerateHtml("register", arguments[1], arguments[3], "");
				btnOk(arguments[2]);
				btnNo();
		}else if (arguments[0] == "confirm") {
			switch (arguments.length) {
			case 2:
				GenerateHtml("confirm", arguments[1], "确认", "取消");
				btnOk();
				btnNo();
				break;
			case 3:
				GenerateHtml("confirm", arguments[1], "确认", "取消");
				btnOk(arguments[2]);
				btnNo();
				break;
			case 4:
				GenerateHtml("confirm", arguments[1], arguments[3], "取消");
				btnOk(arguments[2]);
				btnNo();
				break;
			case 5:
				
				GenerateHtml("confirm", arguments[1], arguments[3], arguments[4]);
				btnOk(arguments[2]);
				btnNo();
				break;
			case 6:
				GenerateHtml("confirm", arguments[1], arguments[4], arguments[5]);
				btnOk(arguments[2]);
				btnNo(arguments[3]);
				break;
			}
	
		}
		
	
	}

	/*
	 * alert html type 弹出框类型 param 弹出内容 html text callback 回掉 btn_ok_value
	 * 确认按钮value btn_no_value 取消按钮value
	 */
	var GenerateHtml = function(type, param, btn_ok_value, btn_no_value) {

		var _html = "";

		_html += '<div id="mb_box"></div><div id="mb_con">';
		_html += '<div id="mb_ico"></div><div id="html_div">' + param
				+ '</div><div id="btn_div">';

		if (type == "alert" || type == "error" || type == "register") {
			_html += '<input id="mb_btn_ok" type="button" value="'
					+ btn_ok_value + '" />';
		}
		if (type == "confirm") {
			_html += '<input id="mb_btn_ok" type="button" value="'
					+ btn_ok_value + '" />';
			_html += '<input id="mb_btn_no" type="button" value="'
					+ btn_no_value + '" />';
		}
		_html += '</div></div>';

		// 必须先将_html添加到body，再设置Css样式
		$("body").append(_html);
		GenerateCss(type);

	}

	/*
	 * alert css type
	 */
	var GenerateCss = function(type) {

		$("#mb_box").css({
			width : '100%',
			height : '100%',
			zIndex : '99999',
			position : 'fixed',
			filter : 'Alpha(opacity=60)',
			backgroundColor : 'black',
			top : '0',
			left : '0',
			opacity : '0.6'
		});

		$("#mb_con").css({
			zIndex : '999999',
			width : '380px',
			position : 'fixed',
			backgroundColor : 'White',
			padding : '10px 10px 10px 10px'
		});

		$("#mb_ico").css({
			display : 'block',
			position : 'absolute',
			right : '10px',
			top : '10px',
			width : '18px',
			height : '18px',
			textAlign : 'center',
			lineHeight : '16px',
			cursor : 'pointer',
			fontFamily : '微软雅黑'
		});
		$("#mb_ico").css({
							backgroundImage : "url("+baseUrl+"/common/javascript/lib/winform/image/close_a.png)",
							backgroundRepeat : 'no-repeat'
						});

		$("#html_div").css({
			padding : '20px 20px 0px 20px'
		});
		$("#btn_div").css({
			textAlign : 'center',
			padding : '10px 20px 10px 20px'
		});

		if (type == "alert" || type == "error") {
			$("#html_div").css({
				color : 'Red'
			});
			$("#mb_btn_ok").css({
				backgroundColor : '#D73660',
				width : '100px',
				height : '30px',
				color : 'white',
				border : 'none',
				float : 'right'
			});
		}

		if (type == "confirm") {

			$("#mb_btn_ok,#mb_btn_no").css({
				backgroundColor : '#D73660',
				width : '100px',
				height : '30px',
				color : 'white',
				border : 'none',
				marginLeft : '20px'
			});

		}

		if (type == "register") {
		
			$("#mb_con").css({
			zIndex : '999999',
			width : '300px',
			height: '110px',
			position : 'fixed',
			backgroundColor : 'White',
			padding : '50px 10px 10px 50px'
			});
		
			$("#html_div").css({
				color : '#0068FC',
				fontSize: '20px'
			});
			
			$("#mb_btn_ok").css({
				backgroundColor : '#FFF',
				cursor : 'pointer',
				width : '100px',
				textDecoration : 'underline',
				height : '30px',
				color : '#000',
				border : 'none',
				float : 'right'
			});
			$("#mb_btn_ok").hover(function() {
				$(this).css({
					color : 'Red'
				});
			}, function() {
				$(this).css({
					color : '#000'
				});
			});

		} else {

			$("#mb_btn_no,#mb_btn_ok").hover(function() {
				$(this).css({
					backgroundColor : '#FFF',
					border : 'solid 1px #D73660',
					color : '#000'
				});
			}, function() {
				$(this).css({
					backgroundColor : '#D73660',
					color : '#ffffff',
					border : 'none'
				});
			});

		}
		// 右上角关闭按钮hover样式
		$("#mb_ico").hover(function() {$(this).css(
											{
												backgroundImage : "url("+baseUrl+"/common/javascript/lib/winform/image/close.png)",
												backgroundRepeat : 'no-repeat'
											});},function() {$(this).css(
											{
												backgroundImage : "url("+baseUrl+"/common/javascript/lib/winform/image/close_a.png)",
												backgroundRepeat : 'no-repeat'
											});
						});

		var _widht = document.documentElement.clientWidth; // 屏幕宽
		var _height = document.documentElement.clientHeight; // 屏幕高

		var boxWidth = $("#mb_con").width();
		var boxHeight = $("#mb_con").height();

		// 让提示框居中
		$("#mb_con").css({
			top : (_height - boxHeight) / 2 + "px",
			left : (_widht - boxWidth) / 2 + "px"
		});

	}

	// 确定按钮事件
	var btnOk = function(callback) {
		$("#mb_btn_ok").click(function() {
			$("#mb_box,#mb_con").remove();
			if (typeof (callback) == 'function') {
				callback();
			}
		});
	}

	// 取消按钮事件
	var btnNo = function(callback) {
		$("#mb_btn_no,#mb_ico").click(function() {
			$("#mb_box,#mb_con").remove();
			if (typeof (callback) == 'function') {
				callback();
			}
		});
	}

})();
