package com.jiumu.auction.commons.shiro;


import com.jiumu.auction.dataile.po.TbUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MyRealm extends AuthorizingRealm {

//    @Autowired
//    private UserMapper userMapper;

    /**
     * 权限查询
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }

    /**
     * 登录认证
     * @param token
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //登录的业务逻辑
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
        String username = usernamePasswordToken.getUsername();
        char[] chars = usernamePasswordToken.getPassword();
        String password = new String(chars);
        //TbUsers tbUsers = userMapper.checkUsername(username);
//        if (tbUsers == null) {
////            throw new UnknownAccountException();
////        }
//        TbUser tbUsers=new TbUser();
//        tbUsers.setUserId(1);
//        SecurityUtils.getSubject().getSession().setAttribute("user",tbUsers);
        return new SimpleAuthenticationInfo(username,password,"myrealm");
    }
}
