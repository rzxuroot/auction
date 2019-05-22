package com.jiumu.auction.commons.time;

import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.myAuction.service.IAuctionService;
import com.jiumu.auction.order.service.impl.OrderServiceImpl;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.sql.Timestamp;
import java.util.Date;
import java.util.TimerTask;

public class ChangeTime extends TimerTask {

    private StringRedisTemplate redisTemplate;
    private Timestamp timestamp;
    private Long goodsId;
    public ChangeTime(StringRedisTemplate redisTemplate,Timestamp timestamp,Long goodsId){
        this.redisTemplate=redisTemplate;
        this.timestamp=timestamp;
        this.goodsId=goodsId;
    }
    @Override
    public void run() {
        Date date=new Date();
        //当前时间
        long time = date.getTime();

        //缓存中的时间
        String s = redisTemplate.boundValueOps("dataileTime-" + goodsId).get();
        if(s!=null){
            Timestamp timestamp1=Timestamp.valueOf(s);
            long time2 = timestamp1.getTime();
            long l = time2 - time;
            if (l<=0){
                IGoodsService goodsServiceImpl= (IGoodsService) Ser.getBean("goodsServiceImpl");
                goodsServiceImpl.updateGoodsAuctionDeadline(timestamp1,goodsId);
                IAuctionService auctionServiceImpl= (IAuctionService) Ser.getBean("auctionServiceImpl");
                //修改竞拍状态
                auctionServiceImpl.updateMyAuction(goodsId);

                String lenderIdAndPrice = redisTemplate.boundValueOps("dataile-" + goodsId).get();
                if (lenderIdAndPrice!=null) {
                    String[] split = lenderIdAndPrice.split("\\-");
                    long redisId = Long.parseLong(split[0]);
                    float redisPrice = Float.parseFloat(split[1]);
                    long transactionPrice = (long) (redisPrice * 10);
                    OrderServiceImpl orderServiceImpl = (OrderServiceImpl) Ser.getBean("orderServiceImpl");
                    orderServiceImpl.addOrder(redisId,goodsId,transactionPrice);
                }
                boolean cancel = cancel();
            }
        }else{
            //传入的是数据库中的时间
            long time1 = timestamp.getTime();
            long l = time1 - time;
            if (l<=0){
                IAuctionService auctionServiceImpl= (IAuctionService) Ser.getBean("auctionServiceImpl");
                //修改竞拍状态
                auctionServiceImpl.updateMyAuction(goodsId);
                String lenderIdAndPrice = redisTemplate.boundValueOps("dataile-" + goodsId).get();
                if (lenderIdAndPrice!=null) {
                    String[] split = lenderIdAndPrice.split("\\-");
                    long redisId = Long.parseLong(split[0]);
                    float redisPrice = Float.parseFloat(split[1]);
                    long transactionPrice = (long) (redisPrice * 10);
                    OrderServiceImpl orderServiceImpl = (OrderServiceImpl) Ser.getBean("orderServiceImpl");
                    orderServiceImpl.addOrder(redisId,goodsId,transactionPrice);
                }
                boolean cancel = cancel();
            }
        }

    }
}
