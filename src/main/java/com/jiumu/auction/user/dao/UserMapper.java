package com.jiumu.auction.user.dao;

import com.jiumu.auction.user.bean.TbUser;

import com.jiumu.auction.user.po.UserPo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    TbUser checkUsername(@Param("username") String username);
    TbUser checkEmail(@Param("email") String username);
    TbUser checkPhone(@Param("phone") String username);

    //查询手机号是否被使用
    TbUser selectUserByTel(@Param("phone") String phone);
    //查询用户名是否被使用
    TbUser selectUserByName(@Param("name") String name);

    void insertUser(@Param("userInfo") UserPo userPO);
}
