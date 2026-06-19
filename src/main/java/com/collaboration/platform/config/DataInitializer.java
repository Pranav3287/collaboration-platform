package com.collaboration.platform.config;

import com.collaboration.platform.model.Role;
import com.collaboration.platform.model.User;
import com.collaboration.platform.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@collab.com")) {
            userRepository.save(new User(
                    "Admin User",
                    "admin@collab.com",
                    passwordEncoder.encode("admin123"),
                    Role.ADMIN
            ));
        }

        if (!userRepository.existsByEmail("member@collab.com")) {
            userRepository.save(new User(
                    "Team Member",
                    "member@collab.com",
                    passwordEncoder.encode("member123"),
                    Role.MEMBER
            ));
        }

        if (!userRepository.existsByEmail("guest@collab.com")) {
            userRepository.save(new User(
                    "Guest User",
                    "guest@collab.com",
                    passwordEncoder.encode("guest123"),
                    Role.GUEST
            ));
        }
    }
}
