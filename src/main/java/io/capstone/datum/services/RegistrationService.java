package io.capstone.datum.services;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;
import io.capstone.datum.requests.PasswordRequest;
import io.capstone.datum.requests.RegistrationRequest;
import io.capstone.datum.security.token.ConfirmationToken;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.email.EmailService;
import io.capstone.datum.services.userservice.UserService;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserService appUserService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailService emailSender;

    public String register(RegistrationRequest request) {
        
        String token = appUserService.signUpUser(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.getDateOfBirth(),
                        request.getGender(),
                        AppUserRole.USER

                )
        );

        String link = "http://localhost:3000/confirm/" + token;
        String emailBody = "Hi " + request.getFirstName() + ",<br><br>Someone has signed you up for datum.io!<br>Please click on the below link to activate your account:<br><br><a href=\"" + link + "\">Activate Now</a><br>Link will expire in 15 minutes.<br><br>See you soon";
        emailSender.sendMessage(request.getEmail(), "Confirm your email!", emailBody);

        return token;
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }
        
        if (confirmationToken.getAppUser().getPassword() == null) {
            return "no-password";
        }

        confirmationTokenService.setConfirmedAt(token);

        appUserService.enableAppUser(confirmationToken.getAppUser().getEmail());

        return "confirmed";
    }

    @Transactional
    public String editPassword(PasswordRequest request) {
        
        appUserService.editPassword(request.getToken(), request.getPassword());

        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(request.getToken())
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(request.getToken());

        appUserService.enableAppUser(confirmationToken.getAppUser().getEmail());

        return "confirmed";
    }

}
