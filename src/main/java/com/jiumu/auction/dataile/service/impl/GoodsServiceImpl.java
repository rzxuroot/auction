package com.jiumu.auction.dataile.service.impl;

import com.jiumu.auction.dataile.mapper.GoodsMapper;
import com.jiumu.auction.dataile.po.TbBrowse;
import com.jiumu.auction.dataile.po.TbUser;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.BrowseVO;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class GoodsServiceImpl implements IGoodsService {
    @Autowired
    private GoodsMapper goodsMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;
    @Override
    public GoodsVO queryGoodsById(Long goodsId) {
        GoodsVO goodsVO = goodsMapper.queryGoodsById(goodsId);
        String endTime = redisTemplate.boundValueOps("dataileTime" + goodsId).get();
        if (endTime!=null){
            Timestamp deadline = goodsVO.getAuctionDeadline();

            Timestamp endTimestamp =Timestamp.valueOf(endTime);

            if (deadline.getTime()<endTimestamp.getTime()){
                goodsVO.setAuctionDeadline(endTimestamp);
            }

        }
        else {
            synchronized (this){
                String endTime1 = redisTemplate.boundValueOps("dataileTime" + goodsId).get();
                if (endTime1!=null){
                    Timestamp deadline = goodsVO.getAuctionDeadline();
                    Timestamp endTimestamp1 =Timestamp.valueOf(endTime1);
                    if (deadline.getTime()<endTimestamp1.getTime()){
                        goodsVO.setAuctionDeadline(endTimestamp1);
                    }
                }
            }
        }
        return goodsVO;
    }

    /**
     * 根据商品id查询历史价格
     * @param goodsId
     * @return
     */
    @Override
    public List<HistoricalPriceVO> queryHistoricalPriceByGoodsId(Long goodsId) {
        List<HistoricalPriceVO> priceVOList = goodsMapper.queryHistoricalPriceByGoodsId(goodsId);
//        for (HistoricalPriceVO his:priceVOList){
//            long auctionPrice = his.getAuctionPrice()/100;
//            his.setAuctionPrice(auctionPrice);
//        }

        return priceVOList;
    }

    @Override
    public int queryCountHistorical() {
        return goodsMapper.queryCountHistorical();
    }

    /**
     * 修改商品结束时间
     * @param auctionDeadline
     * @param goodsId
     */
    @Override
    public void updateGoodsAuctionDeadline(Timestamp auctionDeadline, Long goodsId) {
        goodsMapper.updateGoodsAuctionDeadline(auctionDeadline,goodsId);
    }

    @Override
    public void addBrowse(Long goodsId) {
        //获取用户
        TbUser user = (TbUser) SecurityUtils.getSubject().getSession().getAttribute("user");
        //判断用户是否为空
        if (user!=null){

            //获得用户id
            long userId = user.getUserId();
            String goodsIdAndUserIdBrowes = redisTemplate.boundValueOps(goodsId + "-browse-" + userId).get();
            if (!"1".equals(goodsIdAndUserIdBrowes)) {
                //创建我的浏览对象
                TbBrowse tbBrowse = new TbBrowse();
                //添加商品id
                tbBrowse.setBrowseGoodsId(goodsId);
                //添加用户id
                tbBrowse.setBrowseUserId(userId);
                //获得当前时间
                Date date = new Date();
                //创建格式刷
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                //转化为string
                String format1 = format.format(date);
                //转化为timestamp类型
                Timestamp timestamp = Timestamp.valueOf(format1);
                tbBrowse.setBrowseRecordTime(timestamp);
                redisTemplate.boundValueOps(goodsId + "-browse-" + userId).set("1");
                goodsMapper.addBrowse(tbBrowse);
            }
        }

    }

    @Override
    public List<BrowseVO> queryBrowseList() {
        TbUser user = (TbUser) SecurityUtils.getSubject().getSession().getAttribute("user");

        if (user!=null) {
            long userId = user.getUserId();
            return goodsMapper.queryBrowseList(userId);
        }
         return null;
    }
}
