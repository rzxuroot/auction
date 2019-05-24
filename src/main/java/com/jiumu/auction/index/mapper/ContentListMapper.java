package com.jiumu.auction.index.mapper;

import com.jiumu.auction.index.VO.ListVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ContentListMapper {
    //获得首页1目录列表的方法
    List<ListVO> selectContentList();
}
