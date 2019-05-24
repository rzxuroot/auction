package com.jiumu.auction.index.mapper;

import com.jiumu.auction.index.VO.TreeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ConditionListMapper {
    List<TreeVO> selectConditionList();
}
