package com.jiumu.auction.recharge.service;

import com.jiumu.auction.recharge.vo.PayInfo;

import javax.servlet.http.HttpSession;

public interface IWxPayService {
    String orderWx(PayInfo payInfo,String baseURL,HttpSession session);
    void updateAccountBalance(long userId,long recharge);
}
