package com.jiumu.auction.user.service.Impl;


import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.dao.UserMapper;
import com.jiumu.auction.user.po.UserPo;
import com.jiumu.auction.user.service.IUserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public void login(String username, String password) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username,password);
        subject.login(token);
    }

    @Override
    public TbUser selectUserByTel(String phone) {
        TbUser tbUser = userMapper.selectUserByTel(phone);
        return tbUser;
    }

    @Override
    public TbUser selectUserByName(String name) {
        TbUser tbUser = userMapper.selectUserByName(name);
        return tbUser;
    }

    @Override
    public void insertUser(UserPo userPo) {
        userMapper.insertUser(userPo);
    }
}
