package com.jiumu.auction.dataile.service;

import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.vo.GoodsVO;

public interface IGoodsService {
    /**
     * 根据id查询商品
     * @param goodsId
     * @return TbGoods
     */
    GoodsVO queryGoodsById(Long goodsId);
}
