package io.capstone.datum.repositories;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.Date;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

import io.capstone.datum.TestConfigurations;
import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;
import io.capstone.datum.security.token.ConfirmationToken;

@ContextConfiguration(classes = TestConfigurations.class)
@DataJpaTest
class ConfirmationTokenRepositoryTest {
    
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ConfirmationTokenRepository tokenRepo;
    @Autowired
    private TestEntityManager entityManager;

    @Test
    void contextLoads()
    {
        assertNotNull(userRepo);
        assertNotNull(tokenRepo);
        assertNotNull(entityManager);
    }

    @AfterEach
    void tearDown(){
        tokenRepo.deleteAll();
        userRepo.deleteAll();
    }
    
    @Test
    void testFindByToken() {
        
        //Create a temporary user
        AppUser testUser = new AppUser(
            "test",
            "test",
            "test@test.com",
            "pass",
                "2022-06-07",
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

        //Retrieve token from repo via token
        boolean exists = !tokenRepo.findByToken("token123").isEmpty();
        assertTrue(exists);

    }

    @Test
    void testUpdateConfirmedAt() {

        //Create a temporary user
        AppUser testUser = new AppUser(
            "test",
            "test",
            "test@test.com",
            "pass",
                "2022-06-09",
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
        tokenRepo.updateConfirmedAt("token123", LocalDateTime.now());
        entityManager.refresh(inRepo);
        assertNotNull(inRepo.getConfirmedAt());
    }
}
