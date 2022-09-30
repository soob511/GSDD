package com.ssafy.gsdd.service;

import com.ssafy.gsdd.entity.Contact;
import com.ssafy.gsdd.entity.Route;
import com.ssafy.gsdd.entity.User;
import com.ssafy.gsdd.repository.ContactRepository;
import com.ssafy.gsdd.repository.RouteRepository;
import com.ssafy.gsdd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MypageService {
    
    @Autowired
    ContactRepository contactRepository;
    @Autowired
    RouteRepository routeRepository;
    @Autowired
    UserRepository userRepository;

    // 회원 정보 조회 ( 회원 이름, 비상 연락, 즐겨찾는 목적지)
    public User getUser(int userId) {
        User findbyId = userRepository.findByUserId(userId);

        findbyId.getRoutes();
        return findbyId;
    }

    // 비상연락망 추가
    public List<Contact> contactSave(int userId, String name, String number) {
        // 중복확인
        User user = userRepository.findByUserId(userId);
        Optional<Contact> findContact = contactRepository.findContact(userId, number);
        if (findContact.isEmpty()) {
            contactRepository.save(new Contact(name, number, LocalDateTime.now(), user));
            return user.getContacts();
        } else {
            return null;
        }
    }

    // 비상연락 삭제
    public void contactRemove(int contactId) {
        Optional<Contact> contact = contactRepository.findById(contactId);
        contactRepository.delete(contact.get());
    }

    // 즐겨찾는 목적지 추가
    public List<Route> routeSave(int userId, String name, String address) {
        // 중복확인
        User user = userRepository.findByUserId(userId);
        user.getRoutes();
        Optional<Route> findRoute = routeRepository.findRoute(userId, address);
        if (findRoute.isEmpty()) {
            routeRepository.save(new Route(name, address, user));
            return user.getRoutes();
        } else {
            return null;
        }
    }

    // 즐겨찾는 목적지 삭제
    public void routeRemove(int routeId) {
        Optional<Route> route = routeRepository.findById((routeId));
        routeRepository.delete(route.get());
    }
}
