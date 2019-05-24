package com.jiumu.auction;

import com.jiumu.auction.commons.beanName.UniqueNameGenerator;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
/*@MapperScan("com.jiumu.auction")*/
@ComponentScan(nameGenerator = UniqueNameGenerator.class)
public class AuctionApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuctionApplication.class, args);
    }

}
