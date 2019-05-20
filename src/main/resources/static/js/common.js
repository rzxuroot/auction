// 通用的JS类库

//设置命名空间
var com = {};
com.rf = {};
com.rf.scsd = {};
$.scsd = com.rf.scsd;

var ArtRequestObject = function(managerName, managerMethod, params, token) {
		this.managerName = managerName;
		this.managerMethod = managerMethod;
		this.params = params;
		this.toJsonString = function() {

			

			return $.toJSON({
				managerName : this.managerName,
				managerMethod : this.managerMethod,
				params : this.params
			});
		};
	};
	
/*
* @desc         : 通用的调用后台Manager方法
* @author       : rqf
* @methodName   : doECMManager
* @methodParam1 : String        managerName    （后台Manager名）
* @methodParam2 : String        managerMethod  （后台Manager方法名）
* @methodParam3 : String/JSON   param         （请求参数）
* @methodParam3 : function      callback       （回调函数）
* @methodParam4 : JSON          settings       （请求配置）
* @methodParam4 : String        moduleType      (模块类型：ECM OR ECP)
* @for example1 : ajaxHandler("http://www.baidu.com",[],function(_data){},true);
*/
function doECMManager(managerName,managerMethod,params,callBack,settings){
	doArtradeManager(managerName,managerMethod,params,callBack,settings,"ECM");
}


/*
* @desc         : 通用的调用后台Manager方法
* @author       : rqf
* @methodName   : doECMManager
* @methodParam1 : String        managerName    （后台Manager名）
* @methodParam2 : String        managerMethod  （后台Manager方法名）
* @methodParam3 : String/JSON   param         （请求参数）
* @methodParam3 : function      callback       （回调函数）
* @methodParam4 : JSON          settings       （请求配置）
* @methodParam4 : String        moduleType      (模块类型：ECM OR ECP)
* @for example1 : ajaxHandler("http://www.baidu.com",[],function(_data){},true);
*/
function doArtradeManager(managerName,managerMethod,params,callBack,settings,moduleType){
	if(settings==null) settings = {};
	var data = null;
	if(params==null){
		data = new ArtRequestObject(managerName,managerMethod,null);
	}
	else if(typeof(params)=="string"){//单个字符串
		data = new ArtRequestObject(managerName,managerMethod,[params]);
	}else if(typeof(params)=="number"){//单个字符串
		data = new ArtRequestObject(managerName,managerMethod,[params]);
	}else if(typeof(params)=="object"){
		if(params.length==null || params.length == undefined){//对象	
			data = new ArtRequestObject(managerName,managerMethod,[$.toJSON(params)]);
		}else{//数组
			
			var arr = [];
			for(var i=0;i<params.length;i++){
				var param = params[i];
				if(typeof(param)=="string"){//数组中是字符串
					arr.push(params[i]);
				}else{//数组中是对象
					arr.push($.toJSON(params[i]));
				}
			}
			data = new ArtRequestObject(managerName,managerMethod,arr);
		}
	}
	var url = baseUrl + "/"+(moduleType.toLowerCase())+"/dispatcher.action";

	ajaxHandler(url,{"requestString":data.toJsonString()},callBack,settings.async);
}



/*
* @desc         : 通用的调用后台contorller方法
* @author       : rqf
* @methodName   : doController
* @methodParam1 : String        url    （后台url路径）
* @methodParam2 : String        params  （请求参数）
* @methodParam3 : function      callback       （回调函数）
*/
function doController(url,params,callBack,async){
	if(async == null) async = true;
	ajaxHandler(baseUrl + "/" + url,params,callBack,async);
}


/*
* @desc         : jquery请求函数
* @author       : rqf
* @methodName   : ajaxHandler
* @methodParam1 : String   url     （请求url）
* @methodParam2 : String   data    （请求参数）
* @methodParam3 : function callback（回调函数）
* @methodParam4 : boolean  async   （是否异步（false：同步，true:异步）默认为true）
* @for example1 : ajaxHandler("http://www.baidu.com",[],function(_data){},true);
*/
function ajaxHandler(url, data, callback , async) {
	if(window.base!=null)base.processBar();
	$.ajax({
		url : url,
		dataType : "json",
		type : "post",
		async: (async == null ? true : async),
		data : data,
		timeout : 1000*600,
		success : function(data, textStatus, XMLHttpRequest) {
			if(window.base!=null && top.topProcessBar!= undefined){
				top.topProcessBar.close();
			}
			if(data.data=="noAccessAllowed"){
				window.location = baseUrl + data.loginUrl;
			}else{
				callback(data, textStatus, XMLHttpRequest);
			}
		},
		error : function(data, textStatus, XMLHttpRequest) {
			if(window.base!=null && top.topProcessBar!= undefined){
				top.topProcessBar.close();
			}
			callback(data, textStatus, XMLHttpRequest);
		}
	});
}






/*
* @methodName   : getFormData
* @methodParam2  : String （form表单的名字）
* @methodReturn : []
* @author       : ruanqingfeng
* @desc         : 获取一组规则的form数据，返回[{key1:value1},{key1:value1},{key1:value1}]
* @for example1  : getFormData("formName");(用JSON字符串对全局范围赋值)
*/
function getFormData(formName) {
	var formName = formName!=""&formName!=null?"#"+formName+" ":"";
	var arr = $(formName + "input[name]");
	var returnVal = {};
	$.each(arr,function(i,obj){
		if($(obj).attr("type")=="file"){
			return;
		}
		if($(obj).attr("type")=="radio"){
			if($(obj)[0].checked){
				returnVal[($(obj).attr("name"))] = $(obj).val();
			}
		}else if($(obj).attr("type")=="checkbox"){
			
			if($(obj).is(':checked')){
				var val = returnVal[($(obj).attr("name"))];
				val = (val == undefined ? "" : val);
				val += (val == "" ? $(obj).val() : "," + $(obj).val());
				returnVal[($(obj).attr("name"))] = val;
			}
		}else{
			returnVal[($(obj).attr("name"))] = $(obj).val();
		}
	})

	arr = $(formName + "select[name]");
	$.each(arr,function(i,obj){
		returnVal[($(obj).attr("name"))] = $(obj).val();
	})
	arr = $(formName + "textarea[name]");
	$.each(arr,function(i,obj){
		returnVal[($(obj).attr("name"))] = $(obj).val();
	})
	return returnVal;
}


/*
* @methodName   : setFormData
* @methodParam1  : String （JSON字符串）
* @methodParam2  : String （form表单的名字）
* @methodReturn : boolean
* @author       : ruanqingfeng
* @desc         : 加载form数据
* @for example1  : setFormData("{key1:'11',key2:'22'}");(用JSON字符串对全局范围赋值)
* @for example2  : setFormData({key1:'11',key2:'22'});（用JSON对象对全局范围赋值)
* @for example3  : setFormData("{key1:'11',key2:'22'}","formName1");（用JSON字符串对某个form赋值)
* @for example4  : setFormData({key1:'11',key2:'22'},"formName1");（用JSON对象对某个form赋值)
*/
function setFormData(json,formName) {
	if(json==null||json==""){
		json = {};
	}

	if(typeof(json)=="string"){//传过来的是JSON字符串
		json = $.fromJSON(json);
	}


	for(var key in json){

		var obj = null;
		var value = json[key];
	
		if(formName!=null&&formName!=""){
			obj = $("form[name=" + formName + "] [name=" + key + "]");
		}else{
			obj = $("[name=" + key + "]");
		}
		obj.each(function(i){
			if (!$(this).attr("type")) {
				if((this.tagName).toUpperCase()=="SELECT"){
			
					$(this).val($.null2Str(value));
				}else{
					$(this).text($.null2Str(value));
				}
				return;
			}
			if(($(this).attr("type")).toUpperCase()=="RADIO"){
				if($(this).val()==value){
					$(this).attr("checked","checked");
				}
			}else if(($(this).attr("type")).toUpperCase()=="CHECKBOX"){
				if(("," + value + ",").indexOf("," + $(this).val() + ",")!=-1){
					this.checked = true;
				}
			}else if((this.tagName).toUpperCase()=="SELECT"){
				$(this).val($.null2Str(value));
			}else{
				if($(this).attr("format")=="date"){
					if(value!=null&&value!=""){
						value = new Date(parseInt(value)).format("yyyy-MM-dd");
					}
				}
				if($.null2Str($(this).attr("dictType")) != ""){
					$(this).val($.dict.getDictText($(this).attr("dictType"),$.null2Str(value)));
				}else{
					$(this).val($.null2Str(value));
				}
			}
		})

	}
	return true;
}




/*
* @methodName    : fixMath
* @author        : ruanqingfeng
* @desc          : 四则运算精度修正函数 
* @for example1  : fixMath(1,2,'+')
* @for example2  : fixMath(10,1.12,'-')
* @for example3  : fixMath(1,2,'*')
* @for example4  : fixMath(1,2,'/')
*/
function  fixMath(m,n,op){ 
    m = (m == "" ? "0" : m);
    n = (n == "" ? "0" : n);
    var  a  =  (m+" "); 
    var  b  =  (n+" "); 
    var  x  =  1;
    var  y  =  1;
    var  c  =  1;
    if(a.indexOf( ".") >0){
        x = Math.pow(10,a.length - a.indexOf( ".") - 1); 
    } 
    if(b.indexOf( ".") >0) { 
        y = Math.pow(10,b.length - b.indexOf( ".") - 1); 
    } 
    switch(op) 
    { 
        case  '+':
        case  '-':
            c = Math.max(x,y);
            m = Math.round(m*c);
            n = Math.round(n*c);
            break;
        case  '*': 
            c = x*y;
            m = Math.round(m*x);
            n = Math.round(n*y);
            break; 
        case '/':
            c = Math.max(x,y);
            m = Math.round(m*c);
            n = Math.round(n*c);
            c = 1;
            break;
    }
    return   eval( "( "+m+op+n+ ")/ "+c); 
} 


/*
* @methodName    : roundNumber
* @author        : ruanqingfeng
* @desc          : 四舍五入
* @for example   : roundNumber(222.223344,2)
*/
function roundNumber(thisNumber,n){
	if(thisNumber == null || thisNumber == ""){
		return "";	
	}
	return parseFloat(thisNumber).toFixed(n);
}

/**
 * 更换验证码
 * 注意事项：需要将验证码的id设置为#codeImg
 */
function changeCodeImage() {
	var imgSrc = $("#codeImg");
	var src = imgSrc.attr("src");
	imgSrc.attr("src", chgUrl(src));
}
/**
 * 改变图片的url
 * @param url 验证码的图片url
 * @returns {String} 返回新的url
 */
function chgUrl(url) {
	//时间戳,//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
	var timestamp = (new Date()).valueOf();
	url = url.substring(0, 21);
	if ((url.indexOf("&") >= 0)) {
		url = url + "×tamp=" + timestamp;
	} else {
		url = url + "?timestamp=" + timestamp;
	}
	return url;
}
//获取服务器的当前时间
var sDate = null;

function getSystemDate(){
	//return new Date();
	
	if(sDate==null){
		doController("common/getsysdate.action",null,function(_response){
			if(_response.result){
				sDate = new Date(_response.data);
			}
		},false);
	}
	return sDate;
}


/**
 * 计算距离参数时间还有多少天、时、分、秒
 */
function countDownTime(timeStr){
	var www_qsyz_net=/^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,str='',conn,s;
	if(!timeStr.match(www_qsyz_net)){
		//alert('参数格式为2012-01-01[ 01:01[:01]].\r其中[]内的内容可省略');
		return false;
	}
	var sec=(new Date(timeStr.replace(/-/ig,'/')).getTime() - getSystemDate().getTime())/1000;
	if(sec <= 0){
			sec*=0;
	}
	s={'day':sec/24/3600,'hour':sec/3600%24,'minute':sec/60%60,'second':sec%60};
	for(i in s){
		if(Math.floor(s[i])>0 ){
			s[i] = Math.floor(s[i]);
		}
		if(Math.floor(s[i])==0){ s[i]='0'; }
	}
	return s;
}

/**
 * 格式化金额函数
 */
function formatMoney(s, n)   
{
	if(s == undefined) return "";
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length && l[i+1] != '-' ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
} 

/**
 * 将逗号分隔开的金额字符，去掉逗号格式。
 * 
 * @param {value}
 */
function clearFormatMoney(value) {
	if(new String(value).replace(/ /ig,"")==""){
		return "";	
	}
	var curValue = new String(value).replace(/,/ig,"");
	if  (isNaN(curValue) == false) {
		if(value==null||value=="")
		{
			curValue = "0";
		}
	}
	return curValue;
}


/**
 * 创建空格
 * 
 * @param _length 需要创建几个空格
 */
function createNbsp(_length){
	var nbspHtml = "";
	for(var i=0;i<_length;i++){
		nbspHtml+= "&nbsp;";
	}
	return nbspHtml;
}

/**
 * 密码强度检测
 */
function checkPswdStrong(_this) {
	var modes = 0;
	var sValue = _this.val();
	//正则表达式验证符合要求的
    if (sValue==null || sValue==''){
        return false;
    }
	else if (sValue.length < 6){
		// 弱
		_this.next(".pswdCheckDivCls").find("span").each(function(index){
			if(index==0){
				$(this).removeClass().addClass("pswdWeakCls");
			}else{
				$(this).removeClass().addClass("pswdCheckDefaultCls");
			}
		});
		return false;
	}
	if (/.{8,}/.test(sValue)) modes++; //6个字符以上
	if (/\d/.test(sValue)) modes++; //数字
	if (/[a-z]/.test(sValue)) modes++; //小写
	if (/[A-Z]/.test(sValue)) modes++; //大写
	if (/\W/.test(sValue)) modes++; //特殊字符
	//逻辑处理     
	switch (modes) { 
		case 1:
    	    // 弱
			_this.next(".pswdCheckDivCls").find("span").each(function(index){
				if(index==0){
					$(this).removeClass().addClass("pswdWeakCls");
				}else{
					$(this).removeClass().addClass("pswdCheckDefaultCls");
				}
			});
			break;
		case 2: 
    	  	// 弱
			_this.next(".pswdCheckDivCls").find("span").each(function(index){
				if(index==0){
					$(this).removeClass().addClass("pswdWeakCls");
				}else{
					$(this).removeClass().addClass("pswdCheckDefaultCls");
				}
			});
			break;
		case 3:
    	  	// 中
			_this.next(".pswdCheckDivCls").find("span").each(function(index){
				if(index==1){
					$(this).removeClass().addClass("pswdMiddleCls");
				}else{
					$(this).removeClass().addClass("pswdCheckDefaultCls");
				}
			});
			break;
		case 4: 
			// 强
			_this.next(".pswdCheckDivCls").find("span").each(function(index){
				if(index==2){
					$(this).removeClass().addClass("pswdStrongCls");
				}else{
					$(this).removeClass().addClass("pswdCheckDefaultCls");
				}
			});
			break;
        case 5:
            // 强
            _this.next(".pswdCheckDivCls").find("span").each(function(index){
                if(index==2){
                    $(this).removeClass().addClass("pswdStrongCls");
                }else{
                    $(this).removeClass().addClass("pswdCheckDefaultCls");
                }
            });
            break;
	}
}

/**
 * 密码强度检测评分
 */
function checkPswdStrong4code(sValue) { 
	var modes = 0; 
	//正则表达式验证符合要求的     
	if (sValue.length < 6){
		// 弱
		return 1;
	} 
	if (/\d/.test(sValue)) modes++; //数字
	if (/[a-z]/.test(sValue)) modes++; //小写
	if (/[A-Z]/.test(sValue)) modes++; //大写
	if (/\W/.test(sValue)) modes++; //特殊字符
	//逻辑处理     
	switch (modes) { 
		case 1:
			// 弱
			return 1;
		case 2: 
			// 弱
			return 1;
		case 3:
			// 中
			return 2;
		case 4: 
			// 强
			return 3;
	}
}
/**
 *  货币类型格式化
 */
function FormatMoney(s) {
	var flag = "";
	if(s.indexOf("-")==0){
		s = (parseFloat(s) * (-1)) + "";
		flag = "-";
	}
    if (/[^0-9\.]/.test(s)) return "invalid value";  
    s = s.replace(/^(\d*)$/, "$1.");  
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");  
    s = s.replace(".", ",");  
    var re = /(\d)(\d{3},)/;  
    while (re.test(s))  
        s = s.replace(re, "$1,$2");  
    s = s.replace(/,(\d\d)$/, ".$1"); 
    return "￥" + flag + s.replace(/^\./, "0.")  
} 


/**
 * 隐藏表单页面参数，模拟form提交
 * @param elementValue
 * {
 *   action:xxx.jsp
 *   method:"get"
 *   datas:[]
 *   target:_blank,_self,_parent,_top
 * }
 */
function simulateFormSubmit(setting) {

	var MyForm = function(cfg){
	    this.action=null;
	    this.method="post";
	    this.target="_blank";
	    this.moduleTyle=null;
	    this.datas = null;
	    $.extend(this,cfg);
	    var _this = this;
	    var turnForm = $("<form method='"+_this.method+"' action='"+_this.action+"' target='"+_this.target+"'></form>");   
	    //一定要加入到body中！！   
	    $(document.body).append(turnForm);
	    
	    //创建隐藏表单
	    $(_this.datas).each(function(i,ele){
	    	var newElement = $("<input name='"+ele.name+"' type='hidden' value='"+ele.value+"'/>");
		    turnForm.append(newElement);
	    });
	    
	    return turnForm;
	}
	
	if(setting==null||setting==""){
		setting = "{}";
	}
    var _fform = new MyForm(setting);
    _fform.submit();
}

/**
 * 渲染input为日期控件
 * @param dateId input控件的Id
 */
function renderDatepicker(dateId){
	$("#"+dateId).datepicker({
		// 添加日期选择功能
		numberOfMonths : 1,// 显示几个月
		showButtonPanel : true,// 是否显示按钮面板
//		changeMonth: true,
	    changeYear: true,
		dateFormat : 'yy-mm-dd',// 日期格式
		clearText : "清除",// 清除日期的按钮名称
		closeText : "关闭",// 关闭选择框的按钮名称
		yearSuffix : '年', // 年的后缀
		showMonthAfterYear : true,// 是否把月放在年的后面
		monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',
				'九月', '十月', '十一月', '十二月' ],
		dayNames : [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
		dayNamesShort : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
		dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ]
	});
}



/**
 * 渲染input为日期控件
 * @param 主要解决面板中点击"今天",js报错不起作用
 */
function dateTimepickerShowDay(dateId){
	$("#"+dateId).datetimepicker({
		// 添加日期选择功能
		numberOfMonths : 1,// 显示几个月
		showButtonPanel : true,// 是否显示按钮面板
		showMonthAfterYear : true,// 是否把月放在年的后面
		changeYear: true,
        showTimepicker:false,
        closeText: '关闭',  
        prevText: '<上月',  
        nextText: '下月>',  
        currentText: '今天'
	});
}


/**
 * 渲染input为日期(带时分秒)控件
 * @param dateId input控件的Id
 */
function renderDateTimepicker(dateId){
	$("#"+dateId).datetimepicker({
		changeYear: true,
		showSecond: true, 
		showMillisec : false,
		timeText: '时间',  
		hourText: '小时',  
		minuteText: '分钟',  
		secondText: '秒',  
		currentText: '现在',  
		closeText: '完成',
		timeFormat: 'HH:mm:ss'
	});
}



/**
 * 比较两个时间大小
 * @param data1 时间1 格式：yyyy-MM-dd hh:mm:ss
 * @param data2 时间2 格式：yyyy-MM-dd hh:mm:ss
 * @returns data1>data2 返回true;其它情况返回false
 */
function compareDate(data1,data2){
	if((new Date(data1.replace(/-/g,"\/")))>(new Date(data2.replace(/-/g,"\/")))){
		return true;
	}else{
		return false;
	}
}


/**
 * 获取time+incr(天)后(前)时间
 * @param time 基准时间-时间戳格式
 * @param incr 增量时间-单位天(incr>0,结果是time之后;incr<0,结果是time之前)
 * @return 返回计算后时间-String(yyyy-MM-dd hh:mm:ss)格式
 */
function getTimeAddDay(time,incr){  
	var interDay = parseInt(incr);
	var interTimes=interDay*24*60*60*1000;
	interTimes=parseInt(interTimes); 
	var nDate = new Date();
	nDate.setTime(time+interTimes);
	return nDate.format("yyyy-MM-dd hh:mm:ss");  
}



//生成itemTitle公共方法
function getItemTitle(glideMark,authorName,itemAge,itemName){
    itemTitle = $.trim($.null2Str(glideMark) + ' ' +$.trim($.null2Str(authorName) + ' ' + $.trim($.null2Str(itemAge) + ' ' + $.null2Str(itemName))));
	return itemTitle;
}

//生成无流水号的itemTitle公共方法
function getItemTitleNoGlideMark(authorName, itemAge, itemName) {
	itemTitle = $.trim($.null2Str(authorName) + ' ' + $.trim($.null2Str(itemAge) + ' ' + $.null2Str(itemName)));
	return itemTitle;
}

//等比压缩图片
function pic_reset(drawImage,thumbs_size) {  
	var image = new Image();
	//原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
	image.src = drawImage.src; 
	var max = thumbs_size.split(',');  
	var fixwidth = max[0];   
	var fixheight = max[1];
	var wP = image.width/fixwidth;
	var hP = image.height/fixheight;
	if (wP >= hP){
		w = image.width/wP
		h = image.height/wP
	}else{
		h =	image.height/hP
		w =	image.width/hP
	}
    drawImage.width=w;
    drawImage.height=h;
	$(drawImage).css("width",w+"px");
	$(drawImage).css("height",h+"px");
}

/**
 * 计算书画平尺
 * @param length 长(cm)
 * @param width 宽(cm)
 */
function fixShmj(length,width){
	return roundNumber(fixMath(fixMath(length,width,'*'),'1111','/'),'2');
}

/**
 * 计算油画英寸
 * @param length 长(cm)
 * @param width 宽(cm)
 */
function fixYhmj(length,width){
	var l_fix = roundNumber(fixMath(fixMath(length, '0.03281', '*'),'12','*'),'2');
	var w_fix = roundNumber(fixMath(fixMath(width, '0.03281', '*'),'12','*'),'2');
	return l_fix+"x"+w_fix;
}


/**
 * 
 * 发送短信验证码公共方法
 * 用例:new $_SendMobMsg({
		"btnId":"sendCodeBtn",
		"textShowId":"msgSpan",
		"execuFun":function(){
           //调用后台方法发送通知
		 }
	}).showTimer();
	
	//页面HTML
	<div class="checkCodeCls" id="sendCodeBtn">
		<span id="msgSpan">获取短信检验码</span>
	</div>
 */
function $_SendMobMsg(setting){
	this.intDiff=60;            //倒计时默认总秒数
	this.btnId = null;          //点击按钮的id
	this.eventType ="click";    //事件类型
	this.execuFun = function(){}; //点击时执行的方法
	this.textShowId = null;      //倒计时文本显示的id
	this.callFun = null;         //倒计时执行之后的函数调用 
	$.extend(this,setting);
	var _this = this;
	_this.oldText = "";         //原按钮显示的文本信息
	/**
	 * 执行倒计时函数
	 */
	function setTimer(){
	   _this.$timer = window.setInterval(function(){
		    var day=0,
		        hour=0,
		        minute=0,
		        second=0;//时间默认值        
		    if(_this.intDiff > 0){
		        day = Math.floor(_this.intDiff / (60 * 60 * 24));
		        hour = Math.floor(_this.intDiff / (60 * 60)) - (day * 24);
		        minute = Math.floor(_this.intDiff / 60) - (day * 24 * 60) - (hour * 60);
		        second = Math.floor(_this.intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
		    }
		   // if (minute <= 9) minute = '0' + minute;
		   // if (second <= 9) second = '0' + second;
		    
		   
		    
		    var showSecond = parseInt(minute*60+second);
		    var _textEleName = $("#"+_this.textShowId).get(0).tagName;
		    if(_this.textShowId && _textEleName =='SPAN'){
		    	$("#"+_this.textShowId).html("重新发送 "+showSecond+" s");
		    }else if(_this.textShowId && _textEleName =='DIV'){
		    	$("#"+_this.textShowId).text("重新发送 "+showSecond+" s");
		    }
		    
		    _this.intDiff--;
		    
		    if(_this.intDiff == 0){
				clearTimer(_this.$timer);
				resetInfo();
				//恢复原数据并重新绑定
				bindEle();
		    	if(_this.callFun && typeof _this.callFun =='function'){
			    	_this.callFun();
			    }
			}
	    }, 1000);
	    
	}
	
	/**
	 * 清除倒计时时间句柄
	 */
	function clearTimer(timer){
		clearInterval(timer);
	}
	
	/**
	 * 主按钮绑定某事件
	 */
	function bindEle(){
	    var _mainEle = $("#"+_this.btnId);
	    _mainEle.bind(_this.eventType,function(){
	    	unBindEle();//执行事件之后，解绑
	    	setTimer.call(_this);
	    	_this.execuFun();
	    });
	}
	
	
	
	/**
	 * 主按钮解绑某事件
	 */
	function unBindEle(){
	    var _mainEle = $("#"+_this.btnId);
	    _mainEle.unbind(_this.eventType);
	}
	
	/**
	 * 获取原始数据信息保存
	 */
	function saveOldInfo(){
		_this.oldDiff = _this.intDiff;
		var _textEleName = $("#"+_this.textShowId).get(0).tagName;
	    if(_this.textShowId && _textEleName =='SPAN'){
	    	_this.oldText = $("#"+_this.textShowId).html();
	    }else if(_this.textShowId && _textEleName =='DIV'){
	    	_this.oldText = $("#"+_this.textShowId).text();
	    }
	}
	
	/**
	 * 重置显示原始数据信息
	 */
	function resetInfo(){
		_this.intDiff = _this.oldDiff;
		var _textEleName = $("#"+_this.textShowId).get(0).tagName;
	    if(_this.textShowId && _textEleName =='SPAN'){
	    	 $("#"+_this.textShowId).html(_this.oldText);
	    }else if(_this.textShowId && _textEleName =='DIV'){
	    	$("#"+_this.textShowId).text(_this.oldText);
	    }
	}
	
	/**
	 * 公用的调用倒计时的方法
	 */
	this.showTimer=function(){
		if(_this.intDiff > 0){
			saveOldInfo();//保存原数据信息
			bindEle();
		}
	}
}


/************数组元素按指定属性去重************************/

/**
 * var array = [
    {a:1,b:2,c:3,d:4},
    {a:11,b:22,c:333,d:44},
    {a:111,b:222,c:333,d:444},
    {a:11,b:22,c:33,d:44},
    {a:11,b:22,c:33,d:444}
    ];
    
    
    //进行去重
     var arr = uniqeByKeys(array,['a','b']);
     
     array = [
	    {a:1,b:2,c:3,d:4},
	    {a:11,b:22,c:333,d:44},
	    {a:111,b:222,c:333,d:444}
    ];
     
*/


	//将对象元素转换成字符串以作比较
	function obj2key(obj, keys){
	    var n = keys.length,
	        key = [];
	    while(n--){
	        key.push(obj[keys[n]]);
	    }
	    return key.join('|');
	}
	//去重操作
	function uniqeByKeys(array,keys){
	    var arr = [];
	    var hash = {};
	    for (var i = 0, j = array.length; i < j; i++) {
	        var k = obj2key(array[i], keys);
	        if (!(k in hash)) {
	            hash[k] = true;
	            arr .push(array[i]);
	        }
	    }
	    return arr ;
	}

/**************给定url链接解析成对象*******************************/
/**
@description 用法示例：var myURL = parseStandURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
myURL.file='index.html'
myURL.hash= 'top'
myURL.host= 'abc.com'
myURL.query= '?id=255&m=hello'
myURL.params= Object = { id: 255, m: hello }
myURL.path= '/dir/index.html'
myURL.segments= Array = ['dir', 'index.html']
myURL.port= '8080'
myURL.protocol= 'http'
myURL.source= 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
*/  
 
function parseStandURL(url) { 
		 var a =  document.createElement('a'); 
		 a.href = url; 
		 return { 
		 source: url, 
		 protocol: a.protocol.replace(':',''), 
		 host: a.hostname, 
		 port: a.port, 
		 query: a.search, 
		 params: (function(){ 
		     var ret = {}, 
		         seg = a.search.replace(/^\?/,'').split('&'), 
		         len = seg.length, i = 0, s; 
		     for (;i<len;i++) { 
		         if (!seg[i]) { continue; } 
		         s = seg[i].split('='); 
		         ret[s[0]] = s[1]; 
		     } 
		     return ret; 
		 })(), 
		 file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1], 
		 hash: a.hash.replace('#',''), 
		 path: a.pathname.replace(/^([^\/])/,'/$1'), 
		 relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1], 
		 segments: a.pathname.replace(/^\//,'').split('/') 
		 }; 
 }    	




  function autoImgSize(Img, maxWidth, maxHeight,isAuct) {
	  
		var image = new Image();
		//原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
		image.src = Img.src;  
		// 当图片比图片框小时不做任何改变 
		if (image.width < maxWidth&& image.height < maxHeight) {
			Img.width = image.width;
			Img.height = image.height;
		}
		else //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放            {
			if (maxWidth/ maxHeight  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
			{
				Img.width = maxWidth;   //以框的宽度为标准
				Img.height = maxWidth* (image.height / image.width);
			} 
			else {   //原图片宽高比例 小于 图片框宽高比例
				Img.width = maxHeight  * (image.width / image.height);
				Img.height = maxHeight  ;   //以框的高度为标准
				
					
			}
		if(isAuct!=true){
			Img.style.position="absolute";
			Img.style.left="50%";
			Img.style.top="50%";
			Img.style.marginLeft="-"+(Img.width/2)+"px";
			Img.style.marginTop="-"+(Img.height/2)+"px";
		}
		
   }

String.prototype.endWith=function(endStr){
  var d=this.length-endStr.length;
  return (d>=0&&this.lastIndexOf(endStr)==d)
}


function checkOldIE(){
	var isIE67 = !$.support.opacity && !$.support.style;//ie6\7
	return isIE67;
}

//校验手机号和固话号
function checkTel(tel)
{
   var mobile = /^((13[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(147))\d{8}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
   return mobile.test(tel) || phone.test(tel);
}


function changeSearchType(p){
	if($(p).html()=="当前分类"){
		$(p).html("所有分类");
	}else{
		$(p).html("当前分类");
	}
}


function getplatformPORM()
{
	var system ={};
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	var str="";
	if(system.win||system.mac||system.xll){
		//如果是电脑
        return "pc";
	}else{
		//如果是手机
		return "mob";
	}

}

function getbrowsename()
{
	if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))
	{
		return "safari";
	}

	return "obrowse"
}





