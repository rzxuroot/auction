package com.jiumu.auction.index.bean;

/**
 * 关注表
 */
public class TbAttention {

  private long attentionId;
  private long attentionUserId;
  private long attentionGoodsId;


  public long getAttentionId() {
    return attentionId;
  }

  public void setAttentionId(long attentionId) {
    this.attentionId = attentionId;
  }


  public long getAttentionUserId() {
    return attentionUserId;
  }

  public void setAttentionUserId(long attentionUserId) {
    this.attentionUserId = attentionUserId;
  }


  public long getAttentionGoodsId() {
    return attentionGoodsId;
  }

  public void setAttentionGoodsId(long attentionGoodsId) {
    this.attentionGoodsId = attentionGoodsId;
  }

}
