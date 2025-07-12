package com.example.converter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {

    private String email;
    private String firstName;
    private String lastName;
    private String username;

}
