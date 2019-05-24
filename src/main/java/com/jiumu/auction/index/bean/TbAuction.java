package com.jiumu.auction.index.bean;

/**
 * 竞拍表
 */
public class TbAuction {

  private long auctionId;
  private long auctionUserId;
  private long auctionGoodsId;
  private String auctionStatus;


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


  public String getAuctionStatus() {
    return auctionStatus;
  }

  public void setAuctionStatus(String auctionStatus) {
    this.auctionStatus = auctionStatus;
  }

}
