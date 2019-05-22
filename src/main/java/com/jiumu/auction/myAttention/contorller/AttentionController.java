package com.jiumu.auction.myAttention.contorller;

import com.jiumu.auction.myAttention.service.IAttentionService;
import com.jiumu.auction.myAttention.vo.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/attention")
@ResponseBody
public class AttentionController {
    @Autowired
    private IAttentionService attentionServiceImpl;
    @RequestMapping("/addAttention")
    public JsonResult addAttention(String goodsId){
        Long id=0l;
        if (goodsId!=null){
            id=Long.parseLong(goodsId);
        }
        JsonResult jsonResult = attentionServiceImpl.addAttention(id);
        System.out.println("关注商品的json;"+jsonResult);
        return jsonResult;

    }
    @RequestMapping("/deleteAttention")
    public void deleteAttention(String goodsId){
        Long id=0l;
        if (goodsId!=null){
            id=Long.parseLong(goodsId);
        }
        attentionServiceImpl.deleteAttention(id);
    }
}
