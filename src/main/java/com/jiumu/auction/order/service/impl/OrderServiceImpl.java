package com.jiumu.auction.order.service.impl;

import com.jiumu.auction.order.mapper.OrderMapper;
import com.jiumu.auction.order.po.TbOrder;
import com.jiumu.auction.order.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private OrderMapper orderMapper;
    @Override
    public void addOrder(Long userId, Long goodsId,Long price) {
        TbOrder order=new TbOrder();
        order.setOrderUserId(userId);
        order.setOrderGoodsId(goodsId);
        //获得当前时间
        Date date=new Date();
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format1 = format.format(date);
        //添加提交时间
        Timestamp timestamp = Timestamp.valueOf(format1);
        order.setOrderTime(timestamp);
        //添加是否提交订单和付款状态
        order.setPaymentStatus("1");
        order.setOrderJudge("否");
        //当前时间的毫秒数是订单号
        long time = timestamp.getTime();
        order.setOrderNo(time+"");
        order.setFreight(10);
        order.setSeller("上海嘉德在线拍卖");
        order.setStockStatus("虚拟库");
        order.setPremiums(1);
        order.setAnyCertificate("no");
        order.setTotalPrice(1000);
        //添加成交价格
        order.setTransactionPrice(price);
        orderMapper.addOrder(order);
    }
}
