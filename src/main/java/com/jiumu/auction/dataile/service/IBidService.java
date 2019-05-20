package com.jiumu.auction.dataile.service;

import com.jiumu.auction.dataile.po.TbAccount;
import com.jiumu.auction.dataile.po.TbHistoricalPrice;
import com.jiumu.auction.dataile.vo.JsonResult;

import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.util.Date;

public interface IBidService {
    /**
     * 根据用户id查询账户
     * @param userId
     * @return
     */
    TbAccount queryAccountByUserId(Long userId);

    /**
     * 保证金的扣除添加
     * @param userId
     * @param price
     * @return
     */
    JsonResult MarginDeduction(Long userId,float price,Long goodsId);

    /**
     * 添加历史价格
     * @param userId
     * @param price
     * @param goodsId
     */
    void addHistorical(Long userId,float price,Long goodsId);

    /**
     * 全局推送时间
     * @param date
     */
    void pushTime(Date date,Long goodsId, HttpServletResponse resp);
}
