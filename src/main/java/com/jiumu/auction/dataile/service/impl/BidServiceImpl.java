package com.jiumu.auction.dataile.service.impl;

import com.jiumu.auction.dataile.mapper.BidMapper;
import com.jiumu.auction.dataile.po.TbAccount;
import com.jiumu.auction.dataile.po.TbHistoricalPrice;
import com.jiumu.auction.dataile.service.IBidService;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.JsonResult;
import com.jiumu.auction.myAuction.mapper.AuctionMapper;
import com.jiumu.auction.myAuction.po.TbAuction;
import io.goeasy.GoEasy;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BidServiceImpl implements IBidService {
    @Autowired
    private BidMapper bidMapper;
    @Autowired
    private IGoodsService goodsServiceImpl;
    @Autowired
    private StringRedisTemplate redisTemplate;
    @Autowired
    private AuctionMapper auctionMapper;
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
                            //根据上一位领先者id和商品id查询出我的竞拍对象
                            TbAuction tbAuction1 = auctionMapper.queryAuctionByUserIdAndGoodsId(redisId, goodsId);
                           //判断是否为空
                            if (tbAuction1!=null){
                                //不为空则修改领先者状态为”no”
                                tbAuction1.setAuctionIslead("no");
                                //修改数据库信息
                                auctionMapper.updateMyAuction(tbAuction1);
                            }
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

    /**
     * 新增历史价格
     * @param userId
     * @param price
     * @param goodsId
     */
    @Override
    public void addHistorical(Long userId,float price,Long goodsId) {
        //获得历史价格对象
        TbHistoricalPrice historicalPrice=new TbHistoricalPrice();
        //改变对象的属性
        historicalPrice.setHistoricalUserId(userId);
        historicalPrice.setHistoricalGoodsId(goodsId);
        historicalPrice.setAuctionPrice((long)(price*100));
        //获取当前时间
        Date date=new Date();
        //将时间转换为字符串格式
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format1 = format.format(date);
        //将字符串时间转换为Timestamp类型，存入对象中
        Timestamp timestamp = Timestamp.valueOf(format1);
        historicalPrice.setAuctionTime(timestamp);
        //System.out.println("时间："+timestamp);
        //新增历史价格
        bidMapper.addHistorical(historicalPrice);
    }

    @Override
    public void pushTime(Date date, Long goodsId, HttpServletResponse resp) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //从缓存中获取结束时间
        String goodsTime = redisTemplate.boundValueOps("dataileTime" + goodsId).get();
        //如果缓存中不为空，则用取出的时间对比
        if (goodsTime != null) {
            //格式转换
            Timestamp endTimestamp = Timestamp.valueOf(goodsTime);
            //获得结束和当前两个时间的毫秒数
            long endTime = endTimestamp.getTime();
            long startTime = date.getTime();
            //相减获得间隔时间
            long intervalTime = endTime - startTime;
            //判断结束时间是否比当前时间大一分钟以内
            if (intervalTime <= 60 * 1000) {
                //如果是则结束时间加两分钟
                long lenEndTime = startTime + 2 * 60 * 1000;
                //格式转换为string
                Timestamp lenEndTimestamp = new Timestamp(lenEndTime);

                String lenEndTimestampStr = format.format(lenEndTimestamp);
                //将新的结束时间存入缓存
                redisTemplate.boundValueOps("dataileTime" + goodsId).set(lenEndTimestampStr);
                //goeasy推送时间到前端
                GoEasy goEasy = new GoEasy("http://rest-hangzhou.goeasy.io", "BC-82d3f7de164e46ce9347b04494a76336");
                goEasy.publish("zgjTime", lenEndTimestampStr);
                try {
                    resp.getWriter().println("<xml>\n" +
                            "\n" +
                            "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
                            "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                            "</xml>");
                    resp.reset();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        } else {
            synchronized (this) {
                String goodsTime1 = redisTemplate.boundValueOps("dataileTime" + goodsId).get();
                //双重检测锁
                if (goodsTime1 != null) {
                    //格式转换
                    Timestamp endTimestamp = Timestamp.valueOf(goodsTime1);
                    //获得结束和当前两个时间的毫秒数
                    long endTime = endTimestamp.getTime();
                    long startTime = date.getTime();
                    //相减获得间隔时间
                    long intervalTime = endTime - startTime;
                    //判断结束时间是否比当前时间大一分钟以内
                    if (intervalTime <= 60 * 1000) {
                        //如果是则结束时间加两分钟
                        long lenEndTime = startTime + 2 * 60 * 1000;
                        //格式转换为string
                        Timestamp lenEndTimestamp = new Timestamp(lenEndTime);

                        String lenEndTimestampStr = format.format(lenEndTimestamp);
                        //将新的结束时间存入缓存
                        redisTemplate.boundValueOps("dataileTime" + goodsId).set(lenEndTimestampStr);
                        //goeasy推送时间到前端
                        GoEasy goEasy = new GoEasy("http://rest-hangzhou.goeasy.io", "BC-82d3f7de164e46ce9347b04494a76336");
                        goEasy.publish("zgjTime", lenEndTimestampStr);
                        try {
                            resp.getWriter().println("<xml>\n" +
                                    "\n" +
                                    "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
                                    "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                                    "</xml>");
                            resp.reset();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                } else {
                    GoodsVO goodsVO = goodsServiceImpl.queryGoodsById(goodsId);
                    Timestamp auctionDeadline = goodsVO.getAuctionDeadline();
                    String auctionDeadlineStr = format.format(auctionDeadline);
                    Timestamp endTimestamp = Timestamp.valueOf(auctionDeadlineStr);
                    //获得结束和当前两个时间的毫秒数
                    long endTime = endTimestamp.getTime();
                    long startTime = date.getTime();
                    //相减获得间隔时间
                    long intervalTime = endTime - startTime;
                    //判断结束时间是否比当前时间大一分钟以内
                    if (intervalTime <= 60 * 1000) {
                        //如果是则结束时间加两分钟
                        long lenEndTime = startTime + 2 * 60 * 1000;
                        //格式转换为string
                        Timestamp lenEndTimestamp = new Timestamp(lenEndTime);

                        String lenEndTimestampStr = format.format(lenEndTimestamp);
                        //将新的结束时间存入缓存
                        redisTemplate.boundValueOps("dataileTime" + goodsId).set(lenEndTimestampStr);
                        //goeasy推送时间到前端
                        GoEasy goEasy = new GoEasy("http://rest-hangzhou.goeasy.io", "BC-82d3f7de164e46ce9347b04494a76336");
                        goEasy.publish("zgjTime", lenEndTimestampStr);
                        try {
                            resp.getWriter().println("<xml>\n" +
                                    "\n" +
                                    "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
                                    "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                                    "</xml>");
                            resp.reset();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }
}
