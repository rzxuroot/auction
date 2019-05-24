package com.jiumu.auction.order.po;


public class TbOrder {

  private long orderId;
  private long orderUserId;
  private long orderGoodsId;
  private long orderCertificateId;
  private String orderJudge;
  private String paymentStatus;
  private java.sql.Timestamp orderTime;
  private String orderNo;
  private long freight;
  private String seller;
  private String pickType;
  private String invoiceChoose;
  private String stockStatus;
  private String otherCharges;
  private String refundStatus;
  private long premiums;
  private String buyerMsg;
  private long transactionPrice;
  private long totalPrice;
  private String anyCertificate;


  public long getOrderId() {
    return orderId;
  }

  public void setOrderId(long orderId) {
    this.orderId = orderId;
  }


  public long getOrderUserId() {
    return orderUserId;
  }

  public void setOrderUserId(long orderUserId) {
    this.orderUserId = orderUserId;
  }


  public long getOrderGoodsId() {
    return orderGoodsId;
  }

  public void setOrderGoodsId(long orderGoodsId) {
    this.orderGoodsId = orderGoodsId;
  }


  public long getOrderCertificateId() {
    return orderCertificateId;
  }

  public void setOrderCertificateId(long orderCertificateId) {
    this.orderCertificateId = orderCertificateId;
  }


  public String getOrderJudge() {
    return orderJudge;
  }

  public void setOrderJudge(String orderJudge) {
    this.orderJudge = orderJudge;
  }


  public String getPaymentStatus() {
    return paymentStatus;
  }

  public void setPaymentStatus(String paymentStatus) {
    this.paymentStatus = paymentStatus;
  }


  public java.sql.Timestamp getOrderTime() {
    return orderTime;
  }

  public void setOrderTime(java.sql.Timestamp orderTime) {
    this.orderTime = orderTime;
  }


  public String getOrderNo() {
    return orderNo;
  }

  public void setOrderNo(String orderNo) {
    this.orderNo = orderNo;
  }


  public long getFreight() {
    return freight;
  }

  public void setFreight(long freight) {
    this.freight = freight;
  }


  public String getSeller() {
    return seller;
  }

  public void setSeller(String seller) {
    this.seller = seller;
  }


  public String getPickType() {
    return pickType;
  }

  public void setPickType(String pickType) {
    this.pickType = pickType;
  }


  public String getInvoiceChoose() {
    return invoiceChoose;
  }

  public void setInvoiceChoose(String invoiceChoose) {
    this.invoiceChoose = invoiceChoose;
  }


  public String getStockStatus() {
    return stockStatus;
  }

  public void setStockStatus(String stockStatus) {
    this.stockStatus = stockStatus;
  }


  public String getOtherCharges() {
    return otherCharges;
  }

  public void setOtherCharges(String otherCharges) {
    this.otherCharges = otherCharges;
  }


  public String getRefundStatus() {
    return refundStatus;
  }

  public void setRefundStatus(String refundStatus) {
    this.refundStatus = refundStatus;
  }


  public long getPremiums() {
    return premiums;
  }

  public void setPremiums(long premiums) {
    this.premiums = premiums;
  }


  public String getBuyerMsg() {
    return buyerMsg;
  }

  public void setBuyerMsg(String buyerMsg) {
    this.buyerMsg = buyerMsg;
  }


  public long getTransactionPrice() {
    return transactionPrice;
  }

  public void setTransactionPrice(long transactionPrice) {
    this.transactionPrice = transactionPrice;
  }


  public long getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(long totalPrice) {
    this.totalPrice = totalPrice;
  }


  public String getAnyCertificate() {
    return anyCertificate;
  }

  public void setAnyCertificate(String anyCertificate) {
    this.anyCertificate = anyCertificate;
  }

}
