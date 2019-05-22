package com.jiumu.auction.dataile.vo;

public class BrowseVO {
    private long browseRecordId;
    private long browseUserId;
    private long browseGoodsId;
    private String  goodsImg;

    public long getBrowseRecordId() {
        return browseRecordId;
    }

    public void setBrowseRecordId(long browseRecordId) {
        this.browseRecordId = browseRecordId;
    }

    public long getBrowseUserId() {
        return browseUserId;
    }

    public void setBrowseUserId(long browseUserId) {
        this.browseUserId = browseUserId;
    }

    public long getBrowseGoodsId() {
        return browseGoodsId;
    }

    public void setBrowseGoodsId(long browseGoodsId) {
        this.browseGoodsId = browseGoodsId;
    }

    public String getGoodsImg() {
        return goodsImg;
    }

    public void setGoodsImg(String goodsImg) {
        this.goodsImg = goodsImg;
    }

    @Override
    public String toString() {
        return "BrowseVO{" +
                "browseRecordId=" + browseRecordId +
                ", browseUserId=" + browseUserId +
                ", browseGoodsId=" + browseGoodsId +
                ", goodsImg='" + goodsImg + '\'' +
                '}';
    }
}
