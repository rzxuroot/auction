package com.jiumu.auction.myAuction.controller;

import com.jiumu.auction.myAuction.service.IAuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/myAuction")
public class AuctionController {
    @Autowired
    private IAuctionService auctionServiceImpl;
    @RequestMapping("/updateState")
    public void updateAuction(String goodsId){
        Long id=0l;
        if (goodsId!=null){
            id=Long.parseLong(goodsId);
        }
//        auctionServiceImpl.updateMyAuction(id);
    }
}
