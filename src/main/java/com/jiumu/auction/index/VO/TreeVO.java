package com.jiumu.auction.index.VO;

import java.io.Serializable;
import java.util.List;

/**
 * 条件列表，一的一方
 */
public class TreeVO implements Serializable {

    public static final long serialVersionUID = 1L;
    private long treeId;
    private String treeName;
    private List<ItemVO> itemVOS;


    public long getTreeId() {
        return treeId;
    }

    public void setTreeId(long treeId) {
        this.treeId = treeId;
    }

    public String getTreeName() {
        return treeName;
    }

    public void setTreeName(String treeName) {
        this.treeName = treeName;
    }

    public List<ItemVO> getItemVOS() {
        return itemVOS;
    }

    public void setItemVOS(List<ItemVO> itemVOS) {
        this.itemVOS = itemVOS;
    }
}
