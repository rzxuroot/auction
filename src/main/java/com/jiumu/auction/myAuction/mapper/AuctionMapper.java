package com.jiumu.auction.myAuction.mapper;

import com.jiumu.auction.myAuction.po.TbAuction;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AuctionMapper {
    /**
     * 新增我的竞拍
     * @param auction
     */
    void addMyAuction(@Param("auction") TbAuction auction);

    /**
     * 修改我的竞拍
     * @param auction
     */
    void updateMyAuction(@Param("auction") TbAuction auction);

    /**
     * 根据用户id和商品id查询我的竞拍对象
     * @param userId
     * @param goodsId
     * @return
     */
    TbAuction queryAuctionByUserIdAndGoodsId(@Param("userId") Long userId,@Param("goodsId") Long goodsId);

    /**
     * 根据商品id查询所有竞拍对象
     * @param goodsId
     * @return
     */
    List<TbAuction> queryAuctionListByGoodsId(@Param("goodsId") Long goodsId);
}
