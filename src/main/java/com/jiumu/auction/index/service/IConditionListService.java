package com.jiumu.auction.index.service;

import com.jiumu.auction.index.VO.TreeVO;

import java.util.List;

public interface IConditionListService {

    //获得首页2条件筛选列表
    List<TreeVO> selectConditionList();
}
