package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends JpaRepository<House,Integer> {
}
