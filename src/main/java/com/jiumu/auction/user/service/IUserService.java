package com.jiumu.auction.user.service;


import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.po.UserPo;

public interface IUserService {
    //用户登录
    void login(String username, String password) throws Exception;
    //验证手机号是否使用
    TbUser selectUserByTel(String phone);
    //验证用户名是否占用
    TbUser selectUserByName(String name);

    void insertUser(UserPo userPo);
}
