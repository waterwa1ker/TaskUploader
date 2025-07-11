package com.example.converter.dto;

import com.example.converter.constant.Role;

public record RegisterRequest(String username, String password, Role role) {}