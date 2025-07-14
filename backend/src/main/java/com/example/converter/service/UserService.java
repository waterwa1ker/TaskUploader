package com.example.converter.service;

import com.example.converter.constant.Role;
import com.example.converter.dto.UserDTO;
import com.example.converter.dto.UserProfileDTO;
import com.example.converter.model.User;
import com.example.converter.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void createUser(String username, String password, Role role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        userRepository.save(user);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElse(null);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public void changeUser(User user, UserProfileDTO userProfileDTO) {
        if (userProfileDTO.getUsername() != null) {
            user.setUsername(userProfileDTO.getUsername());
        }
        if (userProfileDTO.getEmail() != null) {
            user.setEmail(userProfileDTO.getEmail());
        }
        if (userProfileDTO.getFirstName() != null) {
            user.setFirstName(userProfileDTO.getFirstName());
        }
        if (userProfileDTO.getLastName() != null) {
            user.setLastName(userProfileDTO.getLastName());
        }
        userRepository.save(user);
    }
}