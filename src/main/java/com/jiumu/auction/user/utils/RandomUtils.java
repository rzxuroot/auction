package com.jiumu.auction.user.utils;

import java.util.Random;

public class RandomUtils {
    public static final String numberChar = "0123456789";

    public static String generateStringOfNum(int length) {
        StringBuffer sb = new StringBuffer();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            sb.append(numberChar.charAt(random.nextInt(numberChar.length())));
        }
        return sb.toString();
    }
}
