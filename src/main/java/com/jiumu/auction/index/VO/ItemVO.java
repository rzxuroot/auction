package com.jiumu.auction.index.VO;

import java.io.Serializable;

/**
 * 条件列表，一对多，多的一方
 */
public class ItemVO implements Serializable {

    public static final long serialVersionUID = 2L;
    private long itemId;
    private String itemName;

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
}
