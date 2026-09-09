package com.example.library.controller;

import com.example.library.dto.MeResponse;
import com.example.library.dto.LoginRequest;
import com.example.library.dto.SignupRequest;
import com.example.library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public void signup(@RequestBody SignupRequest request) {
        userService.signup(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
    @GetMapping("/me")
    public MeResponse me(
            @RequestHeader("Authorization") String authorization
    ) {
        String token = authorization.substring(7);

        return userService.getMe(token);
    }
}