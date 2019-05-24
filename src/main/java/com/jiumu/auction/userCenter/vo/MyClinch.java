package com.jiumu.auction.userCenter.vo;

public class MyClinch {
    //商品名称
    private String goodsName;
    //落槌价格
    private long auctionPrice;
    //成交价格
    private long transactionPrice;
    //是否生成订单
    private String orderJudge;
    //订单编号
    private String orderNo;
    //证书费
    private long certificatePrice;
    //保费
    private long premiums;
    //合计价格
    private long totalPrice;

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public long getAuctionPrice() {
        return this.auctionPrice / 100;
    }

    public void setAuctionPrice(long auctionPrice) {
        this.auctionPrice = auctionPrice;
    }

    public long getTransactionPrice() {
        return transactionPrice;
    }

    public void setTransactionPrice(long transactionPrice) {
        this.transactionPrice = transactionPrice;
    }

    public String getOrderJudge() {
        return orderJudge;
    }

    public void setOrderJudge(String orderJudge) {
        this.orderJudge = orderJudge;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public long getCertificatePrice() {
        return certificatePrice;
    }

    public void setCertificatePrice(long certificatePrice) {
        this.certificatePrice = certificatePrice;
    }

    public long getPremiums() {
        return premiums;
    }

    public void setPremiums(long premiums) {
        this.premiums = premiums;
    }

    public long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(long totalPrice) {
        this.totalPrice = totalPrice;
    }
}
