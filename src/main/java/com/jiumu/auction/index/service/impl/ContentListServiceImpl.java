package com.jiumu.auction.index.service.impl;

import com.jiumu.auction.index.VO.ListVO;
import com.jiumu.auction.index.mapper.ContentListMapper;
import com.jiumu.auction.index.service.IContentListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentListServiceImpl implements IContentListService {

    @Autowired
    private ContentListMapper contentListMapper;
    @Override
    //获得首页1目录列表的方法
    public List<ListVO> selectContentList() {
        return contentListMapper.selectContentList();
    }
}
