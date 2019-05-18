package com.jiumu.auction.dataile.contorller;

import com.jiumu.auction.dataile.po.TbAccount;
import com.jiumu.auction.dataile.po.TbUser;
import com.jiumu.auction.dataile.service.IBidService;
import com.jiumu.auction.dataile.vo.JsonResult;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/bid")
public class bidContorller {
    @Autowired
    private IBidService bidServiceImpl;

    private Logger logger= Logger.getLogger(bidContorller.class);
    @RequestMapping("/isBidder")
    @ResponseBody
    public JsonResult isBid(String price) {
        Long curPrice=0L;
        if (price!=null){
            curPrice=Long.parseLong(price);
        }
        TbUser tbUsers=new TbUser();
        tbUsers.setUserId(1);
        SecurityUtils.getSubject().getSession().setAttribute("user",tbUsers);
        //创建jsong对象
        JsonResult jsonResult=new JsonResult();
        //从session中获取登录对象
        TbUser user = (TbUser) SecurityUtils.getSubject().getSession().getAttribute("user");
        //判断是否登录
        if(user==null){
            //如果没有登录返回code为零
            jsonResult.setCode(0);
            jsonResult.setMsg("请先登录再提交价格");
        }else {
            //如果登录则对比保证金额度
                //获取用户id
            long userId = user.getUserId();
            //根据用户id查询用户账户对象
            TbAccount account = bidServiceImpl.queryAccountByUserId(userId);
            //获取保证金额度
            long totalMarginLimit = account.getTotalMarginLimit();
            logger.info("保证金额度："+totalMarginLimit+"----"+"传入金额"+curPrice);
            //判断当前提交的价格是否超过保证金额度
            if (curPrice>totalMarginLimit){
                //如果价格超过保证金额度则返回code为1
                jsonResult.setCode(1);
                jsonResult.setMsg("账户保证金不足");
            }else{
                //如果没有超过保证金额度则返回code为5
                jsonResult.setCode(5);
                jsonResult.setMsg("succeed");
            }
        }
        return jsonResult;
    }
}
