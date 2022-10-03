package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.News;
import com.ssafy.gsdd.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Integer> {
    @Query("select n from News n where n.area LIKE %:si% and n.area like %:gu%")
    List<News> getList(@Param("si") String si, @Param("gu") String gu);
}
