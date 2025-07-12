package com.example.converter.controller;

import com.example.converter.dto.ChangePasswordDTO;
import com.example.converter.model.User;
import com.example.converter.security.JwtService;
import com.example.converter.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/settings")
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
@AllArgsConstructor
public class SettingsController {

    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/change-password")
    // Не работает
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO,
                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        User user = getUserByToken(token);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!matchPassword(encoder, user.getPassword(), changePasswordDTO.getOldPassword())) {
            return new ResponseEntity<>("Wrong password", HttpStatus.BAD_REQUEST);
        }
        user.setPassword(encoder.encode(changePasswordDTO.getNewPassword()));
        userService.save(user);
        return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        User user = getUserByToken(token);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        userService.delete(user);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

    private boolean matchPassword(PasswordEncoder passwordEncoder, String oldPassword, String newPassword) {
        return passwordEncoder.matches(oldPassword, newPassword);
    }

    private User getUserByToken(String token) {
        token = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        return userService.findUserByUsername(username);
    }

}
