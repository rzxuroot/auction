package com.jiumu.auction.myAttention.service.impl;

import com.jiumu.auction.myAttention.mapper.AttentionMapper;
import com.jiumu.auction.myAttention.po.TbAttention;
import com.jiumu.auction.myAttention.service.IAttentionService;
import com.jiumu.auction.myAttention.vo.JsonResult;
import com.jiumu.auction.user.bean.TbUser;
import com.jiumu.auction.user.dao.UserMapper;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttentionServiceImpl implements IAttentionService {
    @Autowired
    private AttentionMapper attentionMapper;
    @Autowired
    private UserMapper userMapper;
    @Override
    public JsonResult addAttention(Long goodsId) {
        String ss = (String) SecurityUtils.getSubject().getSession().getAttribute("user");
        TbUser user = userMapper.selectUserByName(ss);
        JsonResult jsonResult = new JsonResult();
        if (user!=null){
            long userId = user.getUserId();
            TbAttention tbAttention = new TbAttention();
            tbAttention.setAttentionUserId(userId);
            tbAttention.setAttentionGoodsId(goodsId);
            attentionMapper.addAttention(tbAttention);
            jsonResult.setCode(5);
            jsonResult.setMsg("succeed");
        }else{
         jsonResult.setCode(0);
         jsonResult.setMsg("未登录");
        }
        return jsonResult;
    }

    @Override
    public void deleteAttention(Long goodsId) {
        String ss = (String) SecurityUtils.getSubject().getSession().getAttribute("user");
        TbUser user = userMapper.selectUserByName(ss);

        if (user!=null){
            long userId = user.getUserId();
            attentionMapper.deleteAttention(goodsId,userId);
        }

    }

    @Override
    public int queryCountAttention(Long goodsId) {
        return attentionMapper.queryCountAttention(goodsId);
    }

    @Override
    public int queryAttentionByGoodsIdAndUserId(Long goodsId) {
        String ss = (String) SecurityUtils.getSubject().getSession().getAttribute("user");
        TbUser user = userMapper.selectUserByName(ss);

        if (user!=null){
            long userId = user.getUserId();
            int i = attentionMapper.queryAttentionByGoodsIdAndUserId(goodsId, userId);
            return i;
        }
        return 0;
    }
}
