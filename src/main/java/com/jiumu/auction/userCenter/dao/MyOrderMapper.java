package com.jiumu.auction.userCenter.dao;

import com.jiumu.auction.userCenter.po.TbOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyOrderMapper {
    List<TbOrder> queryOrderByUserId(@Param("userId") Long userId,@Param("statusId") String id);

}
