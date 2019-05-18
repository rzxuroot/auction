package com.jiumu.auction.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jiumu.auction.user.bean.JsonResult;
import com.jiumu.auction.user.utils.DuanxinController;
import com.jiumu.auction.user.utils.RandomUtils;
import com.jiumu.auction.user.vo.JsonVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/reg")
public class RegisterController {
    @Autowired
    private StringRedisTemplate redisTemplate;

    @RequestMapping(value = "/r/{tel}",method = RequestMethod.POST )
    public JsonResult query(@PathVariable("tel")String tel){
        JsonResult jsonResult = new JsonResult();
        String code = RandomUtils.generateStringOfNum(6);
        String s = DuanxinController.giveDuanxin(tel, code);
        System.out.println(s);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonVO jsonVO = objectMapper.readValue(s, JsonVO.class);
            String result = jsonVO.getResult();
            /*验证码成功*/
            if(result.equals("0")){
                jsonResult.setCode(1);
                jsonResult.setMsg("请在手机上查看");
                //将短信验证码存入redis
                String key = "auction-register"+tel;
                redisTemplate.boundValueOps(key).set(code,5, TimeUnit.MINUTES);
            }else {
                jsonResult.setCode(0);
                jsonResult.setMsg("失败,请联系管理员");
            }
        } catch (IOException e) {
            e.printStackTrace();
            jsonResult.setMsg("未知错误,联系管理员");
        }
        return jsonResult;
    }
}
