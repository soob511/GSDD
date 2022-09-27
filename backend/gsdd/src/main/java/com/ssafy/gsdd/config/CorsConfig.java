package com.ssafy.gsdd.config;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);//내서버가 응답을 할때  처리할수 있게 할지를 설정하는것
        config.addAllowedOrigin("*");//모든 ip에 대한 응답을 허용하겠다
        config.addAllowedHeader("*");//모든 header에 응답을 허용하겠다
        config.addAllowedMethod("*");//모든 post,get,put,delete,patch요청을 허용하겠다.
        source.registerCorsConfiguration("/api/**",config);
        return new CorsFilter();

    }
}
