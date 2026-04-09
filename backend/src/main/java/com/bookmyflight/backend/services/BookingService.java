package com.bookmyflight.backend.services;

import com.bookmyflight.backend.dto.BookingRequest;
import com.bookmyflight.backend.models.Booking;
import com.bookmyflight.backend.models.Flight;
import com.bookmyflight.backend.repositories.BookingRepository;
import com.bookmyflight.backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private FlightRepository flightRepository;
    
    public Booking createBooking(BookingRequest request) {
        List<Flight> flights = flightRepository.findAllById(request.getFlightIds());
        Booking booking = new Booking(request.getUserEmail(), flights, request.getTotalCost(), LocalDateTime.now());
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getBookingsByUser(String email) {
        return bookingRepository.findByUserEmail(email);
    }
}
