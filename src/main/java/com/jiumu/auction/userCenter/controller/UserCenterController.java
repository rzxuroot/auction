package com.jiumu.auction.userCenter.controller;

import com.jiumu.auction.user.bean.JsonResult;
import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.service.Impl.UserServiceImpl;
import com.jiumu.auction.userCenter.service.impl.UserCenterServiceImpl;
import com.jiumu.auction.userCenter.vo.MyAuction;
import com.jiumu.auction.userCenter.vo.MyClinch;
import com.jiumu.auction.userCenter.vo.MyOrderAndPrice;
import com.sun.org.apache.xpath.internal.operations.Mod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/userCenter")
public class UserCenterController {
    @Autowired
    private UserCenterServiceImpl userCenterService;
    @Autowired
    private UserServiceImpl userService;




    /*通过用户来查询订单信息*/
    @RequestMapping("/myorder")
    public String queryOrder(Model model, HttpSession session,Integer id){
        Long userId = null;
        try {
            userId = userCenterService.userId(session);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }

        String statusId = (id == null) ? "" : id.toString();
        List orderList = userCenterService.queryOrderByUserId(userId,statusId);
        model.addAttribute("orderList",orderList);
        return "myorder.html";
    }
    //查询订单状态
    @RequestMapping("/query")
    public String queryOrder(Model model,Integer id,HttpSession session){
        Long userId = null;
        try {
            userId = userCenterService.userId(session);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        String statusId = (id == 0 ) ? "" : id.toString();
        List orderList = userCenterService.queryOrderByUserId(userId,statusId);
        model.addAttribute("orderList",orderList);
        return "myorder :: tableContentBoxCls";
    }
    //用户ID查询我的竞拍
    @RequestMapping("/auction")
    public String queryAuction(Model model,HttpSession session){
        Long userId = null;
        try {
            userId = userCenterService.userId(session);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        List<MyAuction> myAuctionList = userCenterService.queryMyAuctionList(userId);
        for (MyAuction myAuction :myAuctionList) {
            long auctionPrice = myAuction.getAuctionPrice();
            long s =auctionPrice / 100;
            myAuction.setAuctionPrice(s);
        }
        model.addAttribute("myAuctionList",myAuctionList);
        return "myauction.html";
    }

    //查询我的成交信息
    @RequestMapping("/clinch")
    public String queryMyClinch(Model model,Integer id,HttpSession session){
        Long userId = null;
        try {
            userId = userCenterService.userId(session);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        String statusId = (id == null) ? "" : id.toString();
        List<MyClinch> myClinchList = userCenterService.queryMyClinchByUserId(userId, statusId);
        model.addAttribute("myClinchList",myClinchList);
        return "myclinch";
    }
    //查询我的成交信息状态
    @RequestMapping("/clinchStatus")
    public String queryClinchStatus(Model model,Integer id,HttpSession session){
        Long userId = null;
        try {
            userId = userCenterService.userId(session);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        String statusId=(id == 3) ? "" :id.toString();
        List<MyClinch> myClinchList = userCenterService.queryMyClinchByUserId(userId, statusId);
        model.addAttribute("myClinchList",myClinchList);
        return "myclinch :: tableContentBoxCls";
    }

    //修改我的成交状态
    @RequestMapping("/updateClinch")
    @ResponseBody
    public JsonResult updateClinch(@RequestBody String orderNo){
        JsonResult jsonResult = new JsonResult();
        try {
            userCenterService.updateClinch(orderNo);
            jsonResult.setCode(1);
        } catch (Exception e) {
            e.printStackTrace();
            jsonResult.setCode(0);
        }
        return jsonResult;
    }

    //确认付款到付款界面
    @RequestMapping(value = "/payment{orderId}")
    public String queryPayment(Model model,Long orderId,HttpSession session){
        Long userId = null;
        try {
            userId = userCenterService.userId(session);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        MyOrderAndPrice myOrderAndPrice = userCenterService.queryMyOrderAndPrice(userId, orderId);
        model.addAttribute("myOrderAndPrice",myOrderAndPrice);
        return "payment";
    }
    //支付订单
    @RequestMapping(value = "/pay",method = RequestMethod.POST)
    @ResponseBody
    public JsonResult pay( Model model,Long orderNo,HttpSession session,String password){
        JsonResult jsonResult= new JsonResult();
        Long userId = null;
        try {
            userId = userCenterService.userId(session);
        } catch (Exception e) {
            e.printStackTrace();
            jsonResult.setMsg("用户丢失");
            return jsonResult;
        }
        jsonResult = userCenterService.pay(userId,orderNo,password);
        return jsonResult;
    }
}
