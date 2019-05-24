package com.jiumu.auction.userCenter.dao;

import com.jiumu.auction.userCenter.vo.MyAccount;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PayMapper {
    void updatePaymentStatus(@Param("orderId") long orderId);
    void updateAccountBalance(@Param("userId") long userId, @Param("balance")long balance);
    MyAccount queryAccountPassword(@Param("userId") long userId);
    long queryAccountBalance(@Param("userId") long userId);
}
