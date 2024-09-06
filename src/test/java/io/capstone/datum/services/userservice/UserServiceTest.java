package io.capstone.datum.services.userservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.NoSuchElementException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ContextConfiguration;

import io.capstone.datum.TestConfigurations;
import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;
import io.capstone.datum.repositories.ConfirmationTokenRepository;
import io.capstone.datum.repositories.SurveyParticipationRepository;
import io.capstone.datum.repositories.SurveyRepository;
import io.capstone.datum.repositories.UserRepository;
import io.capstone.datum.security.token.ConfirmationTokenService;

@DataJpaTest
@ExtendWith(MockitoExtension.class)
@ContextConfiguration(classes = TestConfigurations.class)
class UserServiceTest {

    UserService userService;
    ConfirmationTokenService tokenService;
    BCryptPasswordEncoder passwordEncoder;

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
        userService = Mockito.spy(new UserService(userRepo, surveyParticipationRepo, passwordEncoder, tokenService, surveyRepo, null, null, null));  
    }

    @AfterEach
    void tearDown(){
        userRepo.deleteAll();
        tokenRepo.deleteAll();
    }

    @Test
    void testEnableAppUser() {

        //given
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
        
        //Check if AppUser initialized as enabled = false
        AppUser inRepo = userRepo.findByEmail("test@test.com").get();
        assertFalse(inRepo.getEnabled());
        
        //Enable user, refresh and check if enabled = true
        userService.enableAppUser("test@test.com");
        entityManager.refresh(inRepo);
        assertTrue(inRepo.getEnabled());
    }

    @Test
    void testLoadUserByUsername() {
        //given
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

        //Verify that UserService returns a user
        assertEquals(testUser.getEmail(), userService.loadUserByUsername("test@test.com").getUsername());

        //Verify method throws an error when the username is not found
        assertThrows(NoSuchElementException.class, () -> userService.loadUserByUsername("RIP").getUsername());
    }

    @Test
    void testSignUpUser() {
        AppUser testUser = new AppUser(
            "test",
            "test",
            "test@test.com",
            "pass",
                "1998-07-23",
                "MALE",
                AppUserRole.USER
        );
        userService.signUpUser(testUser);

        AppUser inDBUser = userRepo.findByEmail("test@test.com").get();

        assertNotNull(inDBUser);
        entityManager.refresh(inDBUser);

        assertThrows(IllegalStateException.class, () -> userService.signUpUser(testUser));


    }
}
