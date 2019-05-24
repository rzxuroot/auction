package com.jiumu.auction.index.bean;


import java.sql.Timestamp;

public class TbGoods {

  private long goodsId;
  private long goodsContentId;
  private String auctionNo;
  private String goodsNo;
  private String goodsName;
  private String explainNote;
  private String explainInfo;
  private String explainAdd;
  private String goodsImg;
  private long askingPrice;
  private long biddingSteps;
  private long bout;
  private long author;
  private long year1;
  private long texture;
  private long shape;
  private String length1;
  private String width;
  private String height;
  private String diameter;
  private Timestamp preStartTime;
  private Timestamp preDeadline;
  private Timestamp auctionStartTime;
  private Timestamp auctionDeadline;
  private String goodsStatus;
  private Timestamp layoutTime;


  public long getGoodsId() {
    return goodsId;
  }

  public void setGoodsId(long goodsId) {
    this.goodsId = goodsId;
  }


  public long getGoodsContentId() {
    return goodsContentId;
  }

  public void setGoodsContentId(long goodsContentId) {
    this.goodsContentId = goodsContentId;
  }


  public String getAuctionNo() {
    return auctionNo;
  }

  public void setAuctionNo(String auctionNo) {
    this.auctionNo = auctionNo;
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


  public String getExplainNote() {
    return explainNote;
  }

  public void setExplainNote(String explainNote) {
    this.explainNote = explainNote;
  }


  public String getExplainInfo() {
    return explainInfo;
  }

  public void setExplainInfo(String explainInfo) {
    this.explainInfo = explainInfo;
  }


  public String getExplainAdd() {
    return explainAdd;
  }

  public void setExplainAdd(String explainAdd) {
    this.explainAdd = explainAdd;
  }


  public String getGoodsImg() {
    return goodsImg;
  }

  public void setGoodsImg(String goodsImg) {
    this.goodsImg = goodsImg;
  }


  public long getAskingPrice() {
    return askingPrice;
  }

  public void setAskingPrice(long askingPrice) {
    this.askingPrice = askingPrice;
  }


  public long getBiddingSteps() {
    return biddingSteps;
  }

  public void setBiddingSteps(long biddingSteps) {
    this.biddingSteps = biddingSteps;
  }


  public long getBout() {
    return bout;
  }

  public void setBout(long bout) {
    this.bout = bout;
  }


  public long getAuthor() {
    return author;
  }

  public void setAuthor(long author) {
    this.author = author;
  }


  public long getYear1() {
    return year1;
  }

  public void setYear1(long year1) {
    this.year1 = year1;
  }


  public long getTexture() {
    return texture;
  }

  public void setTexture(long texture) {
    this.texture = texture;
  }


  public long getShape() {
    return shape;
  }

  public void setShape(long shape) {
    this.shape = shape;
  }


  public String getLength1() {
    return length1;
  }

  public void setLength1(String length1) {
    this.length1 = length1;
  }


  public String getWidth() {
    return width;
  }

  public void setWidth(String width) {
    this.width = width;
  }


  public String getHeight() {
    return height;
  }

  public void setHeight(String height) {
    this.height = height;
  }


  public String getDiameter() {
    return diameter;
  }

  public void setDiameter(String diameter) {
    this.diameter = diameter;
  }


  public Timestamp getPreStartTime() {
    return preStartTime;
  }

  public void setPreStartTime(Timestamp preStartTime) {
    this.preStartTime = preStartTime;
  }


  public Timestamp getPreDeadline() {
    return preDeadline;
  }

  public void setPreDeadline(Timestamp preDeadline) {
    this.preDeadline = preDeadline;
  }


  public Timestamp getAuctionStartTime() {
    return auctionStartTime;
  }

  public void setAuctionStartTime(Timestamp auctionStartTime) {
    this.auctionStartTime = auctionStartTime;
  }


  public Timestamp getAuctionDeadline() {
    return auctionDeadline;
  }

  public void setAuctionDeadline(Timestamp auctionDeadline) {
    this.auctionDeadline = auctionDeadline;
  }


  public String getGoodsStatus() {
    return goodsStatus;
  }

  public void setGoodsStatus(String goodsStatus) {
    this.goodsStatus = goodsStatus;
  }


  public Timestamp getLayoutTime() {
    return layoutTime;
  }

  public void setLayoutTime(Timestamp layoutTime) {
    this.layoutTime = layoutTime;
  }
}
