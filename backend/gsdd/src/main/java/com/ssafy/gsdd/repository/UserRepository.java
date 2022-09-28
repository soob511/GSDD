package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // 생성

    // 조회
    @EntityGraph(attributePaths = {"contacts"})
    User findByUserId(int id);
}
