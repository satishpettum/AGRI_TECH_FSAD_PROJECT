package com.agriconnect.backend.config;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.agriconnect.backend.model.CommunityPost;
import com.agriconnect.backend.model.Expert;
import com.agriconnect.backend.model.Resource;
import com.agriconnect.backend.model.User;
import com.agriconnect.backend.repository.CommunityPostRepository;
import com.agriconnect.backend.repository.ExpertRepository;
import com.agriconnect.backend.repository.ResourceRepository;
import com.agriconnect.backend.repository.UserRepository;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedDatabase(ResourceRepository resourceRepository,
                                          ExpertRepository expertRepository,
                                          CommunityPostRepository communityPostRepository,
                                          UserRepository userRepository,
                                          PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setEmail("admin@agriconnect.com");
                admin.setPassword(passwordEncoder.encode("Admin123!"));
                admin.setFullName("Admin User");
                admin.setRole("admin");
                admin.setAvatarUrl("https://ui-avatars.com/api/?name=Admin+User");
                admin.setBio("Platform administrator for AgriConnect.");
                admin.setLocation("Head Office");
                userRepository.save(admin);
            }

            if (resourceRepository.count() == 0) {
                resourceRepository.save(new Resource(
                        "Modern Irrigation Techniques",
                        "Irrigation",
                        "Learn drip irrigation, sprinkler systems, and water-saving practices.",
                        "Dr. Priya Sharma",
                        "https://example.com/irrigation",
                        "irrigation,water"
                ));
                resourceRepository.save(new Resource(
                        "Organic Pest Control Guide",
                        "Pest Control",
                        "Natural pest management methods that protect yields and soil health.",
                        "Nisha Verma",
                        "https://example.com/pest-control",
                        "organic,pest"
                ));
                resourceRepository.save(new Resource(
                        "Understanding Crop Rotation",
                        "Crop Management",
                        "Improve soil fertility and reduce disease with crop rotation plans.",
                        "Rajesh Kumar",
                        "https://example.com/crop-rotation",
                        "crop rotation,soil"
                ));
            }

            if (expertRepository.count() == 0) {
                expertRepository.save(new Expert(
                        "Dr. Asha Patel",
                        "Soil Health",
                        "Punjab",
                        4.9,
                        142,
                        "Soil scientist helping smallholders improve fertility and yields.",
                        "asha.patel@agriconnect.com"
                ));
                expertRepository.save(new Expert(
                        "Rajesh Kumar",
                        "Crop Insurance",
                        "Maharashtra",
                        4.8,
                        98,
                        "Agricultural insurance expert helping farmers reduce risk.",
                        "rajesh.kumar@agriconnect.com"
                ));
                expertRepository.save(new Expert(
                        "Nisha Verma",
                        "Organic Farming",
                        "Rajasthan",
                        4.9,
                        112,
                        "Advisor for sustainable and certified organic agriculture.",
                        "nisha.verma@agriconnect.com"
                ));
            }

            if (communityPostRepository.count() == 0) {
                communityPostRepository.save(new CommunityPost(
                        "Best crops for dry climate?",
                        "Crop Management",
                        "Looking for low-water crops that work in my region.",
                        "Farmer Singh",
                        "farmer.singh@example.com",
                        LocalDateTime.now().minusDays(1),
                        45
                ));
                communityPostRepository.save(new CommunityPost(
                        "Vertical farming ideas",
                        "Technology",
                        "What equipment is affordable for small greenhouses?",
                        "Sarah Green",
                        "sarah.green@example.com",
                        LocalDateTime.now().minusDays(2),
                        32
                ));
                communityPostRepository.save(new CommunityPost(
                        "Organic certification steps",
                        "Organic Farming",
                        "How long does certification normally take?",
                        "Dr. Maria",
                        "maria@example.com",
                        LocalDateTime.now().minusHours(12),
                        27
                ));
            }
        };
    }
}
