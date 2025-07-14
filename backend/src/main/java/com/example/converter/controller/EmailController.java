package com.example.converter.controller;

import com.example.converter.dto.EmailVerifiedDTO;
import com.example.converter.dto.EmailVerifierRequestDTO;
import com.example.converter.dto.EmailVerifierResponseDTO;
import com.example.converter.model.User;
import com.example.converter.model.UserEmail;
import com.example.converter.security.JwtService;
import com.example.converter.service.EmailServiceImpl;
import com.example.converter.service.UserEmailService;
import com.example.converter.service.UserService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/email")
@AllArgsConstructor
public class EmailController {

    private final UserService userService;
    private final JwtService jwtService;
    private final EmailServiceImpl emailService;
    private final UserEmailService userEmailService;

    @GetMapping("/status")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getStatus(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        User user = getPersonByToken(token);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        EmailVerifiedDTO emailVerifiedDTO = new EmailVerifiedDTO(user.isEmailVerified());
        return new ResponseEntity<>(emailVerifiedDTO, HttpStatus.OK);
    }

    @PostMapping("/send-verification")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> sendVerification(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        User user = getPersonByToken(token);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        String email = user.getEmail();
        if (email == null) {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
        }

        String userToken = generateToken();
        String verificationLink = String.format("http://localhost:3000/verify-email?token=%s", userToken);
        try {
            emailService.sendVerificationEmail(email, verificationLink);
        } catch (MessagingException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        UserEmail userEmail = UserEmail
                .builder()
                .user(user)
                .token(userToken)
                .build();
        userEmailService.save(userEmail);

        return new ResponseEntity<>("Email sent", HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody EmailVerifierRequestDTO emailVerifierRequestDTO) {

        String token = emailVerifierRequestDTO.getToken();

        UserEmail userEmail = userEmailService.findByToken(token);
        if (userEmail == null) {
            return new ResponseEntity<>("Verification didn't send", HttpStatus.NOT_FOUND);
        }

        String userToken = userEmail.getToken();
        if (token.equals(userToken)) {
            User user = userEmail.getUser();
            user.setEmailVerified(true);
            userService.save(user);
            userEmailService.delete(userEmail);
            return new ResponseEntity<>(new EmailVerifierResponseDTO(true), HttpStatus.OK);
        }
        return new ResponseEntity<>(new EmailVerifierResponseDTO(false), HttpStatus.NOT_FOUND);
    }

    private User getPersonByToken(String token) {
        token = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        return userService.findUserByUsername(username);
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

}
