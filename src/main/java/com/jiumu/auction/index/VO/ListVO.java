package com.jiumu.auction.index.VO;

import java.util.List;

/**
 * 首页1目录列表，一的一方
 */
public class ListVO {

    private long listId;
    private String listName;
    private List<ContentVO> contentVOList;

    public long getListId() {
        return listId;
    }

    public void setListId(long listId) {
        this.listId = listId;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public List<ContentVO> getContentVOList() {
        return contentVOList;
    }

    public void setContentVOList(List<ContentVO> contentVOList) {
        this.contentVOList = contentVOList;
    }
}
