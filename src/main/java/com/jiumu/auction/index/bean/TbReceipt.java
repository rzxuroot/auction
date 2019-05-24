package com.jiumu.auction.index.bean;

/**
 * 收货地址表
 */
public class TbReceipt {

  private long receiptId;
  private long receiptUserId;
  private String province;
  private String city;
  private String detailedAddress;
  private String defaultStatus;
  private String postcode;
  private String receiptName;
  private String receiptTel;


  public long getReceiptId() {
    return receiptId;
  }

  public void setReceiptId(long receiptId) {
    this.receiptId = receiptId;
  }


  public long getReceiptUserId() {
    return receiptUserId;
  }

  public void setReceiptUserId(long receiptUserId) {
    this.receiptUserId = receiptUserId;
  }


  public String getProvince() {
    return province;
  }

  public void setProvince(String province) {
    this.province = province;
  }


  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }


  public String getDetailedAddress() {
    return detailedAddress;
  }

  public void setDetailedAddress(String detailedAddress) {
    this.detailedAddress = detailedAddress;
  }


  public String getDefaultStatus() {
    return defaultStatus;
  }

  public void setDefaultStatus(String defaultStatus) {
    this.defaultStatus = defaultStatus;
  }


  public String getPostcode() {
    return postcode;
  }

  public void setPostcode(String postcode) {
    this.postcode = postcode;
  }


  public String getReceiptName() {
    return receiptName;
  }

  public void setReceiptName(String receiptName) {
    this.receiptName = receiptName;
  }


  public String getReceiptTel() {
    return receiptTel;
  }

  public void setReceiptTel(String receiptTel) {
    this.receiptTel = receiptTel;
  }

}
