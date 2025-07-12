package com.example.converter.dto;

import com.example.converter.constant.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private String id;

    private String username;

    private Role role;

    private String email;

    private LocalDateTime createdAt;

    private String firstName;

    private String lastName;

}
