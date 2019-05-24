package com.jiumu.auction.userCenter.dao;

import com.jiumu.auction.userCenter.vo.MyAuction;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyAuctionMapper {
    List<MyAuction> queryMyAuctionList(@Param("userId") Long userId);
}
