package com.jiumu.auction.commons.logger;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
@Component
@Aspect
public class LoggerProxy {
    Logger logger=Logger.getLogger(LoggerProxy.class);
    @Around("execution(public * com.jiumu.auction..*.*(..))")
    public Object logger(ProceedingJoinPoint joinPoint){

        try {

            String kind = joinPoint.getKind();
            Object[] args = joinPoint.getArgs();
            if(args.length > 0){
                logger.debug("传入参数"+kind +":"+args[0]);
                Object proceed = joinPoint.proceed();
                logger.debug("返回值："+proceed);
                return proceed;
            }
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            //错误日志
            logger.warn(throwable.getMessage());
        }
        return null;
    }
}
