package com.jiumu.auction.dataile.service.impl;

import com.jiumu.auction.dataile.mapper.BidMapper;
import com.jiumu.auction.dataile.po.TbAccount;
import com.jiumu.auction.dataile.po.TbHistoricalPrice;
import com.jiumu.auction.dataile.service.IBidService;
import com.jiumu.auction.dataile.vo.JsonResult;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BidServiceImpl implements IBidService {
    @Autowired
    private BidMapper bidMapper;
    @Autowired
    private StringRedisTemplate redisTemplate;

    Logger logger= Logger.getLogger(BidServiceImpl.class);

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

    /**
     * 根据传入的金额扣除领先者的保证金并释放上一个领先者的保证金
     * @param userId
     * @param price
     * @return
     */
    @Override
    public JsonResult MarginDeduction(Long userId, float price,Long goodsId) {
        JsonResult jsonResult=new JsonResult();




            //维护session会话，只有在会话内部才能有事务
            redisTemplate.execute(new SessionCallback<Object>() {
                //在session存活期间的事务才能正常开启和提交。execute方法内存活，此方法结束，session也就结束了。
                //redisOperations类似RedisTemplate，是Redis的一个客户端工具类，用来操作redis指令
                @Override
                public Object execute(RedisOperations redisOperations) throws DataAccessException {

                    //锁num key
                    //上锁
                    redisOperations.watch("dataile-" + goodsId);
                    // 因为事务没有提交是不会执行任何指令的。所以查询需要写在事务外
                    String curPriceAndUserId =(String)redisOperations.opsForValue().get("dataile-" + goodsId);
                    String[] idAndPrice = null;
                    long redisId = 0L;
                    float redisPrice = 0;
                    //logger.info("死亡rides:curPriceAndUserId="+curPriceAndUserId);
                    if (!(curPriceAndUserId==null ||"null".equals(curPriceAndUserId)||"".equals(curPriceAndUserId))){
                        idAndPrice = curPriceAndUserId.split("\\-");
                        redisId = Long.parseLong(idAndPrice[0]);
                        redisPrice = Float.parseFloat(idAndPrice[1]);
                    }
                    //redis事务没有回滚功能，因为redis认为自己的语法比较简单和健壮。
                    //开启事务，锁才真的生效
                    redisOperations.multi();
                    //判断当前出价是否比上一位出价高，或是否有人出价
                    //如果出价比之前高或没人出价，则修改出价人的账户信息
                    if (price> redisPrice ||curPriceAndUserId==null || "null".equals(curPriceAndUserId) ||
                            curPriceAndUserId.length()<=0 || "".equals(curPriceAndUserId)) {
                        redisOperations.boundValueOps("dataile-" + goodsId).set(userId+"-"+price);
                        jsonResult.setCode(5);
                        //修改冻结金额
                        TbAccount account = bidMapper.queryAccountByUserId(userId);
                        long freezeMarginMoney = account.getFreezeMarginMoney();
                        account.setFreezeMarginMoney(freezeMarginMoney+(long)(price*100));
                        //修改占用额度
                        long freezeMarginLimit = account.getFreezeMarginLimit();
                        account.setFreezeMarginLimit(freezeMarginLimit+(long)(price*1000));
                        //修改可用额度
                        long availableMarginLimit = account.getAvailableMarginLimit();
                        account.setAvailableMarginLimit(availableMarginLimit-(long)(price*1000));
                        //修改账户信息
                        //logger.info("修改的对象:"+account+",上一位出的钱:"+redisPrice+",当前钱："+price);
                        bidMapper.updataAccount(account);
                        //如果账户不为空则返还上一位领先者的保证金额
                        if (!(curPriceAndUserId==null ||"null".equals(curPriceAndUserId)||"".equals(curPriceAndUserId))){
                            //根据上一位领先者的id查找上一位领先者的对象
                            TbAccount redisAccount = bidMapper.queryAccountByUserId(redisId);
                            //修改上一位领先者的信息
                            //修改冻结金额
                            long lastFreezeMarginMoney = redisAccount.getFreezeMarginMoney();
                            redisAccount.setFreezeMarginMoney(lastFreezeMarginMoney-(long)(redisPrice*100));
                            //修改占用额度
                            long lastFreezeMarginLimit = redisAccount.getFreezeMarginLimit();
                            redisAccount.setFreezeMarginLimit(lastFreezeMarginLimit-(long)(redisPrice*1000));
                            //修改可用额度
                            long lastAvailableMarginLimit = redisAccount.getAvailableMarginLimit();
                            redisAccount.setAvailableMarginLimit(lastAvailableMarginLimit+(long)(redisPrice*1000));
                            //修改账户信息
                            bidMapper.updataAccount(redisAccount);
                        }

                        jsonResult.setCode(5);
                        jsonResult.setMsg("succeed");
                    }else {
                        jsonResult.setCode(4);
                        jsonResult.setMsg("有人抢先出了比您高的价格");
                    }
                    //exec提交事务，释放锁。
                    //返回值是一个结果集
                    List<Object> list = redisOperations.exec();
                    if (list == null || list.isEmpty()) {
                        System.out.println("执行失败");
                    } else {
                        System.out.println("执行成功");
                    }
                    return jsonResult;
                }

            });

        return jsonResult;
    }

    @Override
    public void addHistorical(Long userId,float price,Long goodsId) {
        TbHistoricalPrice historicalPrice=new TbHistoricalPrice();
        historicalPrice.setHistoricalUserId(userId);
        historicalPrice.setHistoricalGoodsId(goodsId);
        historicalPrice.setAuctionPrice((long)(price*100));
        Date date=new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format1 = format.format(date);
        Timestamp timestamp = Timestamp.valueOf(format1);
        historicalPrice.setAuctionTime(timestamp);
        //System.out.println("时间："+timestamp);
        bidMapper.addHistorical(historicalPrice);
    }

}
