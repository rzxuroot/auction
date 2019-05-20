package com.jiumu.auction;


import com.jiumu.auction.user.utils.MD5Utils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@MapperScan("com.jiumu.auction.test1.mapper")
public class AuctionApplicationTests {
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Test
    public void contextLoads() {
//        StringRedisTemplate redisTemplate= new StringRedisTemplate();
        redisTemplate.boundValueOps("au").set("zhangsan");
        String au = redisTemplate.boundValueOps("au").get();
        System.out.println(au);
    }
    @Test
    public  void test1(){
        String md5 = MD5Utils.md5("123456", "sala");
        System.out.println(md5);
    }

}
