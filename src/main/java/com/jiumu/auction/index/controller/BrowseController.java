package com.jiumu.auction.index.controller;

import com.jiumu.auction.index.info.BrowerInfo;
import com.jiumu.auction.index.info.JsonResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/browse")
public class BrowseController {

    @RequestMapping(value = "/add",method = RequestMethod.GET)
    public JsonResult addBrowse(Integer id){
        //获得用户id

        //获得商品id

        //将浏览记录添加到数据库中
       /* BrowerInfo browerInfo = new BrowerInfo();
        browerInfo.setGoodsId(goodsId);
        browerInfo.setUsername(null);*/
        JsonResult jsonResult = new JsonResult();
        jsonResult.setCode(1);
        jsonResult.setMsg(id+"");
        return jsonResult;
    }
}
