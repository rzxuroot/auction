package com.jiumu.auction.index.service;

import com.jiumu.auction.index.VO.GoodsAndPageVO;
import com.jiumu.auction.index.VO.GoodsVO;
import com.jiumu.auction.index.VO.PageVO;
import com.jiumu.auction.index.info.ConditionInfo;
import com.jiumu.auction.index.info.GoodsFilterInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IGoodsService{
    //首页1通过列表的id查询商品
    List<GoodsVO> queryGoodsByListId(@Param("listId") Integer listId);
    //通过首页1的分类表2id查询商品
    List<GoodsVO> queryGoodsByContentId(@Param("contentId") Integer contentId);
    //通过分类表4多条件查询商品,参数为封装好的对象
    List<GoodsVO> queryGoodsByConditions(ConditionInfo conditionInfo);
    //返回商品集合和分页信息封装的对象
     GoodsAndPageVO queryGoodsAndPageByFilter(GoodsFilterInfo goodsFilterInfo);
    //查询当前筛选条件下的商品数量
    PageVO queryPageInfo(GoodsFilterInfo goodsFilterInfo);

}
