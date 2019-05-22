package com.jiumu.auction.commons.time;

import com.jiumu.auction.myAuction.service.IAuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.TimerTask;
@Component
public class Timing extends TimerTask {

    //构造函数引入商品id
    private Long goodsId;
    public Timing(Long goodsId){
        this.goodsId=goodsId;
    };
    public Timing(){

    }
    @Override
    public void run() {
        IAuctionService auctionServiceImpl= (IAuctionService) Ser.getBean("auctionServiceImpl");
        //修改竞拍状态
        auctionServiceImpl.updateMyAuction(goodsId);
    }
}
