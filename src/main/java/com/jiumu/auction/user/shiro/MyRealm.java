package com.jiumu.auction.user.shiro;

import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.dao.UserMapper;
import com.jiumu.auction.user.utils.MD5Utils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MyRealm extends AuthorizingRealm {
    @Autowired
    private UserMapper userMapper;


    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        TbUser tbUser = new TbUser();
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
        String username = usernamePasswordToken.getUsername();
        char[] chars = usernamePasswordToken.getPassword();
        String password = new String(chars);
        String em = "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
        String ph = "^((13[0-9])|(15[^4,\\D])|(17[0-9])|(18[0,5-9]))\\d{8}$";
        if(username.matches(ph)){
            tbUser = userMapper.checkPhone(username);
        }else if(username.matches(em)){
            tbUser = userMapper.checkEmail(username);
        }else{
            tbUser = userMapper.checkUsername(username);
        }
        if (tbUser == null) {
            throw new UnknownAccountException();
        }else {
            //数据库的密码
            String userPassword = tbUser.getUserPassword();
            /*将账户名用做盐*/
            String userName = tbUser.getUserName();
            String md5 = MD5Utils.md5(password, userName);
            if(!md5.equals(userPassword)){
                throw new IncorrectCredentialsException();
            }
        }
        SecurityUtils.getSubject().getSession().setAttribute("user",tbUser);
        return new SimpleAuthenticationInfo(username,password,"myrealm");
    }
}
