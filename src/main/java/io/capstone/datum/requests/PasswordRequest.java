package io.capstone.datum.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class PasswordRequest {
    private final String password;
    private final String token;
}