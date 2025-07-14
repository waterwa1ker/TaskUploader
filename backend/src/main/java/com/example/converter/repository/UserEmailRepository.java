package com.example.converter.repository;

import com.example.converter.model.User;
import com.example.converter.model.UserEmail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEmailRepository extends JpaRepository<UserEmail, String> {
    Optional<UserEmail> findByUser(User user);
    Optional<UserEmail> findByToken(String token);
}
