package com.jiumu.auction.dataile.vo;

import java.sql.Timestamp;

public class HistoricalPriceVO {
    private long historicalPriceId;
    private long historicalUserId;
    private long historicalGoodsId;
    private java.sql.Timestamp auctionTime;
    private long auctionPrice;
    private String no1Judge;
    private String deductJudge;
    private String userName;

    public long getHistoricalPriceId() {
        return historicalPriceId;
    }

    public void setHistoricalPriceId(long historicalPriceId) {
        this.historicalPriceId = historicalPriceId;
    }

    public long getHistoricalUserId() {
        return historicalUserId;
    }

    public void setHistoricalUserId(long historicalUserId) {
        this.historicalUserId = historicalUserId;
    }

    public long getHistoricalGoodsId() {
        return historicalGoodsId;
    }

    public void setHistoricalGoodsId(long historicalGoodsId) {
        this.historicalGoodsId = historicalGoodsId;
    }

    public Timestamp getAuctionTime() {
        return auctionTime;
    }

    public void setAuctionTime(Timestamp auctionTime) {
        this.auctionTime = auctionTime;
    }

    public long getAuctionPrice() {
        return auctionPrice/100;
    }

    public void setAuctionPrice(long auctionPrice) {
        this.auctionPrice = auctionPrice;
    }

    public String getNo1Judge() {
        return no1Judge;
    }

    public void setNo1Judge(String no1Judge) {
        this.no1Judge = no1Judge;
    }

    public String getDeductJudge() {
        return deductJudge;
    }

    public void setDeductJudge(String deductJudge) {
        this.deductJudge = deductJudge;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "HistoricalPriceVO{" +
                "historicalPriceId=" + historicalPriceId +
                ", historicalUserId=" + historicalUserId +
                ", historicalGoodsId=" + historicalGoodsId +
                ", auctionTime=" + auctionTime +
                ", auctionPrice=" + auctionPrice +
                ", no1Judge='" + no1Judge + '\'' +
                ", deductJudge='" + deductJudge + '\'' +
                ", userName='" + userName + '\'' +
                '}';
    }
}
