/*
* @Object       : com.rf.scsd.Table
* @author       : rqf
* @version      : 表格组件支持脚本1.0版本
* @desc        : 提供对表格组件的脚本支持
* @for example  : 
*/
var ScsdTableRealPath = null;
com.rf.scsd.Table = function(_cfg){
	this.store   = [];//表格数据源
	this.cacheSelStore   = [];
	this.autoLoad  = false;//表格是否默认加载
	this.height  = "";//表格高度
	this.queryId = ""; //表格对应的后台queryId
	this.isShowRowNum = null;//是否显示行号
	this.columns = [];//列定义对象
	this.checkMode = "";//设置表格行选中模式，包括：【checkbox】【radio】两种类型
	this.operArr = null;//表格操作列
	this.isGroup = false;//表格是否分组
	this.controllerPath = null;//表格数据源path
	this.render = null;//表格渲染函数
	this.columnLayout = null; //表格九宫格配置模式
	this.filterMap = {};//过滤条件
	this.page = {
		currentPage:1,
		pageCount:0,
		recordCount:0,
		pageSize:20
	};//分页信息
	
	$.extend(this,_cfg);
	var _this = this;
	/*
	 * @method          : _initTable
	 * @methodType      : 私有方法
	 * @desc            : 初始化表格信息
	 */
	var _initTable = function(){
		//1:绑定分页每页显示数select事件
		var pageToolbarTrEl = $("div[id="+_this.tableId+"][comName='ScsdTable']").find("div.tablePageToolbarCls").find("table").find("tr");
		var pageSizeSelectObj = pageToolbarTrEl.find("td").find("select");
		pageSizeSelectObj.val(_this.page.pageSize);
		pageSizeSelectObj.bind("change",function(){
			_this.page.pageSize = $(this).val();
			_this.page.currentPage = 1;
			_this.query(_this.filterMap);
		});
	
		//1:判断是否默认加载表格数据
		if(_this.autoLoad){
			_this.load();
		}
		
		//2:如果表格的选择模式是多选，则需要设置表头都上的全选按钮事件
		if(_this.checkMode == "checkbox"){
			var checboInputObj = $("div[id='"+_this.tableId+"']").find("div.tableHeaderCls").find("table").find("tr").find("td").find("input");
			checboInputObj.bind("click",function(){
				$("input[name='scsdTable_checkMode_"+_this.tableId+"']").prop("checked",$(this).is(':checked'));
				
				if($(this).is(':checked')){
					for(var i=0;i<_this.store.length;i++){
						if($("#"+_this.tableId).find("input[rowNum="+i+"]")[0]!=null){
							if($.toJSON(_this.cacheSelStore).indexOf($.toJSON(_this.store[i]))==-1){
								_this.cacheSelStore.push(_this.store[i]);
							}
						}
						
					}
					
				}else{
					for(var i=0;i<_this.store.length;i++){
						if($("#"+_this.tableId).find("input[rowNum="+i+"]")[0]!=null){
							if($.toJSON(_this.cacheSelStore).indexOf($.toJSON(_this.store[i]))!=-1){
								_this.cacheSelStore.splice($.inArray(_this.store[i],_this.cacheSelStore),1); 
							}
						}
						
					}
					
				}
				if(_this.onCheckedFun){
					var _scsdTableOnCheckedFun = eval(_this.onCheckedFun);	
					_scsdTableOnCheckedFun();
				}
			});
		}
		
	}
	
	/*
	 * @method       : _createFilterMapForLoad
	 * @methodType   : 私有方法
	 * @desc        : 加载数据库数据时，构建请求参数
	 */
	var _createFilterMapForLoad = function(){
		
		if(_this.columnLayout != null){
			//_this.page.pageSize = eval(_this.columnLayout);
		}
		var loadSetting = {
			queryId:_this.queryId,
			filterMap:_this.filterMap,
			pageInfo:_this.page
		}
		return loadSetting;
	}
	
	/*
	 * @method       : _createRow
	 * @methodType   : 私有方法
	 * @param  data  : 表格数据集
	 * @desc         : 创建表格所有行
	 */
	var _createRowsByData = function(data){
		//1：获取表格容器div,清空已有数据
		var tableContentBoxDivEl = $("div[id="+_this.tableId+"]").find("div.tableContentBoxCls").eq(0);
		tableContentBoxDivEl.html("");
		_this.store = [];
		//2:循环创建行
		//2.1：获取表格对象
		var tableContentBoxDivEl = $("div[id="+_this.tableId+"][comName='ScsdTable']").find("div.tableContentBoxCls").eq(0);
		
		if(_this.columnLayout == null){
			//2.1.1非九宫格模式排列
			if(_this.isGroup == "true"){
				for(var i=0;i<data.length;i++){
					var oneMap = data[i];
					oneMap = changeKey(oneMap);
					_this.store.push(oneMap);
					_createO2MRow(tableContentBoxDivEl,oneMap,i);
				}
			}else{
				var detailTableEl = $('<table class="tableRowItemCls" cellpadding="0" cellspacing="0" border="0"></table>');
				tableContentBoxDivEl.append(detailTableEl);
				for(var i=0;i<data.length;i++){
					var oneMap = changeKey(data[i]);
					_this.store.push(oneMap);
					detailTableEl.append(_createSimpleRow(oneMap,i));
				}
			}
		}else{
			//2.1.2九宫格模式排列
			//2.1.2.1创建表格头部工具条
			_createTableTool(tableContentBoxDivEl);
			//2.1.2.2创建表格数据行
			_createSudokuRow(tableContentBoxDivEl,data);
		}
	}
	
	//创建表格头部工具条
	var _createTableTool = function(tableContentBoxDivEl){
		var tableToolEl = $("<table class='tableToolElCls'></table>");
		var trToolEl = $("<tr></tr>");
		var tdButtonsToolEl = $("<td class='buttonTdCls'></td>");
		
		
		eval("var tempOperArr = "+_this.operArr);
		if(tempOperArr != null){
			for(var i=0;i<tempOperArr.length;i++){
				var tempOper = tempOperArr[i];
				var operBtnEl = $("<div tempOperArrIndex='"+i+"' class='topToolbarDivCls topToolbarDivUnSelectedCls'>" + tempOper.html + "</div>");
				tdButtonsToolEl.append(operBtnEl);
				
				if(tempOper.func != null){
					operBtnEl.bind("click",function(){
						$(this).toggleClass("topToolbarDivUnSelectedCls").toggleClass("topToolbarDivSelectedCls");
						var func = tempOperArr[$(this).attr("tempOperArrIndex")].func;
						func();
					});
				}
				
			}
		}
		trToolEl.append(tdButtonsToolEl);
		
		
		var tdTotalRecordsToolEl = $("<td class='totalRecordsTdCls'></td>");
		trToolEl.append(tdTotalRecordsToolEl);
		
		var tdPageInfoToolEl = $("<td class='pageInfoTdCls'></td>");
		trToolEl.append(tdPageInfoToolEl);
		
		var tdPreBtnToolEl = $("<td class='preBtnTdCls'></td>");
		//var preBtnEl = $("<div class='floatLeft pageBtnDivCls pageBtnDisDivCls'><</div>");
		//tdPreBtnToolEl.append(preBtnEl);
		//var nextBtnEl = $("<div class='floatLeft marginLeft5 pageBtnDivCls  pageBtnNoDisDivCls'>></div>");
		//tdPreBtnToolEl.append(nextBtnEl);
		trToolEl.append(tdPreBtnToolEl);
		
		
		tableToolEl.append(trToolEl);
		tableContentBoxDivEl.append(tableToolEl);
	}
	
	//转换大小写
	var changeKey = function(rowData){
		
		return rowData;
	}
	
	var _createSudokuRow =  function(tableContentBoxDivEl,rowData){
		//1:创建表格
		var tableDivBoxStyle = (_this.height != null) ? 'height:'+_this.height+';overflow-y:auto;' : '';
		var tableDivBox = $("<div style='"+tableDivBoxStyle+"'></div>");
		var tableEl = $('<table width="100%" cellpadding="0" cellspacing="0" border="0"></table>');
		tableDivBox.append(tableEl);
		tableContentBoxDivEl.append(tableDivBox);
		
		//2:循环九宫格
		var _rowCnt = _this.columnLayout.split("\*")[0];
		var _colCnt = _this.columnLayout.split("\*")[1];
		if(rowData==null)return;
		_rowCnt = Math.ceil(rowData.length/_colCnt);
		var tdWidth = (fixMath(fixMath(tableEl.width(),fixMath(fixMath(_colCnt,"1","-"),"20","*"),"-"),_colCnt,"/"));
		for(var i=0;i<_rowCnt;i++){
			if(i!=0){
				var nbspTrEl = $("<tr style='height:20px'></tr>")
				tableEl.append(nbspTrEl);
			}
			
			var trEl = $("<tr></tr>");
			for(var j=0;j<_colCnt;j++){
				var _currIndex = (i * _colCnt) + j;
				if(_currIndex>=rowData.length){
					tdEl = $("<td width='20'></td><td width='"+tdWidth+"' >&nbsp;</td>");
					trEl.append(tdEl);
					continue;
				}
				
				if(j!=0){
					var nbspTdEl = $("<td width='20'></td>")
					trEl.append(nbspTdEl);
				}
				
				var tdEl = $("<td class='sudokuTdCls' width='"+tdWidth+"'></td>");
				trEl.append(tdEl);
				var tdDivEl = $("<div class='sudokuDivCls'></div>");
				tdEl.append(tdDivEl);
				tdDivEl.hover(function(){
					$(this).toggleClass("sudokuDivCls").toggleClass("sudokuDivMOCls");
					$(this).parent().toggleClass("sudokuTdCls").toggleClass("sudokuTdMOCls");
				},function(){
					$(this).toggleClass("sudokuDivCls").toggleClass("sudokuDivMOCls");
					$(this).parent().toggleClass("sudokuTdCls").toggleClass("sudokuTdMOCls");
				})
				var _scsdTableRenderFunction = eval(_this.render);
				if(_scsdTableRenderFunction != null){
					tdDivEl.append(_scsdTableRenderFunction(changeKey(rowData[_currIndex]),null,i,j));
				}
			}
			tableEl.append(trEl);
		}
	};
	
	
	var _createSimpleRow = function(rowData,rowNum){
		var detailTrEl = $('<tr></tr>');
		//4:判断是否需要有“选择”列，如果需要，则创建相应的选择控件（checkbox or radio）
		if(_this.checkMode != ""){
			detailTrEl.append(_createCheckColByRowNum(rowData,_this.checkMode,rowNum));
		}
		for(var j=0;j<_this.columns.length;j++){
			var detailColumnSetting = _this.columns[j];
			if(detailColumnSetting.hidden == "true")continue;
			var detailTdAlignClass  = (detailColumnSetting.align == null ? "center" : detailColumnSetting.align.toLowerCase());
			var detailTdVAlignClass = (detailColumnSetting.valign == null ? "center" : detailColumnSetting.valign.toLowerCase());
			var detailTdBorderClass = (detailColumnSetting.border == "false" ? "" : "RB");
			
			var detailTdEl = $('<td style="width:'+detailColumnSetting.width+'" class="align'+detailTdAlignClass+' valign'+detailTdVAlignClass+' tableColItem'+detailTdBorderClass+'Cls"></td>');
			
			var columnValue = $.null2Str(rowData[detailColumnSetting.columnName]);
			
			if(detailColumnSetting.format != null){
				columnValue = new Date(columnValue).format(detailColumnSetting.format);	
			}
			rowData[detailColumnSetting.columnName] = columnValue;
			if(_this.render){
				var _scsdTableRenderFunction = eval(_this.render);
				detailTdEl.append(_scsdTableRenderFunction(rowData,detailColumnSetting.columnName,rowNum));
			}else{
				if(detailColumnSetting.dictType == null){
					detailTdEl.append($.null2Str(rowData[detailColumnSetting.columnName]));
				}else{
					detailTdEl.append($.dict.getDictText(detailColumnSetting.dictType,$.null2Str(rowData[detailColumnSetting.columnName])));
				}
				
			}
			detailTrEl.append(detailTdEl);
			
		}
		//3:判断是否有操作列，若有，则创建操作列
		if(_this.operArr != null){
			detailTrEl.append(_createOperArrCol(rowNum,1));
		}
		
		return (detailTrEl);
	}
	
	//创建一对多的表格行
	var _createO2MRow = function(tableContentBoxDivEl,rowData,rowNum){
		var groupInfoT = '<table class="tableGroupItemCls" cellpadding="0" cellspacing="0" border="0">';
		groupInfoT += '<tr>';
		
	
		for(var i=0;i<_this.columns.length;i++){
			var groupColumnSetting = _this.columns[i];
			if(groupColumnSetting.hidden == "true") continue;
			if(groupColumnSetting.groupOrDetail == "detail") continue;
			if(groupColumnSetting.toDetail == "true") continue;
			var groupTdAlignClass  = (groupColumnSetting.align == null ? "center" : groupColumnSetting.align.toLowerCase());
			var groupTdVAlignClass = (groupColumnSetting.valign == null ? "center" : groupColumnSetting.valign.toLowerCase());
			
			
			if(_this.render){
				var _scsdTableRenderFunction = eval(_this.render);
				groupInfoT += '<td style="width:'+groupColumnSetting.width+'" class="align'+groupTdAlignClass+'">'+_scsdTableRenderFunction(rowData,groupColumnSetting.columnName,rowNum)+'</td>';
			}else{
				groupInfoT += '<td style="width:'+groupColumnSetting.width+'" class="align'+groupTdAlignClass+'">'+$.null2Str(rowData[groupColumnSetting.columnName])+'</td>';
				
			}
		}
		groupInfoT += '</tr>';
		groupInfoT += '</table>';
		tableContentBoxDivEl.append(groupInfoT);
		
		//插入明细表格
		var detailTableEl = $('<table class="tableRowItemCls" cellpadding="0" cellspacing="0" border="0"></table>');
		tableContentBoxDivEl.append(detailTableEl);
		for(var i=0;i<rowData.items.length;i++){
			var detailData = rowData.items[i];
			var detailTrEl = $('<tr></tr>');
			
			//4:判断是否需要有“选择”列，如果需要，则创建相应的选择控件（checkbox or radio）
			if(_this.checkMode != ""){
				detailTrEl.append(_createCheckColByRowNum(rowData,_this.checkMode,rowNum));
			}
			
			for(var j=0;j<_this.columns.length;j++){
				var detailColumnSetting = _this.columns[j];
				if(detailColumnSetting.hidden == "true")continue;
				
				if(detailColumnSetting.groupOrDetail == "group" && (detailColumnSetting.toDetail != "true")) continue;

				var detailTdAlignClass  = (detailColumnSetting.align == null ? "center" : detailColumnSetting.align.toLowerCase());
				var detailTdVAlignClass = (detailColumnSetting.valign == null ? "center" : detailColumnSetting.valign.toLowerCase());
				var detailTdBorderClass = (detailColumnSetting.border == "false" ? "" : "RB");
				
				if(detailColumnSetting.groupOrDetail == "group" && (detailColumnSetting.toDetail == "true") && i==0){
					var detailTdEl = $('<td rowspan="'+rowData.items.length+'"  style="width:'+detailColumnSetting.width+'" class="align'+detailTdAlignClass+' valign'+detailTdVAlignClass+' tableColItem'+detailTdBorderClass+'Cls"></td>');
					if(_this.render){
						var _scsdTableRenderFunction = eval(_this.render);
						detailTdEl.append(_scsdTableRenderFunction(rowData,detailColumnSetting.columnName,rowNum));
					}else{
						if(detailColumnSetting.dictType == null){
							detailTdEl.append($.null2Str(rowData[detailColumnSetting.columnName]));
						}else{
							detailTdEl.append($.dict.getDictText(detailColumnSetting.dictType,$.null2Str(rowData[detailColumnSetting.columnName])));
						}
					}
					
					detailTrEl.append(detailTdEl);
				}else if(detailColumnSetting.groupOrDetail == "detail"){
					var realColumnName = detailColumnSetting.columnName.split(".")[1];
					var detailTdEl = $('<td style="width:'+detailColumnSetting.width+'" class="align'+detailTdAlignClass+' valign'+detailTdVAlignClass+' tableColItem'+detailTdBorderClass+'Cls"></td>');
					if(_this.render){
						var _scsdTableRenderFunction = eval(_this.render);
						detailTdEl.append(_scsdTableRenderFunction(detailData,detailColumnSetting.columnName,rowNum));
					}else{
						
						if(detailColumnSetting.dictType == null){
							detailTdEl.append($.null2Str(detailData[realColumnName]));
						}else{
							detailTdEl.append($.dict.getDictText(detailColumnSetting.dictType,$.null2Str(detailData[realColumnName])));
						}
						
						
					}
					detailTrEl.append(detailTdEl);
				}
				
			}
			
			
			//3:判断是否有操作列，若有，则创建操作列
			if(_this.operArr != null && (i == 0)){
				detailTrEl.append(_createOperArrCol(rowNum,rowData.items.length));
			}
			
			detailTableEl.append(detailTrEl);
		}	
	}
	
	
	
	/*
	 * @method          : _createCheckColByRowNum
	 * @methodType      : 私有方法
	 * @param  checkMode: 表格选中模式的配置
	 * @param  rowNum: 表格行号
	 * @desc            : 创建表格行的选择列
	 */
	var _createCheckColByRowNum = function(rowData,checkMode,rowNum){
		var checkColTd = $('<td class="aligncenter valignmiddle tableColItemRBCheckboxCls" ></td>');
		var checked = "";
		if(_this.cacheSelected == "true"){
			var pkMap = {};
			pkMap[_this.pkKey] = _this.store[rowNum][_this.pkKey];
			if($.toJSON(_this.cacheSelStore).indexOf($.toJSON(pkMap).replace("{","").replace("}",""))!=-1){
				checked = "checked='checked'";
			}
		}
		var checkModeCom = $('<input '+checked+' rowNum="'+rowNum+'" name="scsdTable_checkMode_'+_this.tableId+'" type="'+checkMode.toLowerCase()+'"/>');
		if(_this.cacheSelected == "true"){
			checkModeCom.bind("click",function(){
				if($(this).is(':checked')){
					if($.toJSON(_this.cacheSelStore).indexOf($.toJSON(_this.store[rowNum]))==-1){
						_this.cacheSelStore.push(_this.store[rowNum]);
					}
				}else{
					if($.toJSON(_this.cacheSelStore).indexOf($.toJSON(_this.store[rowNum]))!=-1){
						_this.cacheSelStore.splice($.inArray(_this.store[rowNum],_this.cacheSelStore),1); 
					}
				}
				if(_this.onCheckedFun){
					var _scsdTableOnCheckedFun = eval(_this.onCheckedFun);	
					_scsdTableOnCheckedFun();
				}
			});
		}
		var _scsdTableRenderFunction = eval(_this.render);
		if(_scsdTableRenderFunction != null){
			var renderResult = (_scsdTableRenderFunction(rowData,checkMode,rowNum,-1));
			if(renderResult!=false){
				checkColTd.append(checkModeCom);
			}
		}else{
			checkColTd.append(checkModeCom);
		}
		return  checkColTd;
	}
	
	
	/*
	 * @method          : _createOperArrCol
	 * @methodType      : 私有方法
	 * @param  rowNum   : 表格行号
	 * @param  rowspanCnt: 合并行数
	 * @desc            : 创建表格行的操作列
	 */
	var _createOperArrCol = function(rowNum,rowspanCnt){
		var operArrTd = $('<td  rowspan="'+rowspanCnt+'" class="aligncenter valignmiddle tableColItemCls"></td>');
		
		eval("var tempOperArr = "+_this.operArr);
		for(var i=0;i<tempOperArr.length;i++){
			var tempOper = $("<div class='tempOperArrDivCls'  tempOperArrIndex="+i+"></div>");
			tempOper.html(tempOperArr[i].html);
			if(tempOperArr[i].render != null){
				tempOper.html(tempOperArr[i].render(_this.store[rowNum],rowNum));
			}else if(tempOperArr[i].type != null){
				if(tempOperArr[i].isShow != null && !tempOperArr[i].isShow(_this.store[rowNum],rowNum)){
					continue;
				}
				var fontLength = tempOperArr[i].html.length <= 4 ? 4 : 6;
				var operBtnIcon = $("<div iconType='"+tempOperArr[i].type+"' style='width:100px' class='"+tempOperArr[i].type+"OperBtnIconCls"+fontLength+"'></div>");
				operBtnIcon.bind("mouseover",function(){
					$(this).removeClass($(this).attr("iconType")+"OperBtnIconCls"+fontLength).addClass($(this).attr("iconType")+"OperBtnMOIconCls"+fontLength);
				}).bind("mouseout",function(){
					$(this).removeClass($(this).attr("iconType")+"OperBtnMOIconCls"+fontLength).addClass($(this).attr("iconType")+"OperBtnIconCls"+fontLength);
				});
				operBtnIcon.html(tempOperArr[i].html);
				tempOper.html(operBtnIcon);
			}
			if(tempOperArr[i].func != null){
				tempOper.bind("click",function(){
					var func = tempOperArr[$(this).attr("tempOperArrIndex")].func;
					func(_this.store[rowNum],rowNum);
				});
			}
			
			if(i!=0){operArrTd.append($("<div style='height:5px;'>&nbsp;</div>"))};
			operArrTd.append(tempOper);
		}
		return operArrTd;
	}
	
	/*
	 * @method          : _reflushPageInfo
	 * @methodType      : 私有方法
	 * @param  column   : 分页信息
	 * @desc            : 刷新分页信息
	 */
	var _reflushPageInfo = function(pageInfo){
		var pageToolbarTrEl = $("div[id="+_this.tableId+"][comName='ScsdTable']").find("div.tablePageToolbarCls").find("table").find("tr");
		//1:刷新总记录数信息
		pageToolbarTrEl.find("td").eq(0).find("span.recordCountSpan").html(pageInfo.recordCount);
		//2:刷新每页记录数信息
		pageToolbarTrEl.find("td").eq(0).find("span.pageSizeSpan").html(pageInfo.pageSize);
		//3:设置当前页数
		pageToolbarTrEl.find("td").eq(0).find("span.currentPageSpan").html(pageInfo.currentPage);
		//4:刷新总页数信息
		pageToolbarTrEl.find("td").eq(0).find("span.pageCountSpan").html(pageInfo.pageCount);
		
		//5:设置上下页按钮状态
		pageToolbarTrEl.find("td").eq(1).find("span").removeClass().addClass((pageInfo.currentPage==1)?"tablePageBtnDisabledCls":"tablePageBtnCls");
		pageToolbarTrEl.find("td").eq(2).find("span").removeClass().addClass((pageInfo.currentPage==pageInfo.pageCount)?"tablePageBtnDisabledCls":"tablePageBtnCls");
		
		//6:设置上下页按钮事件
		
		if((pageInfo.currentPage==1) && (pageInfo.currentPage==pageInfo.pageCount)){
			//当前处于第一页，也是最后一页，不允许点击上一页和下一页按钮
			pageToolbarTrEl.find("td").eq(1).find("span").unbind("click");
			pageToolbarTrEl.find("td").eq(2).find("span").unbind("click");
		}else if(pageInfo.currentPage==1 && (pageInfo.currentPage!=pageInfo.pageCount)){
			//当前处于第一页，不是最后一页，仅不允许点击上一页
			pageToolbarTrEl.find("td").eq(1).find("span").unbind("click");
			pageToolbarTrEl.find("td").eq(2).find("span").unbind("click").bind("click",function(){
				_this.page.currentPage = _this.page.currentPage + 1;
				_this.load(_loadCallBack);	
			});
		}else if(pageInfo.currentPage != 1 && (pageInfo.currentPage!=pageInfo.pageCount)){
			//当前不是第一页，也不是最后一页，仅不允许点击上一页
			pageToolbarTrEl.find("td").eq(1).find("span").unbind("click").bind("click",function(){
				_this.page.currentPage = _this.page.currentPage - 1;
				_this.load(_loadCallBack);	
			});
			pageToolbarTrEl.find("td").eq(2).find("span").unbind("click").bind("click",function(){
				_this.page.currentPage = _this.page.currentPage + 1;
				_this.load(_loadCallBack);	
			});
		}else{
			//当前处于最后一页，仅不允许点击下一页
			pageToolbarTrEl.find("td").eq(1).find("span").unbind("click").bind("click",function(){
				_this.page.currentPage = _this.page.currentPage - 1;
				_this.load(_loadCallBack);	
			});
			pageToolbarTrEl.find("td").eq(2).find("span").unbind("click");
		}

		// 重置select下拉框
		if (pageInfo.pageSize == 10) {
			var pageSizeSelectObj = pageToolbarTrEl.find("td").find("select");
			// 设置索引值为0的项为当前选中项
			pageSizeSelectObj.get(0).selectedIndex = 0;
		}

		// 新加跳转页信息:创建跳转页的按钮
		var scsdTablePageBtnObj = pageToolbarTrEl.find("td.tablePageBtnToolBarCls").find("div");
		if (pageInfo.pageCount > 0) {
			scsdTablePageBtnObj.show();
		} else {
			scsdTablePageBtnObj.hide();
		}
		scsdTablePageBtnObj.html("");
		var scsdTablePageBtnTable = $('<table class="tablePageBtnTdCls"></table>');
		var scsdTablePageBtnTr = $('<tr></tr>');
		var scsdTablePageFirstBtnTd = $('<td style="display:none;" gotoPage="1" btnType="first"><span class="tablePageBtnDisabledCls">首页</span></td>').bind("click",_gotoPage);
		var scsdTablePagePreBtnTd = $('<td gotoPage="'+(fixMath( _this.page.currentPage,"1", "-"))+'" btnType="pre"><span class="tablePageBtnDisabledCls">上一页</span></td>').bind("click",_gotoPage);
		var scsdTablePageNextBtnTd = $('<td gotoPage="'+(fixMath( _this.page.currentPage,"1", "+"))+'" btnType="next"><span class="tablePageBtnDisabledCls">下一页</span></td>').bind("click",_gotoPage);
		var scsdTablePageLastBtnTd = $('<td style="display:none;"  gotoPage="'+pageInfo.pageCount+'" btnType="last"><span class="tablePageBtnCls">尾页</span></td>').bind("click",_gotoPage);
		var scsdTablePageMoreBtnTd = $('<td btnType="last">...</td>');

		scsdTablePageBtnObj.append(scsdTablePageBtnTable);//创建跳转页的表格容器
		scsdTablePageBtnTable.append(scsdTablePageBtnTr);//创建跳转页的表格容器tr
		scsdTablePageBtnTr.append(scsdTablePageFirstBtnTd);//创建跳转到第一页的按钮td
		scsdTablePageBtnTr.append(scsdTablePagePreBtnTd);

		if (pageInfo.pageCount > 10 && (parseInt(fixMath("1", _this.page.currentPage, "-")) < 0)) {
			
			var lPage = fixMath(_this.page.currentPage,"10","-");
			lPage = (parseInt(lPage)<=0?"1":lPage);
			var lBtn = $('<td gotoPage="'+lPage+'" btnType="last"  style="cursor:pointer;font-size: 15px;">&nbsp;&lt;</td>').bind("click",_gotoPage);
			
			scsdTablePageBtnTr.append(lBtn);
		}
		var i = parseInt(fixMath(_this.page.currentPage, "10", "+"));
		i = (i > pageInfo.pageCount ? parseInt(fixMath(pageInfo.pageCount, "10", "-")) : parseInt(_this.page.currentPage));
		if (i <= 0)i = 1;
		for (; i <= pageInfo.pageCount; i++) {
			if (i == parseInt(fixMath(_this.page.currentPage, "10", "+"))) {
				break;
			}

			var scsdTablePageBtnTd = $('<td gotoPage="' + i + '" id="toPage" btnType="page" class="backPage' + (_this.page.currentPage == i ? "" : "Disabled") + 'Cls">' + i + '</td>');
			scsdTablePageBtnTd.bind("click", _gotoPage);
			scsdTablePageBtnTr.append(scsdTablePageBtnTd);
		}
		if (pageInfo.pageCount > 10 && (parseInt(fixMath(_this.page.currentPage, "10", "+")) < pageInfo.pageCount)) {
			scsdTablePageBtnTr.append(scsdTablePageMoreBtnTd);
		}
		scsdTablePageBtnTr.append(scsdTablePageNextBtnTd);
		scsdTablePageBtnTr.append(scsdTablePageLastBtnTd);//创建跳转到最后一页的按钮td

		//设置按钮状态
		if (pageInfo.pageCount == 1) {
			scsdTablePageBtnObj.find("td").find("span").eq(0).removeClass().addClass("tablePageBtnDisabledCls");
			scsdTablePageBtnObj.find("td").find("span").eq(1).removeClass().addClass("tablePageBtnDisabledCls");
			scsdTablePageLastBtnTd.find("span").removeClass().addClass("tablePageBtnDisabledCls");
			scsdTablePagePreBtnTd.unbind();
			scsdTablePageFirstBtnTd.unbind();
			scsdTablePageLastBtnTd.unbind();
			scsdTablePageNextBtnTd.unbind();
		} else if (pageInfo.currentPage == 1) {
			scsdTablePageBtnObj.find("td").find("span").eq(0).removeClass().addClass("tablePageBtnDisabledCls");
			scsdTablePageBtnObj.find("td").find("span").eq(1).removeClass().addClass("tablePageBtnDisabledCls");
			scsdTablePageBtnObj.find("td").find("span").eq(2).removeClass().addClass("tablePageBtnCls");
			scsdTablePagePreBtnTd.unbind();
			scsdTablePageFirstBtnTd.unbind();
		} else if (_this.page.currentPage == pageInfo.pageCount) {
			scsdTablePageBtnObj.find("td").find("span").eq(0).removeClass().addClass("tablePageBtnCls");
			scsdTablePageBtnObj.find("td").find("span").eq(1).removeClass().addClass("tablePageBtnCls");
			scsdTablePageBtnObj.find("td").find("span").eq(2).removeClass().addClass("tablePageBtnDisabledCls");
			scsdTablePageLastBtnTd.find("span").removeClass().addClass("tablePageBtnDisabledCls");
			scsdTablePageLastBtnTd.unbind();
			scsdTablePageNextBtnTd.unbind();
		} else {
			scsdTablePageBtnObj.find("td").find("span").eq(0).removeClass().addClass("tablePageBtnCls");
			scsdTablePageBtnObj.find("td").find("span").eq(1).removeClass().addClass("tablePageBtnCls");
			scsdTablePageNextBtnTd.find("span").removeClass().addClass("tablePageBtnCls");
			scsdTablePageLastBtnTd.find("span").removeClass().addClass("tablePageBtnCls");
			
		}

	}

	/*
	 * @method          : _gotoPage
	 * @methodType      : 私有方法
	 * @desc            : 跳转到哪一页
	 */
	var _gotoPage = function() {
		//1:修改当前分页信息
		_this.page.currentPage = $(this).attr("gotoPage");
		//2:构建请求参数
		var filterMap = _createFilterMapForLoad();
		//3:发送请求
		_this.load(_loadCallBack);
	}


	/*
	 * @method          : _gotoSpecPage
	 * @methodType      : 私有方法
	 * @desc            : 跳转到指定的一页
	 */
	var _gotoSpecPage = function(queryid,filterMapStr,pageStr) {
		//1:修改当前分页信息
		_this.queryId = queryid
		_this.filterMap = $.parseJSON(filterMapStr);
		_this.page = $.parseJSON(pageStr);
		//3:发送请求
		_this.load(_loadCallBack);
	}



	/*
	 * @method     : _setFilterList
	 * @methodType : 私有方法
	 * @param      : 设置过滤条件
	 * @desc       : 设置过滤条件
	 */	
	var _setFilterMap = function(filterMap){
		_this.filterMap = filterMap;
		_this.page.currentPage = 1;
		_this.page.pageCount = 0;
		_this.page.recordCount = 0;
	}
	
	var doScsdController = function(queryId,_filterMap,_callBack){
		var url = baseUrl + "/common/querytable.action";
		ajaxHandler(url,_filterMap,_callBack,true);
	}
	//查询数据库数据
	this.query = function(_filterMap,_callBack){
		_filterMap = (_filterMap == null ? {} : _filterMap);
		_setFilterMap(_filterMap);
		this.load(_callBack);
	}
	
	//加载数据库数据
	var _loadCallBack = null;
	this.load = function(_callBack){
		_loadCallBack = _callBack;
		//1:构建请求参数
		var filterMap = _createFilterMapForLoad();

		if(_this.controllerPath != null){
			doController(_this.controllerPath,{queryData:$.toJSON(filterMap)},function(_response){
				if(_response.result){
					//3:渲染表格
					if(_response.data!=null){
						_createRowsByData(_response.data.data);
						
						//4:刷新分页信息
						_reflushPageInfo(_response.data.pageInfo);

						//5:若有回调，调用回调函数
						if(_callBack)_callBack();
					}
					
				}
			},true);
		}else{
			//2:发送请求
			doScsdController(_this.queryId,{"queryData":$.toJSON(filterMap)},function(_response){
				if(_response.result){
					//3:渲染表格
					_createRowsByData(_response.data.data);
					
					//4:刷新分页信息
					_reflushPageInfo(_response.data.pageInfo);
					
					//5:若有回调，调用回调函数
					if(_callBack)_callBack(_this);
				}
			});
			
		}
		
	}
	
	//获取表格选中行数据
	this.getSelected = function(){
		var checkModeInputSelectedArr = $("input:checked[name='scsdTable_checkMode_"+_this.tableId+"'][checkType!='allCheck']");
		var selectedStore = [];
		for(var i=0;i<checkModeInputSelectedArr.length;i++){
			selectedStore.push(_this.store[checkModeInputSelectedArr.eq(i).attr("rowNum")]);
		}
		return selectedStore;
	}
	//获取表格选中行数据(翻页不刷空)
	this.getCacheSelected = function(){
		return this.cacheSelStore;
	}
	this.clearCacheSelected = function(){
		this.cacheSelStore = [];
	}

	this.getTableCurrentPage= function()
	{
		return _this.page.currentPage;
	}

	this.getTableQueryId = function(){
		return _this.queryId;
	}

	this.getTableFilerStr = function(){
		return $.toJSON(_this.filterMap);
	}

	this.getTablePageStr = function(){
		return $.toJSON(_this.page);
	}

	this.gotoSpecifyPage=function(queryid,filterMapStr,pageStr)
	{
		_gotoSpecPage(queryid,filterMapStr,pageStr);
	}

	//初始化表格信息
	_initTable();
	
}

/*
 * @method           : getSelected
 * @methodType       : 公有方法
 * @param  tableId    : 表格Id
 * @desc             : 获取表格选中行信息
 */
$.scsd.Table.getSelected = function(tableId){
	return $.scsd.Table.items[tableId].getSelected();
}

/*
 * @method           : getCacheSelected
 * @methodType       : 公有方法
 * @param  tableId    : 表格Id
 * @desc             : 获取表格选中行信息
 */
$.scsd.Table.getCacheSelected = function(tableId){
	return $.scsd.Table.items[tableId].getCacheSelected();
}




/*
 * @method           : clearCacheSelected
 * @methodType       : 公有方法
 * @param  tableId    : 表格Id
 * @desc             : 获取表格选中行信息
 */
$.scsd.Table.clearCacheSelected = function(tableId){
	$.scsd.Table.items[tableId].clearCacheSelected();
}



/*
 * @method           : getSelected
 * @methodType       : 公有方法
 * @param  tableId    : 表格Id
 * @desc             : 获取表格选中行信息
 */
$.scsd.Table.createTable = function(_setting,callBack){
	var url = baseUrl + "/common/createtable.action";
	ajaxHandler(url,{"settingMap":$.toJSON(_setting)},function(_response){
		if(_response.result){
			//2:渲染表格表头
			var currDiv = $("#" + _setting.id);
			currDiv.after($(_response.data));
			currDiv.remove();
			currDiv = $("#" + _setting.id);
			var setting = currDiv.attr("setting");
			if(setting==null||setting==""){
				setting = "{}";
			}
			eval("var setting ="+setting);
			setting.tableId = currDiv.attr("id");
			var obj = new com.rf.scsd.Table(setting);
			$.scsd.Table.items[currDiv.attr("id")] = obj;
			if(callBack)callBack();
		}
	},true);
}

/*
 * @method       : getSelected
 * @methodType   : 公有方法
 * @param  gridId: 表格Id
 * @param  filterMap : 过滤条件
 * @param  _callBack : 表格查询结果后的回调函数
 * @desc         : 获取表格选中行信息
 */
$.scsd.Table.query = function(tableId,filterMap,_callBack){
	var _filterMap = {};
	if( typeof(filterMap) == "string"){
		_filterMap = $.fromJSON(filterMap);
	}else{
		_filterMap = filterMap;
	}
	return $.scsd.Table.items[tableId].query(_filterMap,_callBack);
}






/*  20181207 增加的功能 pf 一些增加的函数
 * @method       : getSelected
 * @methodType   : 公有方法
 * @desc         : 获得所需tableId的当前页数
 */
$.scsd.Table.getTableCurrentPage = function(tableId){
	return $.scsd.Table.items[tableId].getTableCurrentPage();
}

$.scsd.Table.getTableQueryId = function(tableId){
	return $.scsd.Table.items[tableId].getTableQueryId();
}

$.scsd.Table.getTableFilerStr = function(tableId){
	return $.scsd.Table.items[tableId].getTableFilerStr();
}

$.scsd.Table.getTablePageStr = function(tableId){
	return $.scsd.Table.items[tableId].getTablePageStr();
}

$.scsd.Table.gotoSpecifyPage = function(tableId,queryid,filterMapStr,pageStr){
	$.scsd.Table.items[tableId].gotoSpecifyPage(queryid,filterMapStr,pageStr);
}



$.scsd.Table.items = {};
$(function(){
	$("div[comName='ScsdTable']").each(function(i,element){
		
		var setting = $(this).attr("setting");
		if(setting==null||setting==""){
			setting = "{}";
		}
		eval("var setting ="+setting);
		setting.tableId = $(this).attr("id");
		var obj = new com.rf.scsd.Table(setting);
		$.scsd.Table.items[$(this).attr("id")] = obj;
	});
	
	
})
