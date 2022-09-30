//package com.ssafy.gsdd.Message;
//
//import net.nurigo.java_sdk.api.Message;
//import net.nurigo.java_sdk.exceptions.CoolsmsException;
//import org.json.simple.JSONObject;
//
//import java.util.HashMap;
//
//public class sendMessage {
//    public static void main(String[] args) {
//        String api_key = "NCSC99NGOPPB254F";
//        String api_secret = "7MTVIDK0NQ80F0DKJMCUSLQRFYDPRJG9";
//        Message coolsms = new Message(api_key, api_secret);
//
//        // 4 params(to, from, type, text) are mandatory. must be filled
//        HashMap<String, String> params = new HashMap<String, String>();
//        params.put("to", "010-4907-6427");
//        params.put("from", "010-4907-6427"); //무조건 자기번호 (인증)
//        params.put("type", "SMS");
//        params.put("text", "[GSDD] 전수빈님이 삼성화재연수원에서 위험에 쳐했습니다");
//        params.put("app_version", "test app 1.2"); // application name and version
//
//        try {
//            //send() 는 메시지를 보내는 함수
//            JSONObject obj = (JSONObject) coolsms.send(params);
//            System.out.println(obj.toString());
//        } catch (CoolsmsException e) {
//            System.out.println(e.getMessage());
//            System.out.println(e.getCode());
//        }
//    }
//}
//
