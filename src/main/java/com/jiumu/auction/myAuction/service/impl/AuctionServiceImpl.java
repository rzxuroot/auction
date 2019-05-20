package com.jiumu.auction.myAuction.service.impl;

import com.jiumu.auction.myAuction.mapper.AuctionMapper;
import com.jiumu.auction.myAuction.po.TbAuction;
import com.jiumu.auction.myAuction.service.IAuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionServiceImpl implements IAuctionService {
    @Autowired
    private AuctionMapper auctionMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;
    @Override
    public void addMyAuction(float price, Long userId, Long goodsId) {
        //根据用户id和商品id查询我的竞拍对象
        TbAuction tbAuction1 = auctionMapper.queryAuctionByUserIdAndGoodsId(userId, goodsId);
        //判断竞拍对象是否为空
        if (tbAuction1!=null){
            //如果不为空则修改原来竞拍对象的价格
            tbAuction1.setAuctionPrice((long)(price*100));
            auctionMapper.updateMyAuction(tbAuction1);
        }else {
            //创建我的竞拍对象
            TbAuction tbAuction = new TbAuction();
            //给userid和goodsid赋值
            tbAuction.setAuctionUserId(userId);
            tbAuction.setAuctionGoodsId(goodsId);
            tbAuction.setAuctionPrice((long)(price*100));
            //从缓存中获取领先者的id
            String leader = redisTemplate.boundValueOps("dataile-" + goodsId).get();
            //字符串分割获取到id
            String[] arrayLeader = leader.split("\\-");
            long leaderId = Long.parseLong(arrayLeader[0]);
            //判断id与传入id是否一致
            if (leaderId==userId){
                //如果一致则领先者状态为yes
                tbAuction.setAuctionIslead("yes");
            }else{
                //如果不一致则领先者状态为no
                tbAuction.setAuctionIslead("no");

            }
            //在竞拍中，否则无法点击加价按钮
            tbAuction.setAuctionIsing("yes");
            //没有出局，否则无法点击加价按钮
            tbAuction.setAuctionIsout("no");
            //添加至数据库
            auctionMapper.addMyAuction(tbAuction);
        }
    }

    @Override
    public void updateMyAuction(Long goodsId) {

        //创建我的竞拍对象
        List<TbAuction> auctionList = auctionMapper.queryAuctionListByGoodsId(goodsId);
        //从缓存中获取领先者的id
        String leader = redisTemplate.boundValueOps("dataile-" + goodsId).get();
        //字符串分割获取到id
        String[] arrayLeader = leader.split("\\-");
        long leaderId = Long.parseLong(arrayLeader[0]);
        for (TbAuction tbAuction:auctionList) {
            //给userid和goodsid赋值
            long userId = tbAuction.getAuctionUserId();
            //判断id与传入id是否一致
            if (leaderId == userId) {
                //如果一致则领先者状态为yes
                tbAuction.setAuctionIslead("yes");
                //领先则不出局
                tbAuction.setAuctionIsout("no");
            } else {
                //如果不一致则领先者状态为no
                tbAuction.setAuctionIslead("no");
                //不领先则出局
                tbAuction.setAuctionIsout("yes");
            }
            //时间为零触发这个方法
            tbAuction.setAuctionIsing("no");
            auctionMapper.updateMyAuction(tbAuction);
        }
    }
}
