package com.jiumu.auction.myAuction.service;

import com.jiumu.auction.myAuction.po.TbAuction;


public interface IAuctionService {
    /**
     * 新增我的竞拍
     * @param
     */
    void addMyAuction(float price, Long userId,Long goodsId);

    /**
     * 修改我的竞拍

     */
    void updateMyAuction( Long goodsId);
}
