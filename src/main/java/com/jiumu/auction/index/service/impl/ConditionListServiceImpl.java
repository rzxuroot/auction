package com.jiumu.auction.index.service.impl;

import com.jiumu.auction.index.VO.TreeVO;
import com.jiumu.auction.index.mapper.ConditionListMapper;
import com.jiumu.auction.index.service.IConditionListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConditionListServiceImpl implements IConditionListService {

    @Autowired
    private ConditionListMapper conditionListMapper;
    @Override
    //获得首页2条件筛选列表
    public List<TreeVO> selectConditionList() {
        return conditionListMapper.selectConditionList();
    }
}
