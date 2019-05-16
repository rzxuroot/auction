package com.jiumu.auction.dataile.contorller;

import com.jiumu.auction.dataile.po.TbGoods;
import com.jiumu.auction.dataile.service.IGoodsService;
import com.jiumu.auction.dataile.vo.GoodsVO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


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
        GoodsVO goods = goodsServiceImpl.queryGoodsById(1l);
        model.addAttribute("goods",goods);
        logger.info("查询出来的对象"+goods);
        return "detaile";
    }
}
