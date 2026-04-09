package com.bookmyflight.backend.services;

import com.bookmyflight.backend.dto.DealRequest;
import com.bookmyflight.backend.models.Deal;
import com.bookmyflight.backend.models.Flight;
import com.bookmyflight.backend.repositories.DealRepository;
import com.bookmyflight.backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DealService {
    @Autowired
    private DealRepository dealRepository;
    
    @Autowired
    private FlightRepository flightRepository;

    public Deal createDeal(DealRequest request) {
        Flight flight = flightRepository.findById(request.getFlightId()).orElseThrow();
        Deal deal = new Deal(flight, request.getDiscountPercentage(), LocalDateTime.now(), LocalDateTime.now().plusMinutes(request.getDurationMinutes()));
        return dealRepository.save(deal);
    }
    
    public List<Deal> getActiveDeals() {
        LocalDateTime now = LocalDateTime.now();
        return dealRepository.findAll().stream()
                .filter(d -> d.getEndTime() != null && d.getEndTime().isAfter(now))
                .toList();
    }
}
