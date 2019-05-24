package com.jiumu.auction.index.service;

import com.jiumu.auction.index.VO.ListVO;

import java.util.List;

public interface IContentListService {

    //获得首页1目录列表的方法
    List<ListVO> selectContentList();
}
