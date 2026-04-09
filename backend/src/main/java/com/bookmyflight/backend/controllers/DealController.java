package com.bookmyflight.backend.controllers;

import com.bookmyflight.backend.dto.DealRequest;
import com.bookmyflight.backend.models.Deal;
import com.bookmyflight.backend.services.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
@CrossOrigin(origins = "*")
public class DealController {
    
    @Autowired
    private DealService dealService;
    
    @PostMapping
    public Deal createDeal(@RequestBody DealRequest request) {
        return dealService.createDeal(request);
    }
    
    @GetMapping("/active")
    public List<Deal> getActiveDeals() {
        return dealService.getActiveDeals();
    }
}
