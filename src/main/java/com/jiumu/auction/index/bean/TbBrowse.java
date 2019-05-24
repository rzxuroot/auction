package com.jiumu.auction.index.bean;

/**
 * 浏览记录表
 */
public class TbBrowse {

  private long browseRecordId;
  private long browseUserId;
  private long browseGoodsId;
  private java.sql.Timestamp browseRecordTime;


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


  public java.sql.Timestamp getBrowseRecordTime() {
    return browseRecordTime;
  }

  public void setBrowseRecordTime(java.sql.Timestamp browseRecordTime) {
    this.browseRecordTime = browseRecordTime;
  }

}
