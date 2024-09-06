package io.capstone.datum.controllers;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.capstone.datum.requests.PasswordRequest;
import io.capstone.datum.requests.RegistrationRequest;
import io.capstone.datum.services.RegistrationService;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/registration")
@AllArgsConstructor
public class RegistrationController {

    @Autowired
    private final RegistrationService registrationService;

    @PostMapping
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

    @PostMapping("/edit/password")
    public String editPassword(@RequestBody PasswordRequest request) {
        return registrationService.editPassword(request);
    }

}
 