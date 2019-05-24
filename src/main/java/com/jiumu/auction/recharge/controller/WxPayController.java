package com.jiumu.auction.recharge.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.jiumu.auction.github.wxpay.sdk.WXPayUtil;
import com.jiumu.auction.recharge.service.impl.WxPayServiceImpl;
import com.jiumu.auction.recharge.vo.PayInfo;
import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.dao.UserMapper;
import com.jiumu.auction.userCenter.service.impl.UserCenterServiceImpl;
import io.goeasy.GoEasy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import java.util.Date;
@CrossOrigin
@RequestMapping("/recharge")
@Controller
public class WxPayController {
    @Autowired
    private WxPayServiceImpl wxPayService;

    /**
     * 下单
     * @param response
     */
    @RequestMapping("/orderwx")
    public void createQRCode(HttpServletResponse response,String baseURL,HttpSession session){
        //二维码需要包含的文本内容
        Random random = new Random();

        PayInfo payInfo = new PayInfo();
        payInfo.setInfoName("充值");
        SimpleDateFormat sfDate = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String strDate = sfDate.format(new Date());
        //得到17位时间如：20170411094039080
        payInfo.setInfoNo(strDate);
        payInfo.setInfoPrice(1);
        String url = wxPayService.orderWx(payInfo,baseURL,session);
//        String uri = "http://www.baidu.com";
        HashMap<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
        //边距
        hints.put(EncodeHintType.MARGIN, 2);
        try {
            //200标识二维码图片的大小
            BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, 200, 200, hints);
            //将生成的图片写入网络输出流
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", response.getOutputStream());
            System.out.println("创建二维码完成");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    @RequestMapping("/notify")
    public void receiveWxPlatformMessage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ServletInputStream inputStream = request.getInputStream();
        StringBuilder builder = new StringBuilder();
        byte[] buffer = new  byte[1024];
        int i=0;
        while ((i=inputStream.read(buffer)) != -1){
            System.out.println(new String(buffer,0,i));
            builder.append(new String(buffer,0,i));
        }

        try {
            Map<String, String> xmlToMap = WXPayUtil.xmlToMap(builder.toString());
            //修改订单状态和扣除冻结金额
            String string = xmlToMap.get("out_trade_no");
            String id = xmlToMap.get("attach");
            Long user = Long.parseLong(id) ;
            long price = 100;
            wxPayService.updateAccountBalance(user,price);

        } catch (Exception e) {
            e.printStackTrace();
        }
        //通知用户支付成功
        GoEasy goEasy = new GoEasy("http://rest-hangzhou.goeasy.io", "BC-82d3f7de164e46ce9347b04494a76336");
        //参数：频道
        goEasy.publish("java1808", "1");

        //返回参数：告知微信我收到消息了
        response.getWriter().println("<xml>\n" +
                "\n" +
                "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
                "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                "</xml>");

    }

}
