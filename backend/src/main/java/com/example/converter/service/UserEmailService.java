package com.example.converter.service;

import com.example.converter.model.User;
import com.example.converter.model.UserEmail;
import com.example.converter.repository.UserEmailRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserEmailService {

    private final UserEmailRepository userEmailRepository;

    public UserEmail findByUser(User user) {
        return userEmailRepository.findByUser(user)
                .orElse(null);
    }

    public UserEmail findByToken(String token) {
        return userEmailRepository.findByToken(token)
                .orElse(null);
    }

    public void save(UserEmail userEmail) {
        userEmailRepository.save(userEmail);
    }


    public void delete(UserEmail userEmail) {
        userEmailRepository.delete(userEmail);
    }
}
