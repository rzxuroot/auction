/**
 * jQuery extends.
 */
jQuery.extend({
	/**
	 * Extend jQuery to serialize a object to json string.
	 * 
	 * @param Object,
	 *            support type:
	 *            object,array,string,function,number,boolean,regexp *
	 * @return json string
	 */
	toJSON : function(object) {
		if (object === null) return "null";
		if (!object && object != ""){
			return null;
		}
		var type = typeof object;
		if ('object' == type) {
			if (Array == object.constructor)
				type = 'array';
			else if (RegExp == object.constructor)
				type = 'regexp';
			else
				type = 'object';
		}
		switch (type) {
		case 'undefined':
		case 'unknown':
			return;
			break;
		case 'function':
		case 'boolean':
		case 'regexp':
			return object.toString();
			break;
		case 'number':
			return isFinite(object) ? object.toString() : 'null';
			break;
		case 'string':
			return '"'
					+ object.replace(/(\\|\")/g, "\\$1").replace(
							/\n|\r|\t/g,
							function() {
								var a = arguments[0];
								return (a == '\n') ? '\\n'
										: (a == '\r') ? '\\r'
												: (a == '\t') ? '\\t' : ""
							}) + '"';
			break;
		case 'object':
			if (object === null)
				return 'null';
			var results = [];
			for ( var property in object) {
				
				
				var value = jQuery.toJSON(object[property]);
				if (value !== undefined)
					results.push(jQuery.toJSON(property) + ':' + value);
			}
			return '{' + results.join(',') + '}';
			break;
		case 'array':
			var results = [];
			for ( var i = 0; i < object.length; i++) {
				var value = jQuery.toJSON(object[i]);
				if (value !== undefined)
					results.push(value);
			}
			return '[' + results.join(',') + ']';
			break;
		}
	},
	fromJSON : function(jStr) {
		return (new Function('return ' + jStr))();
	},
	nullZero2Str:function(str,replaceBlank){
		if(str == null){
			return "";	
		}
		if(str == "0"){
			return "";	
		}	
		if(replaceBlank){
			str = $.trim(str);
		}
		return str;
	},
	null2Str:function(str,replaceBlank){
		if(str == null){
			return "";	
		}	
		if(replaceBlank){
			str = $.trim(str);
		}
		return str;
	},
	dict:{
		//根据字典类型和字典编码获取字典值
		getDictText:function(dictType,dictCode){
			var dict = $.dict.getDict(dictType);
			if(dict !=null && dict != undefined){
				for(var i=0;i<dict.length;i++){
				  if(dict[i].code == dictCode)
				   return dict[i].content;
			    }
			}
			// 没有则返回空
			return "";
		},
		//根据字典类型和字典编码获取字典值
		getDictCode:function(dictType,dictText){
			var dict = $.dict.getDict(dictType);
			if(dict !=null && dict != undefined){
				for(var i=0;i<dict.length;i++){
				  if(dict[i].content == dictText)
				   return dict[i].code;
			    }
			}
			// 没有则返回空
			return "";
		},
		//根据字典类型获取字典列表
		getDict:function(dictType){
			if($.cacheDict[dictType] == null){
				doController("common/dict/getdictbytype.action",{"type":dictType}, function(_response) {
					if (_response.result) {
						$.cacheDict[dictType] = _response.data;
					}
				},false);
			}
			return $.cacheDict[dictType];
		}
	},
	cacheDict:{}
});

Array.prototype.distinct = function(){
	var result = [], hash = {};
    for (var i = 0, elem; (elem = this[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
	return result;
}
Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i] 
        } 
    } 
    this.length-=1 
} 
