package com.jiumu.auction.dataile.mapper;

import com.jiumu.auction.dataile.po.TbAccount;
import com.jiumu.auction.dataile.po.TbHistoricalPrice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
@Mapper
public interface BidMapper {
    /**
     * 根据用户id查询用户账户
     * @param userId
     * @return
     */
    TbAccount queryAccountByUserId(@Param("userId") Long userId);

    /**
     * 添加历史价格
     * @param historicalPrice
     */
    void addHistorical(@Param("historicalPrice") TbHistoricalPrice historicalPrice);

    /**.
     * 修改账户保证金
     * @param account
     */
    void updataAccount(@Param("account") TbAccount account);
}
