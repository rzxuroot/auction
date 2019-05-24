package com.jiumu.auction.index.info;

/**
 *从浏览器获得的筛选条件信息封装到此对象
 */
public class ConditionInfo {

    private Integer itemBoutId;
    private Integer authorId;
    private Integer itemYeal1Id;
    private Integer itemTextureId;
    private Integer itemShapeId;
    private Integer beforePrice;
    private Integer endPrice;
    private Integer goodsStatus;
    private Integer pageNo;
    private Integer pageSize;
    private Integer index;

    public Integer getItemBoutId() {
        return itemBoutId;
    }

    public void setItemBoutId(Integer itemBoutId) {
        this.itemBoutId = itemBoutId;
    }

    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer authorId) {
        this.authorId = authorId;
    }

    public Integer getItemYeal1Id() {
        return itemYeal1Id;
    }

    public void setItemYeal1Id(Integer itemYeal1Id) {
        this.itemYeal1Id = itemYeal1Id;
    }

    public Integer getItemTextureId() {
        return itemTextureId;
    }

    public void setItemTextureId(Integer itemTextureId) {
        this.itemTextureId = itemTextureId;
    }

    public Integer getItemShapeId() {
        return itemShapeId;
    }

    public void setItemShapeId(Integer itemShapeId) {
        this.itemShapeId = itemShapeId;
    }

    public Integer getBeforePrice() {
        return beforePrice;
    }

    public void setBeforePrice(Integer beforePrice) {
        this.beforePrice = beforePrice;
    }

    public Integer getEndPrice() {
        return endPrice;
    }

    public void setEndPrice(Integer endPrice) {
        this.endPrice = endPrice;
    }

    public Integer getGoodsStatus() {
        return goodsStatus;
    }

    public void setGoodsStatus(Integer goodsStatus) {
        this.goodsStatus = goodsStatus;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
