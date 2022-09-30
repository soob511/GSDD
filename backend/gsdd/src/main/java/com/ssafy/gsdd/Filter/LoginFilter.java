package com.ssafy.gsdd.Filter;

import javax.servlet.*;
import java.io.IOException;


public class LoginFilter implements Filter {


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("로그인");
        chain.doFilter(request,response);
    }
}
