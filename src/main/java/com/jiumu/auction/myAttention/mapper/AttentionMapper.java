package com.jiumu.auction.myAttention.mapper;

import com.jiumu.auction.myAttention.po.TbAttention;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
@Mapper
public interface AttentionMapper {
    /**
     * 添加关注
     * @param attention
     */
    void addAttention(@Param("attention") TbAttention attention);

    /**
     * 删除关注（取消关注）
     * @param goodsId
     * @param userId
     */
    void deleteAttention(@Param("goodsId") Long goodsId,@Param("userId") Long userId);

    /**
     * 查询关注总数
     * @return
     */
    int queryCountAttention(@Param("goodsId") Long goodsId);

    /**
     * 根据商品id和用户id查询关注
     * @param goodsId
     * @param userId
     * @return
     */
    int queryAttentionByGoodsIdAndUserId(@Param("goodsId") Long goodsId,@Param("userId") Long userId);
}
