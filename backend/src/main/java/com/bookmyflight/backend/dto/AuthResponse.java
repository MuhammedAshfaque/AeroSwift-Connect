package com.bookmyflight.backend.dto;

public class AuthResponse {
    private String email;
    private String name;
    private String role;
    private String message;

    public AuthResponse(String email, String name, String role, String message) {
        this.email = email;
        this.name = name;
        this.role = role;
        this.message = message;
    }

    public String getEmail() { return email; }
    public String getName() { return name; }
    public String getRole() { return role; }
    public String getMessage() { return message; }
}
