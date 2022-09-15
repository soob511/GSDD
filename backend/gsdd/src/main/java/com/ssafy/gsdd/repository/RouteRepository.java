package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query("select r from Route r where r.user.userId = :userId and r.address = :address")
    Optional<Route> findRoute(@Param("userId") int userId, @Param("address") String address);
}
