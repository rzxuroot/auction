package com.jiumu.auction.dataile.mapper;

import com.jiumu.auction.dataile.po.TbAccount;
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
}
