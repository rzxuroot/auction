package com.jiumu.auction.dataile.service.impl;

import com.jiumu.auction.dataile.mapper.GoodsMapper;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class GoodsServiceImpl implements IGoodsService {
    @Autowired
    private GoodsMapper goodsMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;
    @Override
    public GoodsVO queryGoodsById(Long goodsId) {
        GoodsVO goodsVO = goodsMapper.queryGoodsById(goodsId);
        String endTime = redisTemplate.boundValueOps("dataileTime" + goodsId).get();
        if (endTime!=null){
            Timestamp deadline = goodsVO.getAuctionDeadline();

            Timestamp endTimestamp =Timestamp.valueOf(endTime);

            if (deadline.getTime()<endTimestamp.getTime()){
                goodsVO.setAuctionDeadline(endTimestamp);
            }

        }
        else {
            synchronized (this){
                String endTime1 = redisTemplate.boundValueOps("dataileTime" + goodsId).get();
                if (endTime1!=null){
                    Timestamp deadline = goodsVO.getAuctionDeadline();
                    Timestamp endTimestamp1 =Timestamp.valueOf(endTime1);
                    if (deadline.getTime()<endTimestamp1.getTime()){
                        goodsVO.setAuctionDeadline(endTimestamp1);
                    }
                }
            }
        }
        return goodsVO;
    }

    /**
     * 根据商品id查询历史价格
     * @param goodsId
     * @return
     */
    @Override
    public List<HistoricalPriceVO> queryHistoricalPriceByGoodsId(Long goodsId) {
        List<HistoricalPriceVO> priceVOList = goodsMapper.queryHistoricalPriceByGoodsId(goodsId);
//        for (HistoricalPriceVO his:priceVOList){
//            long auctionPrice = his.getAuctionPrice()/100;
//            his.setAuctionPrice(auctionPrice);
//        }

        return priceVOList;
    }

    @Override
    public int queryCountHistorical() {
        return goodsMapper.queryCountHistorical();
    }

    /**
     * 修改商品结束时间
     * @param auctionDeadline
     * @param goodsId
     */
    @Override
    public void updateGoodsAuctionDeadline(Timestamp auctionDeadline, Long goodsId) {
        goodsMapper.updateGoodsAuctionDeadline(auctionDeadline,goodsId);
    }
}
