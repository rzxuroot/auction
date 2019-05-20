package com.jiumu.auction.dataile.po;


public class TbGoods {

  private long goodsId;
  private long goodsContentId;
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
  private long year;
  private long texture;
  private String shape;
  private String length;
  private String width;
  private String height;
  private String diameter;
  private java.sql.Timestamp preStartTime;
  private java.sql.Timestamp preDeadline;
  private java.sql.Timestamp auctionStartTime;
  private java.sql.Timestamp auctionDeadline;
  private String obligate1;
  private String obligate2;


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


  public long getYear() {
    return year;
  }

  public void setYear(long year) {
    this.year = year;
  }


  public long getTexture() {
    return texture;
  }

  public void setTexture(long texture) {
    this.texture = texture;
  }


  public String getShape() {
    return shape;
  }

  public void setShape(String shape) {
    this.shape = shape;
  }


  public String getLength() {
    return length;
  }

  public void setLength(String length) {
    this.length = length;
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


  public java.sql.Timestamp getPreStartTime() {
    return preStartTime;
  }

  public void setPreStartTime(java.sql.Timestamp preStartTime) {
    this.preStartTime = preStartTime;
  }


  public java.sql.Timestamp getPreDeadline() {
    return preDeadline;
  }

  public void setPreDeadline(java.sql.Timestamp preDeadline) {
    this.preDeadline = preDeadline;
  }


  public java.sql.Timestamp getAuctionStartTime() {
    return auctionStartTime;
  }

  public void setAuctionStartTime(java.sql.Timestamp auctionStartTime) {
    this.auctionStartTime = auctionStartTime;
  }


  public java.sql.Timestamp getAuctionDeadline() {
    return auctionDeadline;
  }

  public void setAuctionDeadline(java.sql.Timestamp auctionDeadline) {
    this.auctionDeadline = auctionDeadline;
  }


  public String getObligate1() {
    return obligate1;
  }

  public void setObligate1(String obligate1) {
    this.obligate1 = obligate1;
  }


  public String getObligate2() {
    return obligate2;
  }

  public void setObligate2(String obligate2) {
    this.obligate2 = obligate2;
  }

  @Override
  public String toString() {
    return "TbGoods{" +
            "goodsId=" + goodsId +
            ", goodsContentId=" + goodsContentId +
            ", goodsNo='" + goodsNo + '\'' +
            ", goodsName='" + goodsName + '\'' +
            ", explainNote='" + explainNote + '\'' +
            ", explainInfo='" + explainInfo + '\'' +
            ", explainAdd='" + explainAdd + '\'' +
            ", goodsImg='" + goodsImg + '\'' +
            ", askingPrice=" + askingPrice +
            ", biddingSteps=" + biddingSteps +
            ", bout=" + bout +
            ", author=" + author +
            ", year=" + year +
            ", texture=" + texture +
            ", shape='" + shape + '\'' +
            ", length='" + length + '\'' +
            ", width='" + width + '\'' +
            ", height='" + height + '\'' +
            ", diameter='" + diameter + '\'' +
            ", preStartTime=" + preStartTime +
            ", preDeadline=" + preDeadline +
            ", auctionStartTime=" + auctionStartTime +
            ", auctionDeadline=" + auctionDeadline +
            ", obligate1='" + obligate1 + '\'' +
            ", obligate2='" + obligate2 + '\'' +
            '}';
  }
}
