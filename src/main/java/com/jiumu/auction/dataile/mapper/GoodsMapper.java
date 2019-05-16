package com.jiumu.auction.dataile.mapper;

import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.vo.GoodsVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;



@Mapper
public interface GoodsMapper {
    /**
     * 根据id查询商品
     * @param goodsId
     * @return
     */
    GoodsVO queryGoodsById (@Param("goodsId") Long goodsId);
}
