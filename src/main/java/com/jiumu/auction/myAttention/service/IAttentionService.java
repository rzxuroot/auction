package com.jiumu.auction.myAttention.service;


import com.jiumu.auction.myAttention.vo.JsonResult;

public interface IAttentionService {
    /**
     * 添加关注
     * @param goodsId
     */
    JsonResult addAttention(Long goodsId);

    /**
     * 删除关注（取消关注）
     * @param goodsId
     */
    void deleteAttention(Long goodsId);

    /**
     * 查询关注总数
     * @return
     */
    int queryCountAttention(Long godosId);

    /**
     * 根据商品id和用户id查询关注
     * @param goodsId
     * @return
     */
    int queryAttentionByGoodsIdAndUserId(Long goodsId);
}
