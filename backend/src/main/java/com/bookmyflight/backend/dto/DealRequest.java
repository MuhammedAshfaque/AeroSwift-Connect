package com.bookmyflight.backend.dto;

public class DealRequest {
    private Long flightId;
    private Double discountPercentage;
    private int durationMinutes;

    public Long getFlightId() {
        return flightId;
    }
    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }
    public Double getDiscountPercentage() {
        return discountPercentage;
    }
    public void setDiscountPercentage(Double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }
    public int getDurationMinutes() {
        return durationMinutes;
    }
    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
}
