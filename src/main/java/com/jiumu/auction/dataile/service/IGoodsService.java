package com.jiumu.auction.dataile.service;

import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;

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
}
