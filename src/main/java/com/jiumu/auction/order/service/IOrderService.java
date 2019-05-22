package com.jiumu.auction.order.service;



public interface IOrderService {
    /**
     * 提交订单
     * @param userId
     * @param goodsId
     * @param price
     */
    void addOrder(Long userId,Long goodsId,Long price);
}
