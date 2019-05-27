package com.jiumu.auction.index.info;

public class GoodsFilterInfo {

    //一级目录的名称，从homePage.html通过?传值
    private String contentName;
    //二级目录的名称，从homePage.html通过?传值
    private String listName;
    //进行全局搜索时使用
    private String itemName;
    //一级目录id
    private Integer firstCatgId;
    //二级目录id
    private Integer secondCatgId;
    //全部：all  未结束拍品：now  已结束拍品：end 注意查询全
    // 部拍品时需要剔除已下线的拍品（考虑将已下线的字段设为all）
    private String timeFlag;
    //作者姓名
    private String authorName;
    //竞价区间
    private String crrntPrice;
    //通过竞价区间得到最低价
    private Integer beforePrice;
    //通过竞价区间得到最高价
    private Integer endPrice;
    //年代
    private String itemAge;
    //质地
    private String material;
    //专场
    private String srName;
    //形式
    private String style;
    //分页页数（每一页显示多少件商品）
    private Integer pageSize;
    //当前页码
    private Integer pageNo;
    //sql语句中limit的index
    private Integer index;

    public String getContentName() {
        return contentName;
    }

    public void setContentName(String contentName) {
        this.contentName = contentName;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public Integer getFirstCatgId() {
        return firstCatgId;
    }

    public void setFirstCatgId(Integer firstCatgId) {
        this.firstCatgId = firstCatgId;
    }

    public Integer getSecondCatgId() {
        return secondCatgId;
    }

    public void setSecondCatgId(Integer secondCatgId) {
        this.secondCatgId = secondCatgId;
    }

    public String getTimeFlag() {
        return timeFlag;
    }

    public void setTimeFlag(String timeFlag) {
        this.timeFlag = timeFlag;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getCrrntPrice() {
        return crrntPrice;
    }

    public void setCrrntPrice(String crrntPrice) {
        this.crrntPrice = crrntPrice;
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

    public String getItemAge() {
        return itemAge;
    }

    public void setItemAge(String itemAge) {
        this.itemAge = itemAge;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getSrName() {
        return srName;
    }

    public void setSrName(String srName) {
        this.srName = srName;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
