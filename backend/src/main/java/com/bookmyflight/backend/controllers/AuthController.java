package com.bookmyflight.backend.controllers;

import com.bookmyflight.backend.dto.AuthRequest;
import com.bookmyflight.backend.dto.AuthResponse;
import com.bookmyflight.backend.dto.RegisterRequest;
import com.bookmyflight.backend.models.User;
import com.bookmyflight.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        if ("admin@bookmyflight.com".equals(request.getEmail()) && "admin123".equals(request.getPassword())) {
            return ResponseEntity.ok(new AuthResponse(request.getEmail(), "Admin", "ADMIN", "Login successful"));
        }
        
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            User u = userOpt.get();
            return ResponseEntity.ok(new AuthResponse(u.getEmail(), u.getName(), u.getRole(), "Login successful"));
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(null, null, null, "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent() || "admin@bookmyflight.com".equals(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthResponse(null, null, null, "Email already exists"));
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Storing raw password since it's just for assignment simulation
        user.setName(request.getName());
        user.setRole("USER");
        
        userRepository.save(user);
        return ResponseEntity.ok(new AuthResponse(user.getEmail(), user.getName(), user.getRole(), "Registration successful"));
    }
}
