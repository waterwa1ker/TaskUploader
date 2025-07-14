package com.example.converter.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailVerifierRequestDTO {

    private String token;

}
