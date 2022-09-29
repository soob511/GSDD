package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.Area;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AreaRepository extends JpaRepository<Area, Integer> {

    @EntityGraph(attributePaths = {"infos"})
    Optional<Area> findBySiAndGu(String si, String gu);

}
