package com.jiumu.auction.index.controller;

import com.jiumu.auction.index.VO.GoodsAndPageVO;
import com.jiumu.auction.index.VO.GoodsVO;
import com.jiumu.auction.index.VO.PageVO;
import com.jiumu.auction.index.info.ConditionInfo;
import com.jiumu.auction.index.info.GoodsFilterInfo;
import com.jiumu.auction.index.info.JsonResult;
import com.jiumu.auction.index.service.IGoodsService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/queryGoods")
//查询商品的controller
public class QueryGoodsController {

    @Autowired
    private IGoodsService goodsService;
    //首页1通过列表的id查询商品,废
    @RequestMapping(value = "/list/{listId}",method = RequestMethod.GET)
    public List<GoodsVO> queryGoodsByListId(@PathVariable("listId") Integer listId){
        List<GoodsVO> goodsVOList = goodsService.queryGoodsByListId(listId);
        return goodsVOList;
    }

    //通过首页1的目录id查询商品，废
    @RequestMapping(value = "/content/{contentId}",method = RequestMethod.GET)
    public List<GoodsVO> queryGoodsByContentId(@PathVariable("contentId") Integer contentId){
        List<GoodsVO> goodsVOList = goodsService.queryGoodsByContentId(contentId);
        return goodsVOList;
    }

    //通过分类表4多条件查询商品,参数为封装好的对象(传入对象封装)
    @RequestMapping("/query")
    @ResponseBody
    public GoodsAndPageVO queryGoodsByConditions(GoodsFilterInfo goodsFilterInfo){
        //通过？传值，未中文乱码，需要使用utf-8重新编码
        //此处进行try-catch后如果出现异常怎么办？需不需要交给全局异常管理来处理
        try {
            if (goodsFilterInfo.getContentName() != null) {
                String contentName = URLDecoder.decode(goodsFilterInfo.getContentName(), "UTF-8");
                goodsFilterInfo.setContentName(contentName);
            }
            if (goodsFilterInfo.getListName() != null) {
                String listName = URLDecoder.decode(goodsFilterInfo.getListName(), "UTF-8");
                goodsFilterInfo.setListName(listName);
            }

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        //英文如果有乱码，后台就取不到数据,转码后将对对象传到service层
        GoodsAndPageVO goodsAndPageVO = goodsService.queryGoodsAndPageByFilter(goodsFilterInfo);
        return goodsAndPageVO;
    }

    //获得分页的信息
    @RequestMapping("/querypage")
    @ResponseBody
    public PageVO queryPageByConditions(Model model, GoodsFilterInfo goodsFilterInfo){
        //通过？传值，未中文乱码，需要使用utf-8重新编码
        //此处进行try-catch后如果出现异常怎么办？需不需要交给全局异常管理来处理
        try {
            if (goodsFilterInfo.getContentName() != null) {
                String contentName = URLDecoder.decode(goodsFilterInfo.getContentName(), "UTF-8");
                goodsFilterInfo.setContentName(contentName);
            }
            if (goodsFilterInfo.getListName() != null) {
                String listName = URLDecoder.decode(goodsFilterInfo.getListName(), "UTF-8");
                goodsFilterInfo.setListName(listName);
            }

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        //英文如果有乱码，后台就取不到数据
        PageVO pageVO = goodsService.queryPageInfo(goodsFilterInfo);
        return pageVO;
    }

}
