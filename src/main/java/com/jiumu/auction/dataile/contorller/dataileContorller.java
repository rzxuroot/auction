package com.jiumu.auction.dataile.contorller;

import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.po.TbUser;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.BrowseVO;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;
import com.jiumu.auction.myAttention.service.IAttentionService;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
@RequestMapping("/dataile")
public class dataileContorller {
    @Autowired
    private IGoodsService goodsServiceImpl;
    @Autowired
    private IAttentionService attentionServiceImpl;
    private Logger logger=Logger.getLogger(dataileContorller.class);
    /**
     * 查询商品详情
     * @param goodsId
     * @param model
     * @return
     */
    @RequestMapping("/goodsDataile")
    public String  goodsDataile(String goodsId,Model model){
        Long gid=0l;
        if (goodsId!=null){
            gid=Long.parseLong(goodsId);
        }
        //获取商品对象
        GoodsVO goods = goodsServiceImpl.queryGoodsById(gid);
        //获取历史价格集合
        List<HistoricalPriceVO> historicalPriceList=null;
        historicalPriceList = goodsServiceImpl.queryHistoricalPriceByGoodsId(gid);
        int countHistorical = goodsServiceImpl.queryCountHistorical(gid);

        model.addAttribute("countHistorical",countHistorical);
        //存入model传到前端
        model.addAttribute("historicalPriceList",historicalPriceList);
        logger.info("查询出来的历史价格集合对象"+historicalPriceList);
        //添加我的浏览
        goodsServiceImpl.addBrowse(gid);
        //查询我的浏览
        List<BrowseVO> browseVOS=null;
        browseVOS = goodsServiceImpl.queryBrowseList();
        //查询是否关注当前商品
        int isAttentionGoods = attentionServiceImpl.queryAttentionByGoodsIdAndUserId(gid);
        //查询当前商品的关注数
        int attentionNumber = attentionServiceImpl.queryCountAttention(gid);
        //存入model
        model.addAttribute("isAttention",isAttentionGoods);
        model.addAttribute("attentionNumber",attentionNumber);
        //存入model
        model.addAttribute("browseVOS",browseVOS);
        model.addAttribute("goods",goods);
        logger.info("查询出来的对象"+goods);
        return "detaile";
    }
}
