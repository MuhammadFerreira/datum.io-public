package io.capstone.datum.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;
import io.capstone.datum.repositories.ConfirmationTokenRepository;
import io.capstone.datum.repositories.SurveyParticipationRepository;
import io.capstone.datum.repositories.SurveyRepository;
import io.capstone.datum.repositories.UserRepository;
import io.capstone.datum.requests.RegistrationRequest;
import io.capstone.datum.security.token.ConfirmationToken;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.email.EmailService;
import io.capstone.datum.services.userservice.UserService;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
class RegistrationServiceTest {

    private RegistrationService registrationService;
    private UserService userService;
    private ConfirmationTokenService tokenService;
    private BCryptPasswordEncoder passwordEncoder;
    private EmailService emailService;
    
    @MockBean
    private JavaMailSender mailSender;
    private MimeMessage mimeMessage;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ConfirmationTokenRepository tokenRepo;
    @Autowired
    private SurveyRepository surveyRepo;
    @Autowired
    private SurveyParticipationRepository surveyParticipationRepo;

    @Test
    void contextLoads()
    {
        assertNotNull(userRepo);
        assertNotNull(tokenRepo);
        assertNotNull(entityManager);
    }

    @BeforeEach
    void setUp(){
        passwordEncoder  = new BCryptPasswordEncoder();

        tokenService = Mockito.spy(new ConfirmationTokenService(tokenRepo));  
        userService = Mockito.spy(new UserService(userRepo, surveyParticipationRepo, passwordEncoder, tokenService, surveyRepo, emailService, null, null)); 
        registrationService = Mockito.spy(new RegistrationService(userService, tokenService, emailService));
    }

    @AfterEach
    void tearDown(){
        tokenRepo.deleteAll();
        userRepo.deleteAll(); 
    }

    @Test
    void testConfirmToken() {

        //Create a temporary user
        AppUser testUser = new AppUser(
            "test",
            "test",
            "test@test.com",
            "pass",
            "1998-07-23",
            "MALE",
            AppUserRole.USER
        );
        userRepo.save(testUser);
        
        //Create token to be tested
        ConfirmationToken tokenTest = new ConfirmationToken(
            "token123",
            LocalDateTime.now(),
            LocalDateTime.now().plusMinutes(15),
            testUser
        );
        tokenRepo.save(tokenTest);

        String response = registrationService.confirmToken("token123");
        assertEquals("confirmed", response);

        entityManager.refresh(tokenTest);

        assertThrows(IllegalStateException.class, () -> registrationService.confirmToken("IamNotHere"));
        assertThrows(IllegalStateException.class, () -> registrationService.confirmToken("token123"));

        //Create token to be tested
        ConfirmationToken tokenTestExpired = new ConfirmationToken(
            "tokenExpired",
            LocalDateTime.now(),
            LocalDateTime.now(),
            testUser
        );
        tokenRepo.save(tokenTestExpired);

        assertThrows(IllegalStateException.class, () -> registrationService.confirmToken("tokenExpired"));

    }

    @Test
    void testRegister() {

        mimeMessage = new MimeMessage((Session)null);
        mailSender = mock(JavaMailSender.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        emailService = Mockito.spy(new EmailService(mailSender));
        registrationService = Mockito.spy(new RegistrationService(userService, tokenService, emailService));
        
        RegistrationRequest registrationRequest = new RegistrationRequest(
            "test",
            "test",
            "test@test.com",
            "pass",
                "1998-07-23",
                "MALE"
            );

        registrationService.register(registrationRequest);

        AppUser inRepo = userRepo.findByEmail("test@test.com").get();

        assertNotNull(inRepo);

    }
}
