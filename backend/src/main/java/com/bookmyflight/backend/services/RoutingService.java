package com.bookmyflight.backend.services;

import com.bookmyflight.backend.dto.RouteResponse;
import com.bookmyflight.backend.models.Deal;
import com.bookmyflight.backend.models.Flight;
import com.bookmyflight.backend.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoutingService {
    @Autowired
    private FlightRepository flightRepository;
    
    @Autowired
    private DealService dealService;
    
    public List<RouteResponse> searchRoutes(String source, String destination) {
        List<Flight> allFlights = flightRepository.findAll();
        List<Deal> activeDeals = dealService.getActiveDeals();
        
        Map<Long, Double> discountMap = new HashMap<>();
        for(Deal d : activeDeals) {
            discountMap.put(d.getFlight().getId(), d.getDiscountPercentage());
        }
        
        // Build graph with case-insensitive keys
        Map<String, List<Flight>> graph = new HashMap<>();
        for(Flight f : allFlights) {
            String srcKey = f.getSource().toLowerCase().trim();
            graph.computeIfAbsent(srcKey, k -> new ArrayList<>()).add(f);
        }
        
        List<RouteResponse> results = new ArrayList<>();
        dfs(source.toLowerCase().trim(), destination.toLowerCase().trim(), graph, discountMap, new ArrayList<>(), new HashSet<>(), results, 0.0, 0);
        
        // Sort by cost ascending
        results.sort(Comparator.comparingDouble(RouteResponse::getTotalCost));
        
        return results;
    }
    
    private void dfs(String current, String dest, Map<String, List<Flight>> graph, Map<Long, Double> discountMap, 
                     List<Flight> path, Set<String> visited, List<RouteResponse> results, double currentCost, int depth) {
        
        if (current.equals(dest) && path.size() > 0) {
            results.add(new RouteResponse(new ArrayList<>(path), currentCost));
            return;
        }
        
        if (depth >= 3) return; // Limit to 3 flights (2 stops) max for a journey
        
        visited.add(current);
        
        List<Flight> neighbors = graph.getOrDefault(current, new ArrayList<>());
        for(Flight f : neighbors) {
            String nextDest = f.getDestination().toLowerCase().trim();
            if (!visited.contains(nextDest)) {
                path.add(f);
                double originalPrice = f.getPrice();
                double discount = discountMap.getOrDefault(f.getId(), 0.0);
                double priceToCharge = originalPrice * (1.0 - (discount / 100.0));
                
                dfs(nextDest, dest, graph, discountMap, path, visited, results, currentCost + priceToCharge, depth + 1);
                
                path.remove(path.size() - 1);
            }
        }
        visited.remove(current);
    }
}
