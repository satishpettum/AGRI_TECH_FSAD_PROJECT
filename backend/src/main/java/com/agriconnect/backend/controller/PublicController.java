package com.agriconnect.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @GetMapping("/resources")
    public ResponseEntity<List<Map<String, String>>> getResources() {
        return ResponseEntity.ok(List.of(
                Map.of("title", "Modern Irrigation Techniques", "category", "Irrigation", "description", "Learn drip irrigation, sprinkler systems, and water-saving practices."),
                Map.of("title", "Organic Pest Control Guide", "category", "Pest Control", "description", "Natural pest management methods that protect yields and soil health."),
                Map.of("title", "Understanding Crop Rotation", "category", "Crop Management", "description", "Improve soil fertility and reduce disease with crop rotation plans.")
        ));
    }

    @GetMapping("/experts")
    public ResponseEntity<List<Map<String, String>>> getExperts() {
        return ResponseEntity.ok(List.of(
                Map.of("name", "Dr. Asha Patel", "specialty", "Soil Health", "location", "Punjab"),
                Map.of("name", "Rajesh Kumar", "specialty", "Crop Insurance", "location", "Maharashtra"),
                Map.of("name", "Nisha Verma", "specialty", "Organic Farming", "location", "Rajasthan")
        ));
    }

    @GetMapping("/community")
    public ResponseEntity<List<Map<String, String>>> getCommunity() {
        return ResponseEntity.ok(List.of(
                Map.of("title", "Best crops for dry climate?", "author", "Farmer Singh", "summary", "Looking for low-water crops that work in my region."),
                Map.of("title", "Vertical farming ideas", "author", "Sarah Green", "summary", "What equipment is affordable for small greenhouses?"),
                Map.of("title", "Organic certification steps", "author", "Dr. Maria", "summary", "How long does certification normally take?")
        ));
    }
}
