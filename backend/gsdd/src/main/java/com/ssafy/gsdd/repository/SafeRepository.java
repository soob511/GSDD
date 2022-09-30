package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.Area;
import com.ssafy.gsdd.entity.Safe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SafeRepository extends JpaRepository<Safe,Integer> {
//    @Query("select s from Safe s where s.area.id = :code")
//    Safe findSafeBycode(@Param("code") int code);
}
