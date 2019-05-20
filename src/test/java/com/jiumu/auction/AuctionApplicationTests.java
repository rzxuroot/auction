package com.jiumu.auction;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
@MapperScan("com.jiumu.auction.test1.mapper")
public class AuctionApplicationTests {
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Test
    public void contextLoads() {
//        StringRedisTemplate redisTemplate= new StringRedisTemplate();
        redisTemplate.boundValueOps("au11").set("zhangsan");
        String au = redisTemplate.boundValueOps("au11").get();
        System.out.println(au);
    }
    @Test
    public void test1(){
        float a=1.0f;
        Long b=(long)a;
        System.out.println(b);
    }
    @Test
    public void test2(){
        Long t=2*60*1000l;
        Timestamp a= Timestamp.valueOf("2019-05-20 11:53:07");

        Date date = new Date();

        long time = a.getTime();
        long l = time + t;
        long l1 = l - t;
        Timestamp times1 = new Timestamp(l1);
        Timestamp times = new Timestamp(l);
        System.out.println("time:jiajian"+ time+"--------"+times+"++++"+times1);
        System.out.println("时间加Time"+ date+"--------"+a);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format1 = format.format(date);
        Timestamp timestamp = Timestamp.valueOf(format1);
        long time1 = timestamp.getTime();
        Long i = time - time1;

        System.out.println("longlong"+ time+"-----"+time1+"==="+i+"and两分钟等于"+t);
        Timestamp timestamp1 = new Timestamp(i);
        System.out.println("jeishu时间-当前时间=最终时间"+a+"---"+timestamp+"==="+ timestamp1);
    }

}
