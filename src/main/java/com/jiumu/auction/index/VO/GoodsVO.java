package com.jiumu.auction.index.VO;

import java.sql.Timestamp;

/**
 * 传到页面显示商品VO
 */
public class GoodsVO {

    //商品id
    private Integer goodsId;
    //商品编号
    private String goodsNo;
    //商品名称
    private String goodsName;
    //商品图片
    private String goodsImg;
    //商品底价
    private String askingPrice;
    //商品作者
    private String authorName;
    //商品下线时间
    private Timestamp logoutTime;
    //商品状态
    private String goodsStatus;

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public String getGoodsNo() {
        return goodsNo;
    }

    public void setGoodsNo(String goodsNo) {
        this.goodsNo = goodsNo;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public String getGoodsImg() {
        return goodsImg;
    }

    public void setGoodsImg(String goodsImg) {
        this.goodsImg = goodsImg;
    }

    public String getAskingPrice() {
        return askingPrice;
    }

    //将数据库中的价格除以100然后在前面添加￥返回到前端页面
    public void setAskingPrice(String askingPrice) {
        Integer price = Integer.parseInt(askingPrice) / 100;
        askingPrice = "￥" + price;
        this.askingPrice = askingPrice;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Timestamp getLogoutTime() {
        return logoutTime;
    }

    public void setLogoutTime(Timestamp logoutTime) {
        this.logoutTime = logoutTime;
    }

    public String getGoodsStatus() {
        return goodsStatus;
    }

    public void setGoodsStatus(String goodsStatus) {
        this.goodsStatus = goodsStatus;
    }
}
