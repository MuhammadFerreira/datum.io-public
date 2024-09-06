package io.capstone.datum.security.token;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

import io.capstone.datum.TestConfigurations;
import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;
import io.capstone.datum.repositories.ConfirmationTokenRepository;
import io.capstone.datum.repositories.UserRepository;

@ContextConfiguration(classes = TestConfigurations.class)
@DataJpaTest
class ConfirmationTokenServiceTest {
  
    ConfirmationTokenService tokenService;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private ConfirmationTokenRepository tokenRepo;
    
    @Test
    void contextLoads()
    {
        assertNotNull(userRepo);
        assertNotNull(tokenRepo);
        assertNotNull(entityManager);
    }

    @BeforeEach
    void setUp(){
        tokenService = Mockito.spy(new ConfirmationTokenService(tokenRepo));  
    }

    @AfterEach
    void tearDown(){
        tokenRepo.deleteAll();
        userRepo.deleteAll();
    }
    
    @Test
    void testGetToken() {

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

        boolean exists = !tokenService.getToken("token123").isEmpty();
        assertTrue(exists);
    }

    @Test
    void testSaveConfirmationToken() {
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
        tokenService.saveConfirmationToken(tokenTest);

        //Retrieve token from repo via token
        boolean exists = !tokenRepo.findByToken("token123").isEmpty();
        assertTrue(exists);
    }

    @Test
    void testSetConfirmedAt() {

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

        //Verify that the token has not confirmation date to begin with
        ConfirmationToken inRepo = tokenRepo.findByToken("token123").get();
        assertNull(inRepo.getConfirmedAt());

        //Add Confirmation Time and verify it is saved
        tokenService.setConfirmedAt("token123");
        entityManager.refresh(inRepo);
        assertNotNull(inRepo.getConfirmedAt());
    }
}
