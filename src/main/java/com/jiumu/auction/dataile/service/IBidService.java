package com.jiumu.auction.dataile.service;

import com.jiumu.auction.dataile.po.TbAccount;

public interface IBidService {
    /**
     * 根据用户id查询账户
     * @param userId
     * @return
     */
    TbAccount queryAccountByUserId(Long userId);
}
