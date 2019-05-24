package com.jiumu.auction.index.controller;

import com.jiumu.auction.index.VO.TreeVO;
import com.jiumu.auction.index.info.JsonResult;
import com.jiumu.auction.index.service.IConditionListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/conditionList")
//获得首页2筛选条件列表的controller
public class ConditionListController {

    @Autowired
    private IConditionListService conditionListService;

    //获得首页2的条件列表
    @RequestMapping(value="/getList",method = RequestMethod.GET)
    public List<TreeVO> getConditionList(){
        List<TreeVO> treeVOS = conditionListService.selectConditionList();
        return treeVOS;
    }
}
