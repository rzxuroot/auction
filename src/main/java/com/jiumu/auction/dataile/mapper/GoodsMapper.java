package com.jiumu.auction.dataile.mapper;


import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;


@Mapper
public interface GoodsMapper {
    /**
     * 根据id查询商品
     * @param goodsId
     * @return
     */
    GoodsVO queryGoodsById (@Param("goodsId") Long goodsId);

    /**
     * 根据商品id查询商品历史价格
     * @param goodsId
     * @return
     */
   List<HistoricalPriceVO> queryHistoricalPriceByGoodsId(@Param("goodsId") Long goodsId);

    /**
     * 查询历史总数
     * @return
     */
   int queryCountHistorical();

   void updateGoodsAuctionDeadline(@Param("auctionDeadline") Timestamp auctionDeadline,@Param("goodsId") Long goodsId);
}
