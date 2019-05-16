/**
 * ecp的的validation类库
 */
//正则表达式以及相应的错误提示信息
var validator={
	required : {msg: "必须输入项不能为空"},
	minLength : {msg: "长度不得少于%%个字符"},
	maxLength : {msg: "长度不得超过%%个字符"},
	email : {regExp : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, msg: "邮箱格式不正确!"},
	phone : {regExp : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/, msg: "请输入座机号"},
	mobile : {regExp : /^1[34578]\d{9}$/, msg: "请输入正确的手机号!"},
	postCode : {regExp : /^\d{6}$/, msg: "请输入正确的邮编!"},
	currency : {regExp : /^[0-9]+(.[0-9]{2})?$/, msg: "请输入正确的金额"},
	number : {regExp : /^\d+$/, msg: "请输入数字"},
	english : {regExp : /^[A-Za-z]+$/, msg: "请输入英文字母"},
	upperEnglish : {regExp : /^[A-Z]+$/, msg: "请输入大写英文字母"},
	lowerEnglish : {regExp : /^[a-z]+$/, msg: "请输入小写英文字母"},
	numberEnglish: {regExp : /^[0-9a-zA-Z]*$/, msg: "请输入数字和英文字母"},
	integergt0 : {regExp : /^[-\+]?\d+$/, msg: "请输入整数"},
	integer : {regExp : /^(0|[1-9][0-9]*)$/, msg: "请输入非负整数"},
	positiveInteger : {regExp : /^\+?[1-9][0-9]*$/, msg: "请输入正整数"},
	english : {regExp : /^[A-Za-z]+$/, msg: "请输入英文字母"},
	chinese :  {regExp : /^[\u4e00-\u9fa5]{0,}$/, msg: "请输入中文"},
	idCard : {msg: "请输入正确的身份证号!"},
	illegal : {regExp:/[^\^\$@\.\*\?\+\-!=:\|\\/\(\)\[\]\{\}]/,msg:"请勿包含特殊字符"}
}

/**
 * 验证表单内容，如果全部通过返回true，否则返回false
 */
function validate(formId) {
	var flg = true;
	var formId = formId!=""&formId!=null?"#"+formId+" ":"";
	$(formId+"input[data-validate]").each(
			function(index) {
				$(this).parent().children("div[name='errorFlgDiv']").remove();
				if($(this).attr("errorFlg")){
				   $(this).removeAttr("errorFlg");
				}
				
				var length = $(this).attr("data-validate").split(',').length;
				var validateArr = $.fromJSON($(this).attr("data-validate")); // 需要验证的选项
				for(var key in validateArr){
					//alert("key:" + key + "; value:" + validateArr[key]);
					// 判断检证条件
					switch(key){
					case "required": // 必须输入
						if($(this).val().replace(/\s/g,"")==""){
							errorCss($(this), validator[key]["msg"]);
							flg = false;
						}
						break;
					case "minLength": // 最小长度
						if($(this).val().length < validateArr[key]){
							var msg = validator[key]["msg"].replace("%%", validateArr[key])
							errorCss($(this), msg);
							flg = false;
						}
						break;
					case "maxLength": // 最大长度
						if($(this).val().length > validateArr[key]){
							var msg = validator[key]["msg"].replace("%%", validateArr[key])
							errorCss($(this), msg);
							flg = false;
						}
						break;
					case "idCard": // 身份证认证
						if($(this).val().replace(/\s/g,"")!="" && (!identityCodeValid($(this).val()))){
							var msg = validator[key]["msg"].replace("%%", validateArr[key])
							errorCss($(this), msg);
							flg = false;
						}
						break;	
					default: // 走正则判断
						if($(this).val().replace(/\s/g,"")!="" && (!validator[key]["regExp"].test($(this).val()))){
								errorCss($(this), validator[key]["msg"]);
								flg = false;
						}
						break;
					}
				}
			});
			
			
		$(formId+"select[data-validate]").each(function(i,item){
				if($(this).attr("errorFlg")){
				   $(this).removeAttr("errorFlg");
				}
				var length = $(this).attr("data-validate").split(',').length;
				var validateArr = $.fromJSON($(this).attr("data-validate")); // 需要验证的选项
				for(var key in validateArr){
					//alert("key:" + key + "; value:" + validateArr[key]);
					// 判断检证条件
					switch(key){
					case "required": // 必须输入
						if($(this).val().replace(/\s/g,"")==""){
							errorCss($(this), validator[key]["msg"]);
							flg = false;
						}
						break;
					default: // 走正则判断
						if($(this).val().replace(/\s/g,"")!="" && (!validator[key]["regExp"].test($(this).val()))){
								errorCss($(this), validator[key]["msg"]);
								flg = false;
						}
						break;
					}
				}
		});	
			
	return flg;
}

/**
 * 输入内容不符合要求时的错误样式
 */
function errorCss(_this, msg){
	/*var tempClassName = _this.attr("class");
	
	if(tempClassName){
	   _this.removeClass(tempClassName)
	
	}
	_this.addClass("ErrorCls");
	_this.val(msg);
	if(_this.attr("errorFlg")){
	   _this.removeAttr("errorFlg");
	}
	_this.attr("errorFlg",true);
	_this.focus(function(){
		_this.val(""); 
		_this.removeAttr("errorFlg");
		_this.removeClass("ErrorCls");
	});*/
	/*弹框*/
	if(_this.parent().children("div[name='errorFlgDiv']").length == 0){
		var errorFlgDiv = "<div name='errorFlgDiv' style='display:none;'>error</div>";
		_this.parent().append(errorFlgDiv);
		ecpBase.error(msg);
	}
	
}

//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
function identityCodeValid(code) { 
      var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
      //var tip = "";
      var pass= true;
      
      code = code.toUpperCase(); 
    if(code.length == 15){
		//将15位身份证转成18位 

		//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 

		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 

		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 

		var nTemp = 0, i;   

		code = code.substr(0, 6) + '19' + code.substr(6, code.length - 6); 

		for(i = 0; i < 17; i ++){ 

			nTemp += code.substr(i, 1) * arrInt[i]; 	
		} 

		code += arrCh[nTemp % 11]; 

	} 
   
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   

   if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(code))){ 

	  //  alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。'); 

	    pass = false;

   }
    else if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
          //tip = "身份证号格式错误";
          pass = false;
      }
      
     else if(!city[code.substr(0,2)]){
          //tip = "地址编码错误";
          pass = false;
      }
      else{
          //18位身份证需要验证最后一位校验位
          if(code.length == 18){
              code = code.split('');
              //∑(ai×Wi)(mod 11)
              //加权因子
              var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
              //校验位
              var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
              var sum = 0;
              var ai = 0;
              var wi = 0;
              for (var i = 0; i < 17; i++)
              {
                  ai = code[i];
                  wi = factor[i];
                  sum += ai * wi;
              }
              var last = parity[sum % 11];
              if(parity[sum % 11] != code[17]){
                  //tip = "校验位错误";
                  pass =false;
              }
          }
      }
      //if(!pass) alert(tip);
      return pass;
}

/**********************以下是特殊的验证，单独来用，跟上面的没有关系*************************/
/**
 * 验证手机号是否有效
 * areaCode 手机区域号
 * mobile 手机号
 */
function isMbrMobileValid(areaCode, mobile){
	
	// 大陆手机号验证
	if(areaCode=="0086"){
		var tel = /^((13[0-9])|(15[0-9])|(18[0-9])|(17[0-9])|(147))\d{8}$/;
		return tel.test(mobile);
	}
	// 香港澳门手机号验证
	else if(areaCode=="00852" || areaCode=="00853"){
		var tel = /^(51|52|53|54|55|56|59|60|61|62|63|64|65|66|67|68|69|90|91|92|93|94|95|96|97|98)\d{6}$/; 
	    return tel.test(mobile);
	}
	// 台湾手机号验证
	else if(areaCode=="00886"){
		var tel = /^9\d{8}$/; 
	    return tel.test(mobile);
	}
	// 验证未能通过
	else{
		return false;
	}
}

/**
 * 验证字符串是否是邮箱
 * str 要验证的字符串
 */
function isEmailValid(str){
	
	// 传来的字符串值验证
	if(str){
		var mail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return mail.test(str);
	}
	// 验证未能通过
	else{
		return false;
	}
}

/**
 * 验证长度区间
 * maxLength 最大长度
 * value 要验证的值
 */
function lengBetweenValid(minLength, maxLength, value){
	return (minLength <= value.length) && (maxLength >= value.length);
}

//验证非法字符
function isIllegal(str) {
    // 传来的字符串值验证
    if(str){
        var w = /[\s\^\$@\.\*\?\+\-!=:\|\\/\(\)\[\]\{\}]/;
        return w.test(str);
    }
    // 验证未能通过
    else{
        return false;
    }
}




/**
 * 验证表单内容，如果全部通过返回true，否则返回false
 * @param formId 表单ID
 * @param errorFocus 是否在失去焦点时校验
 */
function ecpValidate(formId,errorFocus) {
	var flg = true;
	$("#"+formId+" input[data-validate]").each(
		function(index) {
			
			var length = $(this).attr("data-validate").split(',').length;
			var validateArr = $.fromJSON($(this).attr("data-validate")); // 需要验证的选项
			var elflg = true;
			for(var key in validateArr){
				if(!elflg)break;
				$(this).siblings().remove();
				// 判断检证条件
				switch(key){
				case "required": // 必须输入
					if($(this).val().replace(/\s/g,"")==""){
						var errMsgEl = $("<span class='ecpValidateErrorCls'>该信息不允许为空</span>");
						$(this).after(errMsgEl);
						if(flg && (errorFocus!=false))$(this).focus();
						flg = false;
						elflg=false;
					}
					break;
			
				case "idCard": // 身份证认证
					if($(this).val().replace(/\s/g,"")!="" && (!identityCodeValid($(this).val()))){
						var errMsgEl = $("<span class='ecpValidateErrorCls'>请输入正确的身份证信息</span>");
						$(this).after(errMsgEl);
						if(flg && (errorFocus!=false))$(this).focus();
						flg = false;
						elflg=false;
					}
					break;	
				default: // 走正则判断
					if($(this).val().replace(/\s/g,"")!="" && (!validator[key]["regExp"].test($(this).val()))){
						var errMsgEl = $("<span class='ecpValidateErrorCls'>"+validator[key]["msg"]+"</span>");
						$(this).after(errMsgEl);
						if(flg && (errorFocus!=false))$(this).focus();
						flg = false;
						elflg=false;
					}
					break;
				}
			}
		}
	);
	return flg;
}