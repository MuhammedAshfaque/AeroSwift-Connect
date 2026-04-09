package com.bookmyflight.backend.controllers;

import com.bookmyflight.backend.dto.RouteResponse;
import com.bookmyflight.backend.models.Flight;
import com.bookmyflight.backend.repositories.FlightRepository;
import com.bookmyflight.backend.services.RoutingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
public class FlightController {
    
    @Autowired
    private FlightRepository flightRepository;
    
    @Autowired
    private RoutingService routingService;
    
    @GetMapping
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
    
    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }
    
    @GetMapping("/search")
    public List<RouteResponse> searchFlights(@RequestParam String source, @RequestParam String destination) {
        return routingService.searchRoutes(source, destination);
    }
}
