package com.incture.controller;

import com.incture.dto.AuthResponse;
import com.incture.dto.LoginRequest;
import com.incture.dto.RegisterRequest;
import com.incture.entity.User;
import com.incture.repository.UserRepository;
import com.incture.service.CustomUserDetailsService;
import com.incture.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService userDetailsService;

    public AuthController(UserRepository userRepository,
                          AuthenticationManager authManager,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder,
                          CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        User user = new User(
            request.getName(),
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getAge(),
            request.getHeight(),
            request.getWeight()
        );
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()
            )
        );

        
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}