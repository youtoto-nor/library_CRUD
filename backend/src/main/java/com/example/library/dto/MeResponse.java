package com.example.library.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MeResponse {

    private final Long id;
    private final String email;
    private final String name;
    private final String role;
    private final LocalDateTime createdAt;

    public MeResponse(
            Long id,
            String email,
            String name,
            String role,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
    }
}