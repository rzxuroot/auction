// 通用的JS业务方法
// bc对象是businessCommon的简写
var bc = {
	/**
	 * 出价方法
	 * @param1 lotId:图录表主键编
	 * @param2 userId:出价者主键编号
	 * @param3 bidPrice:价格
	 */
	doBidderAddPriceHandler:function (lotId,bidPrice,memberId,callBack){
		//1：发送请求，保存到出价信息到数据中
		var param = {
			lotId:lotId,
			isAbsentee:"N",
			bidPrice:bidPrice,
			bidderId:memberId
		};
		// 判断这个物品是否有代理
		doController("ecp/auctproxy/isexitproxy.action", {"lotId" : lotId}, function(a) {
			if (a.data.flag == "3") {// 没有代理
				// 3：发送请求，保存到出价信息到数据中
				bc.doBidderAddPriceHandler(lotId, clearFormatMoney($("#selfPrice").text()), 0, function() {
					doBindAddPriceButtonClickListener();
				}, false);
				} else{// 有代理 
					// 有代理 ----- 逻辑在后台写   要传标志性参数    出价的标志性参数
					bc.doBidderAddPriceHandler(lotId, clearFormatMoney($("#selfPrice").text()), 0, function() {
						doBindAddPriceButtonClickListener();
						// 插入代理记录（在doAddBidPrice方法中加）--------------待完成
					}, false);
			}
		}, false);
	}
}

