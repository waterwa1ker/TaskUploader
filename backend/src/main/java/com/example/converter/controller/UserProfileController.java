package com.example.converter.controller;

import com.example.converter.dto.UserDTO;
import com.example.converter.dto.UserProfileDTO;
import com.example.converter.model.User;
import com.example.converter.security.JwtService;
import com.example.converter.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user-profile")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
public class UserProfileController {

    private final UserService userService;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<?> getUserProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        User user = getUserByToken(token);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        UserDTO userDTO = fromUser(user);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateUserProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                               @RequestBody UserProfileDTO userProfileDTO) {
        User user = getUserByToken(token);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        userService.changeUser(user, userProfileDTO);
        return new ResponseEntity<>("User profile updated", HttpStatus.OK);
    }

    private User getUserByToken(String token) {
        token = token.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        return userService.findUserByUsername(username);
    }

    private UserDTO fromUser(User user) {
        return modelMapper.map(user, UserDTO.class);
    }



}
