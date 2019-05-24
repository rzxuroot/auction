package com.jiumu.auction.recharge.service.impl;

import com.jiumu.auction.github.wxpay.sdk.MyWxPayConfig;
import com.jiumu.auction.github.wxpay.sdk.WXPay;
import com.jiumu.auction.recharge.service.IWxPayService;
import com.jiumu.auction.recharge.vo.PayInfo;
import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.dao.UserMapper;
import com.jiumu.auction.userCenter.dao.PayMapper;
import com.jiumu.auction.userCenter.service.impl.UserCenterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
@Service
public class WxPayServiceImpl  implements IWxPayService {
    @Autowired
    private UserCenterServiceImpl userCenterService;
    @Autowired
    private PayMapper payMapper;
    @Override
    public String orderWx(PayInfo payInfo,String baseURL,HttpSession session) {
        MyWxPayConfig payConfig = new MyWxPayConfig();
        try {

            WXPay wxPay = new WXPay(payConfig);
            //下单
            Map<String, String> data = new HashMap<String, String>();
            //商品名称
            data.put("body", "千锋Java培训"); //商品标题
            //订单号：不能重复
            data.put("out_trade_no", payInfo.getInfoNo());
            //web项目
            data.put("device_info", "WEB");
            //人民币
            data.put("fee_type", "CNY");
            //金额
            data.put("total_fee", "1");//单位是分
            //用户IP
            data.put("spbill_create_ip", "123.12.12.123");//终端IP地址
            //重点：回调地址，用来通知支付结果的地址
            Long userId = userCenterService.userId(session);
            String string = userId.toString();
            data.put("attach",string);
            data.put("notify_url", baseURL+"/recharge/notify");
            data.put("trade_type", "NATIVE");  // 此处指定为扫码支付
            data.put("product_id", "16");

            //返回值：下单成功之后的支付地址
            //下单，下单完成之后，会返回一个支付短链接
            Map<String, String> order = wxPay.unifiedOrder(data);
            System.out.println(order.get("code_url"));

            //返回支付短链接
            return order.get("code_url");

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
    //查询当前账户的余额
    @Override
    public void updateAccountBalance(long userId,long recharge) {
        //查询当前用户余额
        long accountBalance = payMapper.queryAccountBalance(userId);
        //添加余额
        long price = accountBalance+recharge;
        payMapper.updateAccountBalance(userId,price);
    }




}
