package com.jiumu.auction.userCenter.service.impl;

import com.jiumu.auction.user.bean.JsonResult;
import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.dao.UserMapper;
import com.jiumu.auction.user.utils.MD5Utils;
import com.jiumu.auction.userCenter.dao.*;
import com.jiumu.auction.userCenter.po.TbOrder;
import com.jiumu.auction.userCenter.service.IUserCenterService;
import com.jiumu.auction.userCenter.vo.MyAccount;
import com.jiumu.auction.userCenter.vo.MyAuction;
import com.jiumu.auction.userCenter.vo.MyClinch;
import com.jiumu.auction.userCenter.vo.MyOrderAndPrice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class UserCenterServiceImpl implements IUserCenterService {
    @Autowired
    private MyOrderMapper myOrderMapper;
    @Autowired
    private MyAuctionMapper myAuctionMapper;
    @Autowired
    private MyClinchMapper myClinchMapper;
    @Autowired
    private MyOrderAndPriceMapper myOrderAndPriceMapper;
    @Autowired
    private PayMapper payMapper;
    @Autowired
    private UserMapper userMapper;
    /*查询该用户的ID*/
    @Override
    public Long userId(HttpSession session) throws Exception{

        String user = (String) session.getAttribute("user");
        if(user==null){
            throw new Exception();
        }
        TbUser tbUser = userMapper.selectUserByName(user);
        long userId = tbUser.getUserId();
        return userId;
    }

    @Override
    public List queryOrderByUserId(Long userId,String statusId) {
        List<TbOrder> orderList = myOrderMapper.queryOrderByUserId(userId,statusId);
        return orderList;
    }

    @Override
    public List<MyAuction> queryMyAuctionList(Long userId) {
        List<MyAuction> myAuctionList = myAuctionMapper.queryMyAuctionList(userId);
        return myAuctionList;
    }

    @Override
    public List<MyClinch> queryMyClinchByUserId(Long userId, String statusId) {
        List<MyClinch> myClinchList = myClinchMapper.queryMyClinchByUserId(userId, statusId);
        return myClinchList;
    }

    @Override
    public void updateClinch(String orderNo) throws Exception{
        if(orderNo==null){
           throw new Exception();
        }else {
            String s =orderNo.replace("orderNo%5B%5D=","");
            String[] split = s.split("&");
            for(String string : split){
                myClinchMapper.updateClinch(string);
            }
        }

    }

    @Override
    public MyOrderAndPrice queryMyOrderAndPrice(Long userId, Long orderId) {
        MyOrderAndPrice myOrderAndPrice = myOrderAndPriceMapper.queryMyOrderAndPrice(userId, orderId);
        return myOrderAndPrice;
    }
    //支付
    @Override
    public JsonResult pay(Long userId, Long orderId,String password) {
        JsonResult jsonResult = new JsonResult();
        //查询密码是否正确
        MyAccount myAccount = payMapper.queryAccountPassword(userId);
        String md5 = MD5Utils.md5(password, myAccount.getUserName());
        //判断密码是否正确
        if(!myAccount.getAccountPassword().equals(md5)){
            jsonResult.setCode(0);
            jsonResult.setMsg("密码错误");
            return jsonResult;
        }
        MyOrderAndPrice myOrderAndPrice = queryMyOrderAndPrice(userId, orderId);
        long accountBalance = myOrderAndPrice.getAccountBalance();
        long totalPrice = myOrderAndPrice.getTotalPrice();
        long balance = accountBalance-totalPrice;
        if(balance<0){
            jsonResult.setCode(0);
            jsonResult.setMsg("账户余额不足，请充值");
        }else {
            //修改订单状态为2
            payMapper.updatePaymentStatus(orderId);
            //修改用户余额
            payMapper.updateAccountBalance(userId,balance);
            jsonResult.setCode(1);
            jsonResult.setMsg("支付成功");
        }
        return jsonResult;
    }

}
