package io.capstone.datum.repositories;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;

import org.junit.jupiter.api.AfterEach;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration;
import org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ContextConfiguration;

import io.capstone.datum.TestConfigurations;
import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;

@ContextConfiguration(classes = TestConfigurations.class)
@DataJpaTest
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class , OAuth2ClientAutoConfiguration.class,OAuth2ResourceServerAutoConfiguration.class})
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TestEntityManager entityManager;

    @Test
    void contextLoads()
    {
        assertNotNull(userRepo);
        assertNotNull(entityManager);
    }

    @AfterEach
    void tearDown(){
        userRepo.deleteAll();
    }

    @Test
    void testFindByEmail() {
       
        //Test When User Exists
        //given
        AppUser testUser = new AppUser();
        
        testUser.setId(null);
        testUser.setFirstName("test");
        testUser.setLastName("test");
        testUser.setEmail("test@test.com");
        testUser.setPassword("pass");
        testUser.setAppUserRole(AppUserRole.USER);
        testUser.setLocked(false);
        testUser.setEnabled(false);

        userRepo.save(testUser);
        
        //when
        AppUser inRepo = userRepo.findByEmail("test@test.com").get();
        
        //then
        assertNotNull(inRepo);
        assertTrue(inRepo.equals(testUser));
        assertEquals(true, inRepo.isAccountNonLocked());
        assertEquals("pass", inRepo.getPassword());
        assertEquals("test", inRepo.getFirstName());
        assertEquals("test", inRepo.getLastName());
        assertEquals(AppUserRole.USER, inRepo.getAppUserRole() );
        assertEquals(false, inRepo.getLocked());
        assertEquals(true, inRepo.isAccountNonExpired());

        //Test When User Does Not Exists
        //given
        String emailThatDoesNotExist = "I-DONT-EXITS";
        //when
        boolean exists = !userRepo.findByEmail(emailThatDoesNotExist).isEmpty();
        //then
        assertFalse(exists);

    }

    @Test
    void testFindAll(){
        AppUser user1 = new AppUser("Test1", "Tester", "test@gmail.com", "Test12!",
                "1998-07-23", "MALE",
                AppUserRole.ADMIN);
        AppUser user2 = new AppUser("Test2", "Tester", "test1@gmail.com", "Test12!",
                "1998-07-23", "MALE",
                AppUserRole.USER);
        userRepo.save(user1);
        userRepo.save(user2);
        
        //check if AppUser List is returned
        ArrayList<AppUser> appList = (ArrayList<AppUser>) userRepo.findAll();
        assertTrue(appList.contains(user2));
        assertTrue(appList.contains(user1));
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
        testUser.setLocked(true);
        userRepo.save(testUser);
   
        //Check if AppUser initialized as enabled = false
        AppUser inRepo = userRepo.findByEmail("test@test.com").get();
        assertFalse(inRepo.getEnabled());
        
        //Enable user, refresh and check if enabled = true
        userRepo.enableAppUser("test@test.com");
        entityManager.refresh(inRepo);
        assertTrue(inRepo.getEnabled());
        assertEquals(false, inRepo.isAccountNonLocked());

    }
}
