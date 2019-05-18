package com.jiumu.auction.dataile.contorller;

import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.GoodsVO;
import com.jiumu.auction.dataile.vo.HistoricalPriceVO;
import org.apache.log4j.Logger;
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

    private Logger logger=Logger.getLogger(dataileContorller.class);
    /**
     * 查询商品详情
     * @param goodsId
     * @param model
     * @return
     */
    @RequestMapping("/goodsDataile")
    public String  goodsDataile(Long goodsId,Model model){
        //获取商品对象
        GoodsVO goods = goodsServiceImpl.queryGoodsById(1l);
        //获取历史价格集合
        List<HistoricalPriceVO> historicalPriceList = goodsServiceImpl.queryHistoricalPriceByGoodsId(1l);
        //存入model传到前端
        model.addAttribute("historicalPriceList",historicalPriceList);
        logger.info("查询出来的历史价格集合对象"+historicalPriceList);
        model.addAttribute("goods",goods);
        logger.info("查询出来的对象"+goods);
        return "detaile";
    }
}
