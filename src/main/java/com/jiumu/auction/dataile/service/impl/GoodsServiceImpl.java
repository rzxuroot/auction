package com.jiumu.auction.dataile.service.impl;

import com.jiumu.auction.dataile.mapper.GoodsMapper;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsServiceImpl implements IGoodsService {
    @Autowired
    private GoodsMapper goodsMapper;
    @Override
    public GoodsVO queryGoodsById(Long goodsId) {
        GoodsVO goodsVO = goodsMapper.queryGoodsById(goodsId);
        //将起拍价和竞拍价处以100得到元单位的价格
//        long price = goodsVO.getAskingPrice() / 100;
//        long binddPrice = goodsVO.getBiddingSteps() / 100;
//        goodsVO.setAskingPrice(price);
//        goodsVO.setBiddingSteps(binddPrice);
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
}
