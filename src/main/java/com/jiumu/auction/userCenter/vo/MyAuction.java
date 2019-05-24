package com.jiumu.auction.userCenter.vo;


import java.util.List;

public class MyAuction {

  private String auctionIsing;
  private String auctionIsout;
  private String auctionIslead;
  private long auctionPrice;
  private String goodsName;
  private String goodsImg;
  private String goodsNo;

  public String getAuctionIsing() {
    switch (this.auctionIsing){
      case "yes":
        return "竞拍中";
      case "no":
        return "已结束";
    }
    return auctionIsing;
  }

  public void setAuctionIsing(String auctionIsing) {

    this.auctionIsing = auctionIsing;
  }


  public String getAuctionIsout() {
    switch (this.auctionIsout){
      case "yes":
        return "已出局";
      case "no":
        return "未出局";
    }
    return auctionIsout;
  }

  public void setAuctionIsout(String auctionIsout) {

    this.auctionIsout = auctionIsout;
  }


  public String getAuctionIslead() {
    switch (this.auctionIslead){
      case "yes":
        return "已领先";
      case "no":
        return "未领先";
    }
    return auctionIslead;
  }

  public void setAuctionIslead(String auctionIslead) {
    this.auctionIslead = auctionIslead;
  }


  public long getAuctionPrice() {
    return auctionPrice;
  }

  public void setAuctionPrice(long auctionPrice) {
    this.auctionPrice = auctionPrice;
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

  public String getGoodsNo() {
    return goodsNo;
  }

  public void setGoodsNo(String goodsNo) {
    this.goodsNo = goodsNo;
  }
}
