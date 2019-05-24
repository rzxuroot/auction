package com.jiumu.auction.userCenter.service;

import com.jiumu.auction.user.bean.JsonResult;
import com.jiumu.auction.userCenter.po.TbOrder;
import com.jiumu.auction.userCenter.vo.MyAuction;
import com.jiumu.auction.userCenter.vo.MyClinch;
import com.jiumu.auction.userCenter.vo.MyOrderAndPrice;
import org.apache.ibatis.annotations.Param;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface IUserCenterService {
    Long userId(HttpSession session) throws Exception;
//    通过用户ID查询订单信息
    List<TbOrder> queryOrderByUserId(Long userId,String statusId);
//    查询我的竞拍列表
    List<MyAuction> queryMyAuctionList(Long userId);
//    查询我的所有订单
    List<MyClinch> queryMyClinchByUserId(Long userId, String statusId);
//     修改成交状态
    void updateClinch(String orderNo) throws Exception;
//    查询当前订单的价格
    MyOrderAndPrice queryMyOrderAndPrice(Long userId,Long orderId);
//    支付
    JsonResult pay(Long userId, Long orderId, String password);
}
