package com.jiumu.auction.myAuction.po;


public class TbAuction {

  private long auctionId;
  private long auctionUserId;
  private long auctionGoodsId;
  private String auctionIsing;
  private String auctionIsout;
  private String auctionIslead;
  private long auctionPrice;


  public long getAuctionId() {
    return auctionId;
  }

  public void setAuctionId(long auctionId) {
    this.auctionId = auctionId;
  }


  public long getAuctionUserId() {
    return auctionUserId;
  }

  public void setAuctionUserId(long auctionUserId) {
    this.auctionUserId = auctionUserId;
  }


  public long getAuctionGoodsId() {
    return auctionGoodsId;
  }

  public void setAuctionGoodsId(long auctionGoodsId) {
    this.auctionGoodsId = auctionGoodsId;
  }


  public String getAuctionIsing() {
    return auctionIsing;
  }

  public void setAuctionIsing(String auctionIsing) {
    this.auctionIsing = auctionIsing;
  }


  public String getAuctionIsout() {
    return auctionIsout;
  }

  public void setAuctionIsout(String auctionIsout) {
    this.auctionIsout = auctionIsout;
  }


  public String getAuctionIslead() {
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

}
