package com.jiumu.auction.dataile.mapper;


import com.jiumu.auction.dataile.po.TbBrowse;
import com.jiumu.auction.dataile.vo.BrowseVO;
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
   int queryCountHistorical(@Param("goodsId") Long goodsId);

    /**
     * 修改商品竞拍结束时间
     * @param auctionDeadline
     * @param goodsId
     */
   void updateGoodsAuctionDeadline(@Param("auctionDeadline") Timestamp auctionDeadline,@Param("goodsId") Long goodsId);

    /**
     * 添加我的浏览表
     * @param browse
     */
   void addBrowse(@Param("browse") TbBrowse browse);

    /**
     * 根据用户id查询我的浏览记录集合
     * @param userId
     * @return
     */
    List<BrowseVO> queryBrowseList(@Param("userId") Long userId);
}
