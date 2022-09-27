//package com.ssafy.gsdd.controller;
//
//
////import com.ssafy.gsdd.repository.UserRepository;
//import com.ssafy.gsdd.config.oauth.provider.SessionUser;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.servlet.http.HttpSession;
//
//@RequiredArgsConstructor
//@Controller
//public class loginController {
//
//    private final HttpSession httpSession;
//
//    @GetMapping("/")
//    public String index(Model model) {
//        // .............
//        // 사용자 정보: 위의 @LoginUser 어노테이션으로 대체
//         SessionUser user = (SessionUser) httpSession.getAttribute("user");
//        if(user != null) {
//            model.addAttribute("userName", user.getName());
//            model.addAttribute("userImg", user.getPicture());
//        }
//        return "index";
//    }
//}
