package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.CCTV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CCTVRepository extends JpaRepository<CCTV, Integer> {
}
