package com.jiumu.auction.userCenter.dao;

import com.jiumu.auction.userCenter.vo.MyOrderAndPrice;
import org.apache.ibatis.annotations.Param;

public interface MyOrderAndPriceMapper {
    MyOrderAndPrice queryMyOrderAndPrice(@Param("userId")Long userId,@Param("orderId") Long orderId);
}
