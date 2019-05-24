package com.jiumu.auction.userCenter.dao;

import com.jiumu.auction.userCenter.vo.MyClinch;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MyClinchMapper {
    List<MyClinch> queryMyClinchByUserId(@Param("userId") Long userId, @Param("statusId") String statusId);

    void updateClinch(@Param("orderNo") String orderNo);
}
