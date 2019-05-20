//引用数据字典的select的初始化
function initSelectOfDict() {
	$("select").each(
			function(index) {
				var _type = $(this).attr("data-type");
				var _hasBlank = $(this).attr("data-hasBlank")
				var dataDefault = $(this).attr("data-default")
				var dataCallback = $(this).attr("data-callback")
				var _this = this;
				if (_type != null && _type != "") {
					doController("common/dict/getdictbytype.action",{"type":_type}, function(_response) {
						if (_response.result) {
							var optionStr = "";
							if (_hasBlank == "true") {
								optionStr = "<option value=''></option>";
							}
							var _data = _response.data;
							for ( var i = 0; i < _data.length; i++) {
								if(dataDefault != null && dataDefault != "" && dataDefault == _data[i].code){
									optionStr += "<option selected='selected' value='"+ _data[i].code +"'>"+ _data[i].content +"</option>";
								}else{
									optionStr += "<option value='"+ _data[i].code+ "'>"+ _data[i].content +"</option>";
								}
							}
							$(_this).append(optionStr);
							if(dataCallback)eval(dataCallback+"();");
						}

					},false);
					
				}
			});
}

$(function() {
	// select初始化
	initSelectOfDict();
})