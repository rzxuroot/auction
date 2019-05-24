package com.jiumu.auction.index.mapper;

import com.jiumu.auction.index.VO.GoodsVO;
import com.jiumu.auction.index.VO.PageVO;
import com.jiumu.auction.index.info.ConditionInfo;
import com.jiumu.auction.index.info.GoodsFilterInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface IndexGoodsMapper {

    //首页1通过列表的id查询商品
    List<GoodsVO> queryGoodsByListId(@Param("listId") Integer listId);
    //通过首页1的分类表2id查询商品
    List<GoodsVO> queryGoodsByContentId(@Param("contentId") Integer contentId);
    //通过分类表4多条件查询商品,参数为封装好的对象
    List<GoodsVO> queryGoodsByConditions(ConditionInfo conditionInfo);
    //通过分类表4多条件查询商品,参数为封装好的对象
    List<GoodsVO> queryGoodsByFilter(GoodsFilterInfo goodsFilterInfo);
    //查询页数信息
    PageVO queryPageInfo(GoodsFilterInfo goodsFilterInfo);
}
