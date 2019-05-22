package com.jiumu.auction.dataile.service;

import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;

import java.sql.Timestamp;
import java.util.List;

public interface IGoodsService {
    /**
     * 根据id查询商品
     * @param goodsId
     * @return TbGoods
     */
    GoodsVO queryGoodsById(Long goodsId);

    /**
     * 根据商品id查询商品的历史价格
     * @param goodsId
     * @return
     */
    List<HistoricalPriceVO> queryHistoricalPriceByGoodsId(Long goodsId);

    /**
     * 查询历史总数
     * @return
     */
    int queryCountHistorical();

    /**
     * 修改结束时间
     * @param auctionDeadline
     * @param goodsId
     */
    void updateGoodsAuctionDeadline(Timestamp auctionDeadline, Long goodsId);

}
