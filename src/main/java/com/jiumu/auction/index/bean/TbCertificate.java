package com.jiumu.auction.index.bean;

/**
 * 证书表
 */
public class TbCertificate {

  private long certificateId;
  private long certificatePrice;
  private String certificateNo;


  public long getCertificateId() {
    return certificateId;
  }

  public void setCertificateId(long certificateId) {
    this.certificateId = certificateId;
  }


  public long getCertificatePrice() {
    return certificatePrice;
  }

  public void setCertificatePrice(long certificatePrice) {
    this.certificatePrice = certificatePrice;
  }


  public String getCertificateNo() {
    return certificateNo;
  }

  public void setCertificateNo(String certificateNo) {
    this.certificateNo = certificateNo;
  }

}
