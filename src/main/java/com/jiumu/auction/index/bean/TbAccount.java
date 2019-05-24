package com.jiumu.auction.index.bean;

/**
 * 账户表
 */
public class TbAccount {

  private long accountId;
  private long accountUserId;
  private long accountBalance;
  private long deposit;
  private long totalMarginMoney;
  private long freezeMarginMoney;
  private long availableMarginMoney;
  private long totalMarginLimit;
  private long freezeMarginLimit;
  private long availableMarginLimit;
  private long creditLimit;
  private String accountStatus;


  public long getAccountId() {
    return accountId;
  }

  public void setAccountId(long accountId) {
    this.accountId = accountId;
  }


  public long getAccountUserId() {
    return accountUserId;
  }

  public void setAccountUserId(long accountUserId) {
    this.accountUserId = accountUserId;
  }


  public long getAccountBalance() {
    return accountBalance;
  }

  public void setAccountBalance(long accountBalance) {
    this.accountBalance = accountBalance;
  }


  public long getDeposit() {
    return deposit;
  }

  public void setDeposit(long deposit) {
    this.deposit = deposit;
  }


  public long getTotalMarginMoney() {
    return totalMarginMoney;
  }

  public void setTotalMarginMoney(long totalMarginMoney) {
    this.totalMarginMoney = totalMarginMoney;
  }


  public long getFreezeMarginMoney() {
    return freezeMarginMoney;
  }

  public void setFreezeMarginMoney(long freezeMarginMoney) {
    this.freezeMarginMoney = freezeMarginMoney;
  }


  public long getAvailableMarginMoney() {
    return availableMarginMoney;
  }

  public void setAvailableMarginMoney(long availableMarginMoney) {
    this.availableMarginMoney = availableMarginMoney;
  }


  public long getTotalMarginLimit() {
    return totalMarginLimit;
  }

  public void setTotalMarginLimit(long totalMarginLimit) {
    this.totalMarginLimit = totalMarginLimit;
  }


  public long getFreezeMarginLimit() {
    return freezeMarginLimit;
  }

  public void setFreezeMarginLimit(long freezeMarginLimit) {
    this.freezeMarginLimit = freezeMarginLimit;
  }


  public long getAvailableMarginLimit() {
    return availableMarginLimit;
  }

  public void setAvailableMarginLimit(long availableMarginLimit) {
    this.availableMarginLimit = availableMarginLimit;
  }


  public long getCreditLimit() {
    return creditLimit;
  }

  public void setCreditLimit(long creditLimit) {
    this.creditLimit = creditLimit;
  }


  public String getAccountStatus() {
    return accountStatus;
  }

  public void setAccountStatus(String accountStatus) {
    this.accountStatus = accountStatus;
  }

}
