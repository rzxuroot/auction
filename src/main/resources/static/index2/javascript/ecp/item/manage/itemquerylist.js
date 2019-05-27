/**
 * @author zhangxituan
 * 拍品信息列表页面
 */
var ItemQueryList = {
    initBindEvent: function () {
        //当点击查询条件时执行该方法
        $(".itemCondition_ul_logoImg_text").each(function (i, item) {
            var _this = this;
            if($(_this).text()==" ")
            {
                return false;
            }
            $(_this).bind("click", function () {
                //添加查询条件到下面显示
                var _content = $(_this).text();
                var objId;
                var _title = $(_this).parent().parent().find(".title").text();
                if (_title == '专场') {
                    objId = "srName";
                }
                if (_title == '年代') {
                    objId = "itemAge";
                }
                if (_title == '质地') {
                    objId = "material";
                }
                if (_title == '形式') {
                    objId = "style";
                }
                if (_title == '作者') {
                    objId = "authorName";
                }

                if (_title.indexOf("价格")>=0) {
                    objId = "crrntPrice";
                }

                var _conDiv = $("<div class=\"conditdetail_wrap\"><div class=\"cond_title\">" + _title + "</div><div class=\"cond_cont\"><span id='" + objId + "'>" + _content + "</span></div><div class=\"cond_close\" onclick='doCloseCond(this)'>X</div>");
                var _sureBtnLen = $('.conditionLists_left .cond_sure_btn').length;

                if (_sureBtnLen > 0) {
                    $('.conditionLists_left .cond_sure_btn').parent().before(_conDiv);
                } else {
                    $(".conditionLists_left").append(_conDiv);
                }
                //隐藏该行
                $(_this).parent().parent().attr("class", "itemCondition_ul_condition");
                $(_this).parents(".itemCondition_ul_condition").hide();
                //判断是否需要显示确定按钮
                //ItemQueryList.isShowSureBtn();
                //查询表格数据
                queryTable();
                //当鼠标经过关闭按钮时，样式发生改变
                $(".cond_close").each(function (i, item) {
                    var _this = this;
                    $(_this).hover(function () {
                        $(_this).addClass("cond_close_activity");
                        $(_this).parent().addClass("cond_parent_activity");
                    }, function () {
                        $(_this).removeClass("cond_close_activity");
                        $(_this).parent().removeClass("cond_parent_activity");
                    });
                });

            });
        });
    },
    isShowSureBtn: function () {
        var _len = $('.conditionLists_left .cond_close').length;
        if (_len > 0) {
            //判断有没有显示“确定”按钮,如果已经显示则不再显示
            var _sureBtnLen = $('.conditionLists_left .cond_sure_btn').length;
            if (_sureBtnLen == 0) {
                var _sureBtn = $("<div class=\"conditdetail_wrap\"><div class=\"cond_sure_btn\" onclick=\"queryTable();\">确定</div></div>");
                $(".conditionLists_left").append(_sureBtn);
            }
        } else {
            //删除确定按钮
            $('.conditionLists_left .cond_sure_btn').parent().remove();
        }
    },
    doQuery: function () {
        queryTable();
    },
    bindData: function () {
        $(ItemFilterData).each(function (i, item) {
            var _li = $("<li class='itemCondition_ul_condition' id='more" + (i + 1) + "'></li>");
            var _divTitel = $("<div class='itemCondition_ul_text_left title'>" + item.name + "</div>");
            var _divContent = $("<div class='itemCondition_ul_logoImg_rig'></div>");
            $(item.data).each(function (j, ele) {
                var _dataName = $("<div title='" + ele.name + "' class='itemCondition_ul_logoImg_text'></div>");
                _dataName.append(ele.name);
                _divContent.append(_dataName);
            });
            if (!item.hasmore)
            {
                var _dataName = $("<div title='' style='float: left;width: 100px;height: 35px;overflow: hidden'> </div>");
                _divContent.append(_dataName);
            }
            var _moreDiv = $("<div  id='divmore" + (i + 1) + "' class='moreContent' style='display:none'></div>");
            var _Input1 = $("<input type='text' class='moreBorder'/>&nbsp;&nbsp;&nbsp;&nbsp; ");
            var _moreInput = $("<span class='moreTextSureDivCls'>确定</span>");
            _moreInput.bind("click", function () {
                sureButton(this);
                queryTable();
            });
            _moreDiv.append(_Input1);
            _moreDiv.append(_moreInput);
            var _moreTextDiv = $("<div class='itemCondition_ul_text_left more" + (i + 1) + " flag'></div>");
            var _alink = $("<a href='javascript:void(0)'>更多</a>");
            _alink.bind("click", function () {
                updateCss('more' + (i + 1));
            });
            _moreTextDiv.append(_alink);
            _li.append(_divTitel);
            _li.append(_divContent);
            //if (item.hasmore) {
                _li.append(_moreDiv);
                _li.append(_moreTextDiv);
            //}
            $("#ulFilterCondition").append(_li);
        });

        var  temp_li= "<li class='itemCondition_ul_condition' id='more10' style='display: list-item;'>"
             temp_li=temp_li+"<div class='itemCondition_ul_text_left title'>价格(元)</div>"
             temp_li=temp_li+"<div class='itemCondition_ul_logoImg_rig'>"
             temp_li=temp_li+"<div title='0-500' class='itemCondition_ul_logoImg_text'>0-500</div>"
             temp_li=temp_li+"<div title='500-1000' class='itemCondition_ul_logoImg_text'>500-1000</div>"
             temp_li=temp_li+"<div title='1000-5000' class='itemCondition_ul_logoImg_text'>1000-5000</div>"
             temp_li=temp_li+"<div title='5000-1万' class='itemCondition_ul_logoImg_text'>5000-1万</div>"
             temp_li=temp_li+"<div title='1万-3万' class='itemCondition_ul_logoImg_text'>1万-3万</div>"
             temp_li=temp_li+"<div title='3万-5万' class='itemCondition_ul_logoImg_text'>3万-5万</div>"
             temp_li=temp_li+"<div title='5万-10万' class='itemCondition_ul_logoImg_text'>5万-10万</div>"
             temp_li=temp_li+"<div title='10万以上' class='itemCondition_ul_logoImg_text'>10万以上</div>"
             temp_li=temp_li+ "<input id='startprice' maxlength='9' type='text' value='' style='border: 1px solid #CCCCCC;height: 20px;width: 60px;margin-left: 5px;margin-top: 7px;'>"
             temp_li=temp_li+" -"
             temp_li=temp_li+"<input id='endprice' maxlength='9' type='text' value='' style='border: 1px solid #CCCCCC;height: 20px;width: 60px;margin-left: 5px;margin-top: 7px;'>"
             temp_li=temp_li+"<span id='cf_price' style='color: #FFF;background-color: #ec154e;height: 22px;width: 55px;font-size: 12px;margin-left: 5px;margin-top: 7px;float: right;text-align: center;line-height: 22px;cursor: pointer;vertical-align: middle;display: block;' onclick='showprice()'>确定</span>"
             temp_li=temp_li+"</div>"
             temp_li=temp_li+"</li>"

           $("#ulFilterCondition").append(temp_li);

    }
}
/**
 * 关闭查询条件触发点击事件
 * @param _this
 */
function doCloseCond(_this) {
    var _title = $(_this).parent().find(".cond_title").text();
    $(".itemCondition_ul_condition .itemCondition_ul_text_left").each(function (i, item) {
        if (_title == $(item).text()) {
            $(item).parent().show();
            $(item).parent().find(".moreContent").hide();
            $(item).parent().find(".flag").show();
            return false;
        }
    });
    $(_this).parent().remove();
    queryTable();
}


/**
 * 为手机做的 隐藏查询条件的某一行
 * @param _this
 */
function hideConditionRow(objid) {
    var _title = $("#"+objid).parent().parent().find(".cond_title").text();
    $(".itemCondition_ul_condition .itemCondition_ul_text_left").each(function (i, item) {
        if (_title == $(item).text()) {
            $(item).parent().attr("class", "itemCondition_ul_condition");
            $(item).parent().hide();
            return false;
        }
    });
}

/**
 * 查询拍品列表
 */
function queryTable(pageNo) {

    var _catId = $("#catId").val();  //分类id
    var _catLev = $("#catLev").val();
    /*定义空的json字符串*/
    var obj = {};

    /*传入需要跳转的页码，若为空，赋值为1*/
    if(pageNo == null || pageNo == ""){
        pageNo = 1;
    }
    obj.pageNo = pageNo;
    /*获得homepage.html传过来的值*/
    var listName ='';
    var contentName = '';
    //从url中解析出一级目录和二级目录，如果？后面通过&分割之后数组长度为2说明是二级目录，
    // 长度为1说明是一级目录
    //判断url中是否含有？
    var url = window.location.href;
    if(url.indexOf("?") != -1){
        var strsize = (url.split("?")[1] || '' ).split("&").length;
        if(strsize == 2){
            listName = (url.split("?")[1] || '' ).split("&")[0].split("=")[1];
            contentName = (url.split("?")[1] || '' ).split("&")[1].split("=")[1];
            /*obj.listName = listName;*/
            obj.contentName = contentName;
            //说明是二级目录

            /*$("#queryTitle").html(decodeURI(listName)+">"+decodeURI(contentName));*/
            $("#queryTitle").html("<a  onclick='toList(this)' style=\"color: #d83560; text-decoration:none;cursor:pointer\">"+decodeURI(listName)+"</a>"+">"+decodeURI(contentName));
        }
        if(strsize == 1){
            listName = (url.split("?")[1] || '' ).split("=")[1];
            obj.listName = listName;
            //说明是一级目录
            $("#queryTitle").html(decodeURI(listName));
        }
    }
    var itemTimeValidtion = $(".tabUnderlineHeaderItemSelectedCls").text().replace(/(^\s*)|(\s*$)/g, "");
    if (itemTimeValidtion == "全部") {
        obj.timeFlag = "all";
    } else if (itemTimeValidtion == "未结束拍品") {
        obj.timeFlag = "now";
    } else {
        obj.timeFlag = "end";
    }
    var srName = $("#srName").text();
    var age = $("#itemAge").text();
    var material = $("#material").text();
    var style = $("#style").text();
    var authorName = $("#authorName").text();
    var val = $("#keywordInput").val();
    var cprice = $("#crrntPrice").text();


    if (saleRoomId != null && saleRoomId != "") {
        obj.saleroomId = saleRoomId;
    }
    if (srName != null && srName != "") {
        obj.srName = srName;
    }
    if (age != null && age != "") {
        obj.itemAge = age;
    }
    if (material != null && material != "") {
        obj.material = material;
    }
    if (style != null && style != "") {
        obj.style = style;
    }
    if (authorName != null && authorName != "") {
        obj.authorName = authorName;
    }
    if (val != null && val != "") {
        obj.itemName = val;
    }
    if (cprice != null && cprice != "") {
        obj.crrntPrice = cprice;
    }

    /*if ($("div.searchItemCls").html() == "当前分类") {
        if (_catLev == '1' && _catId != null && _catId != "") {  // 一级分类
            obj.firstCatgId = _catId;
        } else if (_catLev == '2' && _catId != null && _catId != "") {  // 二级分类
            obj.secondCatgId = _catId;
        }
    }*/
    /*判断是否为当前分类，若是当前分类，那么需要获取url中的值，
    若不是当前分类，那么需要将原来赋值给listName或contentName设置为null*/
    if ($("div.searchItemCls").html() == "所有分类") {
        delete obj.listName;
        delete obj.contentName;
        /*将导航栏中的首页之后的值清空*/
        $("#queryTitle").html();
    }
   $.post("/queryGoods/query",obj,
       function (value) {
       /*进行字符串拼接，得到分类栏*/
           /*判断totalPage是否为0，若为0不进行页码字符串拼接*/
       if(value.totalPage != 0){
           var mypage = "";
           mypage += "<nav aria-label=\"Page navigation\">";
           mypage += " <ul class=\"pagination\" id='pagediv'>";
           /*判断当前页码是否是第1页，是第一页就将上一页的class置为不能选中*/
           if(1 == pageNo ){
               mypage += "<li class=\"disabled\">";
               mypage += "<span aria-label=\"Previous\">";
               mypage += "<span  aria-hidden=\"true\">上一页</span>";
               mypage += "</span>";
               mypage += " </li>";
           }else {
               mypage += "<li>";
               mypage += "<span aria-label=\"Previous\">";
               mypage += "<span onclick=\"changePage(this)\" aria-hidden=\"true\">上一页</span>";
               mypage += "</span>";
               mypage += " </li>";
           }

           /*从这里开始页码的遍历*/
           for(var i = 1;i<= value.totalPage;i++){
               if(i == pageNo){
                   mypage += "<li class=\"active\">";
                   mypage += "<span  onclick=\"changePage(this)\">"+i+"</span>"
                   mypage += "<li>";
               }else {
                   mypage += "<li>";
                   mypage += "<span  onclick=\"changePage(this)\">"+i+"</span>"
                   mypage += "<li>";
               }
           }
           if(pageNo == value.totalPage || 1 == value.totalPage){
               mypage += "<li class=\"disabled\">";
               mypage += "<span aria-label=\"Next\">";
               mypage += "<span  aria-hidden=\"true\">下一页</span>";
               mypage += "</span>";
               mypage += " </li>";
           }else {
               mypage += "<li>";
               mypage += "<span aria-label=\"Previous\">";
               mypage += "<span onclick=\"changePage(this)\" aria-hidden=\"true\">下一页</span>";
               mypage += "</span>";
               mypage += " </li>";
           }
           mypage += "</ul>";
           mypage += "</nav>";
           $("#tablePageToolbarCls").html(mypage);
       }

        /*进行商品信息的遍历渲染*/
        var myGoodList = "";
        var array = value.goodsVOList;
        //判断集合是否为null和[]
           if(array != null && array.length > 0){
               myGoodList += "<ul class=\"goods_item\" >";
               /*这里对value中的goodsVOList进行*/
               for(var i = 0;i <array.length;i++){
                   myGoodList += "<li onmouseover='addBorder(this)' onmouseout='removeBorder(this)'>";
                   myGoodList += "<a href=\"/dataile/goodsDataile?goodsId="+array[i].goodsId+"\">"
                   myGoodList += "<div>";
                   myGoodList += "<div class=\"goods_img_dic\">";
                   myGoodList += "<img src=\"http://139.199.73.166/images/"+array[i].goodsImg+"\">";
                   myGoodList += "</div>";
                   myGoodList += "<div  class=\"goods_text_wrap\">";
                   myGoodList += "<div class=\"goods_text_two\" title='"+array[i].goodsName+"'>"+array[i].goodsName+"</div>";
                   myGoodList += "<div class=\"goods_text_one\">";
                   myGoodList += "<span class=\"goods_title\">当前价:</span>";
                   myGoodList += "<span class=\"goods_detail\">"+array[i].askingPrice+"</span>";
                   myGoodList += "</div>";
                   myGoodList += "<div class=\"goods_text_three\">";
                   myGoodList += "<span class=\"goods_title\">下线时间:</span>";
                   var formattime = formatUnixtimestamp(array[i].logoutTime);
                   myGoodList += "<span class=\"goods_title2\" >"+formattime+"</span>";
                   myGoodList += "</div>";
                   myGoodList += "</div>";
                   myGoodList += "</div>";
                   myGoodList += "</li>";
               }
               myGoodList += "</ul>";
               $("#goodsListTable").html(myGoodList);
           }
       })

    /*原网站使用solor进行全局搜索*/
    /*$.scsd.Table.query("itemLists", obj);*/
}

//横向列表渲染
var itemQueryRender = function (rowData, key, rowNum, colNum) {
    //根据分类拼装拍品标题
    var itemTitle = getItemTitle(rowData.glideMark, rowData.authorName, rowData.itemAge, rowData.itemName)

    if (key == 'itemName') {
        return "<span class='pop_pic_children'><a target='_blank' href=" + baseUrl + '/jsp/ecp/public/auction.jsp?lotid=' + rowData.lotId + ">"
            + itemTitle + "</a></span>";
    }
    if (key == 'crrntPrice') {
        return rowData.crrntPrice;
    }
    if (key == 'itemPicPath') {
        return "<img src='" + rowData.itemPicPath + "_s.jpg' height='100px' width='100px'/>";
        //return "<img src='" + rowData.itemPicPath + ".jpg' height='100px' width='100px'/>";

    }
    if (key == 'secondCatgId') {
        return rowData.firstCatgName;
    }
    if (key == 'bidCount') {
        return rowData.bidCount;
    }
    if (key == 'lotEndTime') {
        return rowData.lotEndTime;
    }
    return rowData[key];
}
//纵向渲染
var itemListsQueryRender = function (rowData, key, rowNum, colNum) {
    //根据分类拼装拍品标题
    var itemTitle = getItemTitleNoGlideMark(rowData.authorName, rowData.itemAge, rowData.itemName);
    var _bidnum = rowData.bidCount;
    if (_bidnum == null || _bidnum == "" || _bidnum == undefined) {
        _bidnum = 0;
    }

    var str;
    if (_bidnum > 0) {
        str = $(" <div class='item_des_Img_div'>" +
            " <img class='itemImg' onload='autoImgSize(this,260,248,false)'  src='" + rowData.itemPicPath + "_s.jpg' />" +
            //" <img class='itemImg' onload='autoImgSize(this,260,248,false)'  src='" + rowData.itemPicPath + ".jpg' />" +
            "  </div>" +
            "  <div class='item_des_text_wrap'>" +
            " <div class='item_des_text_two' title='" + itemTitle + "'>" + itemTitle + "</div>" +
            "  <div class='item_des_text_one'>" +
            " <div class='item_des_text_one_left'>" +
            "  <span class='item_des_title'>当前价:</span>" +
            "  <span class='item_des_detail'>￥" + rowData.crrntPrice + "</span>" +
            " </div>" +
            "<div class='item_des_text_one_rig'>" +
            "<div class='item_bid_icon'>" +
            "<div class='item_bid_num' style='display: none;'>" + _bidnum + "</div>" +
            "<img src='" + baseUrl + "/image/ecp/up.gif' class='item_bid_icon_img'/>" +
            "</div>" +
            "<div class='item_des_title_1' style='display: none;'>出价次数:</div>" +
            " </div>" +
            " </div>" +
            " <div class='item_des_text_three'>" +
            "<span class='item_des_title'>下线时间:</span>" +
            "<span class='item_des_title_2'> " + new Date(rowData.lotEndTime).format("yyyy-MM-dd hh:mm:ss") + "</span>" +
            "</div>" +
            "</div>");
    } else {
        str = $(" <div class='item_des_Img_div'>" +
            " <img class='itemImg' onload='autoImgSize(this,260,248,false)'  src='" + rowData.itemPicPath + "_s.jpg' />" +
            //" <img class='itemImg' onload='autoImgSize(this,260,248,false)'  src='" + rowData.itemPicPath + ".jpg' />" +
            "  </div>" +
            "  <div class='item_des_text_wrap'>" +
            " <div class='item_des_text_two' title='" + itemTitle + "'>" + itemTitle + "</div>" +
            "  <div class='item_des_text_one'>" +
            " <div class='item_des_text_one_left'>" +
            "  <span class='item_des_title'>当前价:</span>" +
            "  <span class='item_des_detail'>￥" + rowData.crrntPrice + "</span>" +
            " </div>" +
            "<div class='item_des_text_one_rig'>" +
            "<div class='item_bid_icon' style='display: none'>" +
            "<div class='item_bid_num' style='display: none'>" + _bidnum + "</div>" +
            "</div>" +
            "<div class='item_des_title_1' style='display: none'>出价次数:</div>" +
            " </div>" +
            " </div>" +
            " <div class='item_des_text_three'>" +
            "<span class='item_des_title'>下线时间:</span>" +
            "<span class='item_des_title_2'> " + new Date(rowData.lotEndTime).format("yyyy-MM-dd hh:mm:ss") + "</span>" +
            "</div>" +
            "</div>");
    }

    if (getplatformPORM()=="pc" || getbrowsename()=="safari")
    {
        $(str[0]).bind("click", function () {
            //putstatusText();
            //window.location.href = baseUrl + "/jsp/ecp/public/auction.jsp?lotid=" + rowData.lotId;
            window.open(baseUrl + "/jsp/ecp/public/auction.jsp?lotid=" + rowData.lotId);
        });
    }
    else
    {
        $(str[0]).bind("click", function () {
            putstatusText();
            window.location.href = baseUrl + "/jsp/ecp/public/auction.jsp?lotid=" + rowData.lotId;
        });
    }

    return str;
}

function putstatusText()
{
    var schtempString = $(".conditionLists_left").html();
    //alert(schtempString)
    //var ultemp = document.getElementById("ulFilterCondition")
    //alert(ultemp.innerHTML)
    var temlflag= $.scsd.Table.getTableQueryId("itemLists") + "-JDP-"
        + $.scsd.Table.getTableFilerStr("itemLists") + "-JDP-"
        + $.scsd.Table.getTablePageStr("itemLists") + "-JDP-"
        + $(".tabUnderlineHeaderItemSelectedCls").attr("id") + "-JDP-"
        + schtempString;
    $("#recstatus").val(temlflag);
    //alert($("#recstatus").val());
    //var ss=$("#recstatus").val().split("-JDP-");
    //alert(ss[0]);
    //alert(ss[1]);
    //alert(ss[2]);
    //alert(ss[3]);
    //alert(ss[4]);
    //alert(ss[5]);
}


var lastDownBtn = {
    html: '最近下线',
    type: "query",
    func: function (rowDataMap, rowNum) {

    }
}
var topBtnArr = [lastDownBtn];

/**
 * 右上方搜索框输入后查询
 */
function doSolrQuery() {
    queryTable();
}
function updateCss(u) {
    $(".itemCondition_ul_change").attr('class', 'itemCondition_ul_condition');
    $(".flag").css('display', 'block');
    $("." + u).css('display', 'none');
    $(".moreContent").css('display', 'none');
    $("#" + u).attr('class', 'itemCondition_ul_change');
    $("#div" + u).css('display', 'block');
}
function sureButton(u) {
    //添加查询条件到下面显示
    var _content = $(u).prev().val();
    var _title = $(u).parent().parent().find(".title").text();
    var objId;
    if (_title == '专场') {
        objId = "srName";
    }
    if (_title == '年代') {
        objId = "itemAge";
    }
    if (_title == '质地') {
        objId = "material";
    }
    if (_title == '形式') {
        objId = "style";
    }
    if (_title == '作者') {
        objId = "authorName";
    }
    var _conDiv = $("<div class=\"conditdetail_wrap cond_value\"><div class=\"cond_title\">" + _title + "</div><div class=\"cond_cont\">" + "<span id='" + objId + "'>" + _content + "</span>" + "</div><div class=\"cond_close\" onclick='doCloseCond(this)'>X</div>");
    var _sureBtnLen = $('.conditionLists_left .cond_sure_btn').length;
    if (_sureBtnLen > 0) {
        $('.conditionLists_left .cond_sure_btn').parent().before(_conDiv);
    } else {
        $(".conditionLists_left").append(_conDiv);
    }
    $(u).parent().parent().attr("class", "itemCondition_ul_condition");
    $(u).parents(".itemCondition_ul_condition").hide();
    //当鼠标经过关闭按钮时，样式发生改变
    $(".cond_close").each(function (i, item) {
        var _this = this;
        $(_this).hover(function () {
            $(_this).addClass("cond_close_activity");
            $(_this).parent().addClass("cond_parent_activity");
        }, function () {
            $(_this).removeClass("cond_close_activity");
            $(_this).parent().removeClass("cond_parent_activity");
        });
    });
    //当点击关闭条件时 ，关闭查询条件，同时恢复样式
    //$(".cond_close").each(function (i, item) {
    //    $(".cond_close").bind("click", function () {
    //        var _this = this;
    //        var _title = $(this).parent().find(".cond_title").text();
    //        $(".itemCondition_ul_condition .itemCondition_ul_text_left").each(function (i, item) {
    //            if (_title == $(item).text()) {
    //                $(item).parent().show();
    //                $(item).parent().find(".moreContent").hide();
    //                $(item).parent().find(".flag").show();
    //                return false;
    //            }
    //        });
    //        $(_this).parent().remove();
    //        //判断是否需要显示确定按钮
    //        ItemQueryList.isShowSureBtn();
    //
    //    });
    //});

}

function showprice() {

    var tsnum = /^\d*$/;
    var il_sp=$("#startprice").val();
    var il_ep=$("#endprice").val();
    il_sp=$.trim(il_sp);
    il_ep=$.trim(il_ep);
    if (il_sp=="" && il_ep=="")
    {
        ecpBase.alert("起始价格和截止价格不能全为空")
        return false;
    }

    if (!tsnum.test(il_sp) || !tsnum.test(il_ep))
    {
        ecpBase.alert("您输入的价格必须是正整数或不是数字!")
        return false;
    }

    if (il_sp != "")
    {
        il_sp=parseInt(il_sp,10).toString(10);
    }

    if (il_ep != "")
    {
        il_ep=parseInt(il_ep,10).toString(10);
    }

    if ( il_sp  && il_ep != "")
    {
        var temp_price="";
        if (parseInt(il_ep,10) < parseInt(il_sp,10))
        {
            temp_price=il_sp;
            il_sp=il_ep;
            il_ep=temp_price;
            $("#startprice").val(il_sp);
            $("#endprice").val(il_ep);
        }
    }

    var _til=$("#cf_price").parent().parent().find(".title").text();
    //event.stopPropagation(); 防止冒泡事件

    ////添加查询条件到下面显示
    var _ctext = "0-500";
    if ($.trim(il_sp)=="")
    {
        _ctext="0-"+il_ep;
    }

    if ($.trim(il_ep)=="")
    {
        _ctext=il_sp+"-...";
    }

    if ($.trim(il_sp)!="" && $.trim(il_ep) != "")
    {
        _ctext= il_sp+"-" + il_ep;
    }
     var objId = "crrntPrice";
     var _conDiv = $("<div class=\"conditdetail_wrap cond_value\"><div class=\"cond_title\">" + _til +"</div><div class=\"cond_cont\">" + "<span id='" + objId + "'>" + _ctext + "</span>" + "</div><div class=\"cond_close\" onclick='doCloseCond(this)'>X</div>");
    $(".conditionLists_left").append(_conDiv);

    $("#cf_price").parent().parent().attr("class", "itemCondition_ul_condition");
    $("#cf_price").parents(".itemCondition_ul_condition").hide();

    //当鼠标经过关闭按钮时，样式发生改变
    $(".cond_close").each(function (i, item) {
        var _this = this;
        $(_this).hover(function () {
            $(_this).addClass("cond_close_activity");
            $(_this).parent().addClass("cond_parent_activity");
        }, function () {
            $(_this).removeClass("cond_close_activity");
            $(_this).parent().removeClass("cond_parent_activity");
        });
    });

    //当点击关闭条件时 ，关闭查询条件，同时恢复样式
    //$(".cond_close").each(function (i, item) {
    //    $(".cond_close").bind("click", function () {
    //
    //        var _this = this;
    //        var _title = $(this).parent().find(".cond_title").text();
    //
    //        $(".itemCondition_ul_condition .itemCondition_ul_text_left").each(function (i, item) {
    //
    //            if (_title == $(item).text()) {
    //                $(item).parent().show();
    //                $(item).parent().find(".moreContent").hide();
    //                $(item).parent().find(".flag").show();
    //                return false;
    //            }
    //        });
    //        $(_this).parent().remove();
    //        //判断是否需要显示确定按钮
    //        ItemQueryList.isShowSureBtn();
    //
    //    });
    //});

    queryTable();

}






$(function () {
    $("#showhStyle").hide();
    $("#showwStyle").hide();

    if (getplatformPORM()=="pc")
    {
        showPagedata()
    }
    else {

        if ($.trim($("#recstatus").val())=="") {
            showPagedata()
        }
        if ($.trim($("#recstatus").val())!= "") {

            //初始化绑定条件点击事件
            ItemQueryList.bindData();
            ItemQueryList.initBindEvent();

            var tmpstr=$.trim($("#recstatus").val());
            var tmparrstr= tmpstr.split("-JDP-");

            $(".conditionLists_left").html("")
            $(".conditionLists_left").html(tmparrstr[4])

            $(".conditdetail_wrap .cond_cont").each(function (i, item) {
                //alert($(item).find("span").eq(0).attr("id"));
                hideConditionRow($(item).find("span").eq(0).attr("id"))
            });
            onSelectForBack(tmparrstr[3]);
            $.scsd.Table.gotoSpecifyPage("itemLists",tmparrstr[0],tmparrstr[1],tmparrstr[2]);
            $("#recstatus").val("");
        }

    }

})

function showPagedata() {
    setQueryTitle();
    //初始化绑定条件点击事件
    ItemQueryList.bindData();
    ItemQueryList.initBindEvent();

    if (search_key != null && search_key != "") {
        $("#keywordInput").val(search_key)
        var obj = {"itemName": search_key, "timeFlag": "all"};
        $.scsd.Table.query("itemLists", obj);
    } else {
        ItemQueryList.doQuery();	 //查询表格
    }
}

function setQueryTitle() {
    var titleStr = '<a id="titleHrefCls"  href="javascript:jumpTitle(\'' + $("#l1Id").val() + '\',\'' + $("#l1Id").val() + '\',\'' + $("#l1Text").val() + '\',\'\',\'\',\'1\');">' + $("#l1Text").val() + '</a>';
    if ($("#l2Id").val() != "") {
        titleStr += ' > ' + $("#l2Text").val();
    } else {
        titleStr = ' ' + $("#l1Text").val();
    }
    $("#queryTitle").html(titleStr);
    //alert($("#queryTitle").html())
}

function jumpTitle(_id, _l1Id, _l1Text, _l2Id, _l2Text, _lev) {
    var setting = {
        "action": baseUrl + "/jsp/ecp/item/manage/itemquerylist.jsp",
        "datas": [{"name": "categoryId", "value": _id},
            {"name": "l1Id", "value": _l1Id},
            {"name": "l1Text", "value": _l1Text},
            {"name": "l2Id", "value": _l2Id},
            {"name": "l2Text", "value": _l2Text},
            {"name": "lev", "value": _lev}],
        "target": "_self"
    };
    simulateFormSubmit(setting);
}

/**
 * 点击首页跳转
 * @returns
 */
function doClickIndex() {
    window.location = baseUrl + "/index.jsp";
}

/**
 * 查询条件 全部  未结束拍品  已结束拍品
 */
function onSelect(u, flag) {
    $(".tabUnderlineHeaderItemSelectedCls").removeClass("tabUnderlineHeaderItemSelectedCls");
    $(u).addClass("tabUnderlineHeaderItemSelectedCls");
    $(u).removeClass("tabUnderlineHeaderItemUnSelectedCls");
    queryTable();
}

/**
 * 查询条件为手机端回退用 全部  未结束拍品  已结束拍品
 */
function onSelectForBack(objid) {
    $(".tabUnderlineHeaderItemSelectedCls").removeClass("tabUnderlineHeaderItemSelectedCls");
    $("#"+ objid).addClass("tabUnderlineHeaderItemSelectedCls");
    $("#"+ objid).removeClass("tabUnderlineHeaderItemUnSelectedCls");
}



//横向列表展示
function showwidthlist() {
    $("#showhStyle").show();
    $("#showwStyle").hide();
    $.scsd.Table.createTable({
        id: "itemLists",
        queryId: "itemListsQuery",
        autoLoad: false,
        width: "100%",
        render: "itemQueryRender"
    }, function () {
        queryTable();
    });
}
//纵向列表展示
function showheightlist() {
    $("#showhStyle").hide();
    $("#showwStyle").show();
    $.scsd.Table.createTable({
        id: "itemLists",
        queryId: "itemListsQuery",
        autoLoad: false,
        operArr: "topBtnArr",
        columnLayout: "5*4",
        width: "100%",
        render: "itemListsQueryRender"
    }, function () {
        queryTable();
    });
}

/*格式化时间：将乱码的格式转成正常格式*/
function formatUnixtimestamp (timestamp) {
    var d = new Date(timestamp);
    var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return times;
}

/*鼠标移入商品的li中，添加边框颜色*/
function addBorder(a) {
    /*a.removeClass(".sudokuDivCls")
    a.addClass(".sudukuDivMOCLs")*/
    a.style.cssText="border:2px solid #ec1541;padding:0px";

}
function removeBorder(a) {

    a.style.cssText="border: 1px solid #e4e4e4;padding:1px";

}

/*点击首页导航条的一级目录是根据此一级目录刷新页面*/
function toList(a) {
    var info = a.innerHTML;
    location.href="index.html?list="+info;
}
 