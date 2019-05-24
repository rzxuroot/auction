package com.jiumu.auction.index.service.impl;

import com.jiumu.auction.index.VO.GoodsAndPageVO;
import com.jiumu.auction.index.VO.GoodsVO;
import com.jiumu.auction.index.VO.PageVO;
import com.jiumu.auction.index.info.ConditionInfo;
import com.jiumu.auction.index.info.GoodsFilterInfo;
import com.jiumu.auction.index.mapper.IndexGoodsMapper;
import com.jiumu.auction.index.service.IGoodsService;
import com.jiumu.auction.index.utils.PageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsServiceImpl implements IGoodsService {

    @Autowired
    private IndexGoodsMapper indexGoodsMapper;

    @Override
    //首页1通过列表的id查询商品
    public List<GoodsVO> queryGoodsByListId(Integer listId) {
        return indexGoodsMapper.queryGoodsByListId(listId);
    }

    @Override
    public List<GoodsVO> queryGoodsByContentId(Integer contentId) {
        return indexGoodsMapper.queryGoodsByContentId(contentId);
    }

    @Override
    public List<GoodsVO> queryGoodsByConditions(ConditionInfo conditionInfo){

        Integer pageNo = conditionInfo.getPageNo();
        Integer pageSize = conditionInfo.getPageSize();
        if (pageNo == null) {
            pageNo = 1;
        }
        if (pageSize == null) {
            pageSize = PageUtils.PAGE_SIZE2;
        }
        Integer index = (pageNo -1) * pageSize;
        conditionInfo.setIndex(index);
        conditionInfo.setPageSize(pageSize);
        return indexGoodsMapper.queryGoodsByConditions(conditionInfo);
    }

    //这个方法是根据筛选条件返回信息
    @Override
    public GoodsAndPageVO queryGoodsAndPageByFilter(GoodsFilterInfo goodsFilterInfo) {
        //获得分页查询sql的index和PageSize（每页有多少件商品显示）
        Integer pageNo = goodsFilterInfo.getPageNo();
        Integer pageSize = goodsFilterInfo.getPageSize();
        if (pageSize == null) {
            pageSize = PageUtils.PAGE_SIZE1;
            /*pageSize = PageUtils.PAGE_SIZE2;*/
        }
        if (pageNo == null) {
            pageNo = 1;
        }
        Integer index = (pageNo - 1) * pageSize;
        //给对象的index和pageSize属性赋值
        goodsFilterInfo.setIndex(index);
        goodsFilterInfo.setPageSize(pageSize);
        //获得价格范围区间的起始价格和最终价格，价格范围区间从页面获取，可能为字符串，通过“-”分割
        String crrntPrice = goodsFilterInfo.getCrrntPrice();
        Integer beforePrice = 0;
        Integer endPrice = 0;
        if (crrntPrice != null) {
            String[] strings = crrntPrice.split("-");
            switch (strings[0]){
                case "1万":
                    beforePrice = 1000000;
                    break;
                case "3万":
                    beforePrice = 3000000;
                    break;
                case "5万":
                    beforePrice = 5000000;
                    break;
                case "10万以上":
                    beforePrice = 10000000;
                    break;
                default:
                    beforePrice = Integer.parseInt(strings[0]) * 100;
                    break;
            }
            if(strings.length >= 2){
                switch (strings[1]){
                    case "1万":
                        endPrice = 1000000;
                        break;
                    case "3万":
                        endPrice = 3000000;
                        break;
                    case "5万":
                        endPrice = 5000000;
                        break;
                    case "":
                        endPrice = 10000000;
                        break;
                    default:
                        endPrice = Integer.parseInt(strings[1]) * 100;
                        break;
                }
            }else {
                endPrice = Integer.MAX_VALUE;
            }
        }
        goodsFilterInfo.setBeforePrice(beforePrice);
        goodsFilterInfo.setEndPrice(endPrice);
        //判断itemName是否为空，若不为空就说明需要模糊查询，需要给传入的参数前后添加%
        String itemName = goodsFilterInfo.getItemName();
        if (itemName != null) {
            itemName = "%" + itemName +"%";
            goodsFilterInfo.setItemName(itemName);
        }
        //查询商品集合
        List<GoodsVO> goodsVOList = indexGoodsMapper.queryGoodsByFilter(goodsFilterInfo);
        //通过商品集合的信息得到商品总数和总页数
        PageVO pageVO = indexGoodsMapper.queryPageInfo(goodsFilterInfo);
        //pageVo中只有商品数量，需要得到商品的分页数量
        Integer totalSize = pageVO.getTotalSize();
        Integer totalPage = totalSize % PageUtils.PAGE_SIZE1 == 0 ? totalSize / PageUtils.PAGE_SIZE1 : totalSize /PageUtils.PAGE_SIZE1 +1;
        //将商品集合和分页信息封装到对象返回给页面
        GoodsAndPageVO goodsAndPageVO = new GoodsAndPageVO();
        goodsAndPageVO.setGoodsVOList(goodsVOList);
        goodsAndPageVO.setTotalSize(totalSize);
        goodsAndPageVO.setTotalPage(totalPage);
        return goodsAndPageVO;
    }

    @Override
    public PageVO queryPageInfo(GoodsFilterInfo goodsFilterInfo) {
        PageVO pageVO = indexGoodsMapper.queryPageInfo(goodsFilterInfo);
        return pageVO;
    }
}
