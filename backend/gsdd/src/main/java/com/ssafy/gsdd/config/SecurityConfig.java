package com.ssafy.gsdd.config;

import com.ssafy.gsdd.Filter.LoginFilter;
import com.ssafy.gsdd.config.oauth.provider.CustomOAuth2UserService;
import com.ssafy.gsdd.entity.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    private  final CorsFilter corsFilter;
    private final JwtProvider jwtProvider;

    // CORS 허용 적용
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.addFilterBefore(new LoginFilter(), BasicAuthenticationFilter.class);
        http.csrf().disable()
            .headers().frameOptions().disable()
            .and()
            //.addFilter(corsFilter)
            .authorizeRequests()
            .antMatchers("/", "/css/**", "/images/**", "/js/**", "/h2/**", "/h2-console/**").permitAll()
            .antMatchers("/api/**").hasRole(Role.USER.name())
            .anyRequest().authenticated()
            .and()
            .formLogin().disable()
            .logout().logoutSuccessUrl("/")
            .and()
            .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)
            .oauth2Login()
            .successHandler(authenticationSuccessHandler) //인증 프로세스에 따라 사용자 정의 로직을 실행.
            .userInfoEndpoint()
            .userService(customOAuth2UserService); //로그인이 성공하면 해당 유저의 정보를 들고 customOAuth2UserService에서 후처리
    }

    @Bean
    public JwtFilter jwtFilter(){
        return new JwtFilter(jwtProvider);
    }


}