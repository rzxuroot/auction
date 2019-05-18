package com.jiumu.auction.user.HtController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("html")
public class HtmlController {
    @RequestMapping("/{html}")
    public String forwardHtml(@PathVariable("html")String html){
        System.out.println("---->");
        return html;
    }
}
