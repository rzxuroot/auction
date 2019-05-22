package com.jiumu.auction.commons.time;

import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.GoodsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Timer;
@Component
public class ChangeAuctionStatus {
    Timer timer;
    public void changeStatus(StringRedisTemplate redisTemplate, Long goodsId,Timestamp auctionDeadline) {

        timer = new Timer();
        timer.schedule(new ChangeTime(redisTemplate, auctionDeadline, goodsId),1000, 1000);
    }
}
