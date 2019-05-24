package com.jiumu.auction.index.VO;

import com.jiumu.auction.index.utils.PageUtils;

import java.util.List;

public class GoodsAndPageVO {
    //商品信息的集合，
    private List<GoodsVO> goodsVOList;
    //当前筛选条件下商品的总数
    private Integer totalSize;
    //当前筛选条件下经过分页后的页数
    private Integer totalPage;

    public List<GoodsVO> getGoodsVOList() {
        return goodsVOList;
    }

    public void setGoodsVOList(List<GoodsVO> goodsVOList) {
        this.goodsVOList = goodsVOList;
    }

    public Integer getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(Integer totalSize) {
        this.totalSize = totalSize;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }
}
