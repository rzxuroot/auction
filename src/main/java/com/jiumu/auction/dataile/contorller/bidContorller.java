package com.jiumu.auction.dataile.contorller;

import com.google.gson.Gson;
import com.jiumu.auction.dataile.po.TbAccount;
import com.jiumu.auction.dataile.po.TbUser;
import com.jiumu.auction.dataile.service.IBidService;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;
import com.jiumu.auction.dataile.vo.JsonResult;
import com.jiumu.auction.myAuction.service.IAuctionService;
import io.goeasy.GoEasy;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/bid")
public class bidContorller {
    @Autowired
    private IBidService bidServiceImpl;
    @Autowired
    private IGoodsService goodsServiceImpl;
    @Autowired
    private IAuctionService auctionServiceImpl;
    private Logger logger= Logger.getLogger(bidContorller.class);
    @RequestMapping("/isBidder")
    @ResponseBody
    public JsonResult isBid(String price,String goodsId,HttpServletResponse resp) {
        float curPrice=0;
        if (price!=null){
            curPrice=Float.parseFloat(price);
        }
        Long id=0L;
        if (goodsId!=null){
            id=Long.parseLong(goodsId);
        }
        TbUser tbUsers=new TbUser();
        tbUsers.setUserId(1);
        SecurityUtils.getSubject().getSession().setAttribute("user",tbUsers);
        //创建jsong对象
        JsonResult jsonResult=new JsonResult();
        //从session中获取登录对象
        TbUser user = (TbUser) SecurityUtils.getSubject().getSession().getAttribute("user");
        long userId = user.getUserId();
        //判断是否登录
        if(user==null){
            //如果没有登录返回code为零
            jsonResult.setCode(0);
            jsonResult.setMsg("请先登录再提交价格");
        }else {
            //如果登录则对比保证金额度
                //获取用户id

            //根据用户id查询用户账户对象
            TbAccount account = bidServiceImpl.queryAccountByUserId(userId);
            //获取可用保证金额度
            float availableMarginLimit = (float) (account.getAvailableMarginLimit()/100.00);
            //logger.info("保证金额度："+availableMarginLimit+"----"+"传入金额"+curPrice);
            //判断当前提交的价格是否超过保证金额度
            if (curPrice>=availableMarginLimit){
                //如果价格超过保证金额度则返回code为1
                jsonResult.setCode(1);
                jsonResult.setMsg("账户保证金不足");
            }else{

                jsonResult = bidServiceImpl.MarginDeduction(userId, curPrice, id);
                logger.info("json:"+jsonResult);

                if (jsonResult.getCode()==5){
                    Date date=new Date();
                    //测试阶段goodsId先用1表示
                    bidServiceImpl.pushTime(date,1l,resp);
                    bidServiceImpl.addHistorical(userId, curPrice, id);
                    //测试阶段商品id先用1表示
                    auctionServiceImpl.addMyAuction(curPrice,userId,1l);
                }
                List<HistoricalPriceVO> historicalPriceVOS = goodsServiceImpl.queryHistoricalPriceByGoodsId(id);
                Gson gson=new Gson();
                String hisJson = gson.toJson(historicalPriceVOS);


                GoEasy goEasy=new GoEasy("http://rest-hangzhou.goeasy.io", "BC-82d3f7de164e46ce9347b04494a76336");
                goEasy.publish("zgj",hisJson);
                try {
                    resp.getWriter().println("<xml>\n" +
                            "\n" +
                            "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
                            "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                            "</xml>");
                    resp.reset();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return jsonResult;
    }
}
