package com.ssafy.gsdd.repository;

import com.ssafy.gsdd.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query("select c from Contact c where c.user.userId = :userId and c.contact = :contact")
    Optional<Contact> findContact(@Param("userId") int userId,@Param("contact") String contact);
}
