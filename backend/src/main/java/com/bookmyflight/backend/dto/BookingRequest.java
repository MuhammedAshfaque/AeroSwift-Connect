package com.bookmyflight.backend.dto;

import java.util.List;

public class BookingRequest {
    private String userEmail;
    private List<Long> flightIds;
    private Double totalCost;

    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public List<Long> getFlightIds() {
        return flightIds;
    }
    public void setFlightIds(List<Long> flightIds) {
        this.flightIds = flightIds;
    }
    public Double getTotalCost() {
        return totalCost;
    }
    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }
}
