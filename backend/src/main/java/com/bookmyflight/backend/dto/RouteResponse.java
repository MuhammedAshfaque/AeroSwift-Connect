package com.bookmyflight.backend.dto;

import com.bookmyflight.backend.models.Flight;
import java.util.List;

public class RouteResponse {
    private List<Flight> flights;
    private Double totalCost;
    private int stops;

    public RouteResponse() {
    }

    public RouteResponse(List<Flight> flights, Double totalCost) {
        this.flights = flights;
        this.totalCost = totalCost;
        this.stops = flights.size() - 1;
    }

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
        this.stops = flights.size() - 1;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public int getStops() {
        return stops;
    }
}
