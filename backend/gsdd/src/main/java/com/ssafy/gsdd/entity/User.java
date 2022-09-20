package com.ssafy.gsdd.entity;

<<<<<<< Updated upstream
import lombok.*;
=======
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
>>>>>>> Stashed changes

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
<<<<<<< Updated upstream
@Getter
@Setter
@ToString(exclude = "contacts")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    @Column(name = "user_Id")
    private int userId;
    @Column(name = "name", nullable = false)
    private  String name;
    @Column(name = "provider", nullable = false)
    private String provider;

    @OneToMany(mappedBy = "user")
    private  List<Contact> contacts = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Route> routes = new ArrayList<>();
=======
@Data
@NoArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    private String username;
    private String password;
    private String email;
    private String role;

    private String provider;
    private String providerId;

    @CreationTimestamp
    private Timestamp createDate;


    @Builder
    public User(String username, String password, String email, String role, String provider, String providerId, Timestamp createDate) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.provider = provider;
        this.providerId = providerId;
        this.createDate = createDate;
    }
>>>>>>> Stashed changes
}
