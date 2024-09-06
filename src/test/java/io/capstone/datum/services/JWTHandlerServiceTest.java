package io.capstone.datum.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
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
import io.capstone.datum.services.userservice.UserService;


@DataJpaTest
@ExtendWith(MockitoExtension.class)
@ContextConfiguration(classes = TestConfigurations.class)
class JWTHandlerServiceTest {

    @Autowired
    UserService userService;
    
    ConfirmationTokenService tokenService;
    BCryptPasswordEncoder passwordEncoder;
    JWTHandlerService jwtHandlerService;

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
        jwtHandlerService = Mockito.spy(new JWTHandlerService());
    }

    @AfterEach
    void tearDown(){
        userRepo.deleteAll();
        tokenRepo.deleteAll();
    }
    
    @Test
    void testCreateTokens() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("USER"));
        User user = new User("test@test.com", "test", true, true, true, true, authorities);
        HttpServletRequest mockReq = Mockito.mock(HttpServletRequest.class);
        Mockito.when(mockReq.getRequestURL()).thenReturn(new StringBuffer("SomeURL"));
        Map<String, String> tokens = jwtHandlerService.createTokens(user, mockReq);

        assertNotNull(tokens.get("access_token"));
        assertNotNull(tokens.get("refresh_token"));

    }

    @Test
    void testVerifyAccessToken() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("USER"));
        User user = new User("test@test.com", "test", true, true, true, true, authorities);
        HttpServletRequest mockReq = Mockito.mock(HttpServletRequest.class);
        Mockito.when(mockReq.getRequestURL()).thenReturn(new StringBuffer("SomeURL"));
        Map<String, String> tokens = jwtHandlerService.createTokens(user, mockReq);
        
        try{
            jwtHandlerService.verifyAccessToken(tokens.get("access_token"));
        } catch(Exception e) {
            fail("There was an error thrown");
        }
        
    }

    @Test
    void testVerifyRefreshToken() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("USER"));
        User user = new User("test@test.com", "test", true, true, true, true, authorities);
        HttpServletRequest mockReq = Mockito.mock(HttpServletRequest.class);
        Mockito.when(mockReq.getRequestURL()).thenReturn(new StringBuffer("SomeURL"));
        Map<String, String> tokens = jwtHandlerService.createTokens(user, mockReq);
        
        UserService userService = mock(UserService.class);

        AppUser testUser = new AppUser(
            "test",
            "test",
            "test@test.com",
            "pass",
                "1998-07-23",
                "MALE",
                AppUserRole.USER
        );

        when(userService.getUserByEmail("test@test.com")).thenReturn(testUser);

        try{
            jwtHandlerService.setUserService(userService);
            jwtHandlerService.verifyRefreshToken(mockReq, tokens.get("refresh_token"));
        } catch(Exception e) {
            fail("There was an error thrown");
        }
        


    }

}
