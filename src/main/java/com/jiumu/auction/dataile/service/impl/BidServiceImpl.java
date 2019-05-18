package com.jiumu.auction.dataile.service.impl;

import com.jiumu.auction.dataile.mapper.BidMapper;
import com.jiumu.auction.dataile.po.TbAccount;
import com.jiumu.auction.dataile.service.IBidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidServiceImpl implements IBidService {
    @Autowired
    private BidMapper bidMapper;

    /**
     * 根据用户id查询用户账户
     * @param userId
     * @return
     */
    @Override
    public TbAccount queryAccountByUserId(Long userId) {
        TbAccount account = bidMapper.queryAccountByUserId(userId);
        return account;
    }
}
