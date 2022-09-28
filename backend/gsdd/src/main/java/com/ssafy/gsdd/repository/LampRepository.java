package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.Lamp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LampRepository extends JpaRepository<Lamp, Integer> {
}
