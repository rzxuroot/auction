package com.jiumu.auction.order.mapper;

import com.jiumu.auction.order.po.TbOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper {
    /**
     * 新增订单
     * @param order
     */
    void addOrder(@Param("order") TbOrder order);
}
