package com.jiumu.auction.index.controller;

import com.jiumu.auction.index.VO.ListVO;
import com.jiumu.auction.index.service.IContentListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/contentList")
//获得首页1目录的controller
public class ContentListController {
    @Autowired
    private IContentListService contentListService;

    @RequestMapping(value = "/getList",method = RequestMethod.GET)
    public List<ListVO> getContentList(){
        List<ListVO> listVOList = contentListService.selectContentList();
        return listVOList;
    }

}
