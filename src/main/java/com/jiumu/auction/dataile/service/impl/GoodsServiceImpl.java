package com.jiumu.auction.dataile.service.impl;

import com.jiumu.auction.dataile.mapper.GoodsMapper;
import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.GoodsVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodsServiceImpl implements IGoodsService {
    @Autowired
    private GoodsMapper goodsMapper;
    @Override
    public GoodsVO queryGoodsById(Long goodsId) {
        return goodsMapper.queryGoodsById(goodsId);
    }
}
