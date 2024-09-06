package io.capstone.datum.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class AdminRegistrationRequest {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String role;
    
}
