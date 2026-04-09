package com.bookmyflight.backend.controllers;

import com.bookmyflight.backend.dto.BookingRequest;
import com.bookmyflight.backend.models.Booking;
import com.bookmyflight.backend.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest request) {
        return bookingService.createBooking(request);
    }
    
    @GetMapping("/{email}")
    public List<Booking> getUserBookings(@PathVariable String email) {
        return bookingService.getBookingsByUser(email);
    }
}
