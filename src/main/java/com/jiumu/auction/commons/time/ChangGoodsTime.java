package com.jiumu.auction.commons.time;

import com.jiumu.auction.dataile.service.IGoodsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.TimerTask;
@Component
public class ChangGoodsTime extends TimerTask {

    private Timestamp timestamp;
    private Long goodsId;
    //构造函数引入被修改时间和商品id
    public ChangGoodsTime(Timestamp timestamp,Long goodsId){
        this.timestamp=timestamp;
        this.goodsId=goodsId;
    }
    public ChangGoodsTime(){}
    @Override
    public void run() {
        //修改数据库中的时间
        IGoodsService goodsServiceImpl= (IGoodsService) Ser.getBean("goodsServiceImpl");
        goodsServiceImpl.updateGoodsAuctionDeadline(timestamp,goodsId);
    }
}
