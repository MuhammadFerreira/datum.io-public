package io.capstone.datum.controllers;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.security.Principal;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.util.NestedServletException;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;
import io.capstone.datum.repositories.ConfirmationTokenRepository;
import io.capstone.datum.repositories.UserRepository;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.userservice.UserService;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    UserController userController;
    UserService userService;
    ConfirmationTokenService tokenService;
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ConfirmationTokenRepository tokenRepo;

    @Test
    void contextLoads()
    {
        assertNotNull(userRepo);
        assertNotNull(tokenRepo);
    }

    @BeforeEach
    void setUp(){

        passwordEncoder  = new BCryptPasswordEncoder();

        tokenService = Mockito.spy(new ConfirmationTokenService(tokenRepo));  
        userService = Mockito.spy(new UserService(userRepo, passwordEncoder, tokenService)); 
        userController =  Mockito.spy(new UserController(userService, null));
    }

    @AfterEach
    void tearDown(){
        tokenRepo.deleteAll();
        userRepo.deleteAll();
    }

    @Test
    void testGetUserInfo() throws Exception {

        AppUser testUser = new AppUser(
            "test",
            "test",
            "test@test.com",
            "pass",
            AppUserRole.USER
        );
        userRepo.save(testUser);

        Principal mockPrincipal = Mockito.mock(Principal.class);
        Mockito.when(mockPrincipal.getName()).thenReturn("test@test.com");
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/auth/userinfo").principal(mockPrincipal)).andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    void testRefreshToken() throws Exception {
        AppUser testUser = new AppUser(
            "test",
            "test",
            "test@test.com",
            "pass",
            AppUserRole.USER
        );
        userRepo.save(testUser);

        Principal mockPrincipal = Mockito.mock(Principal.class);
        Mockito.when(mockPrincipal.getName()).thenReturn("test@test.com");
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/token/refresh").header(HttpHeaders.AUTHORIZATION, "Bearer IAMEXPIRED")).andExpect(MockMvcResultMatchers.status().isForbidden());
        assertThrows(NestedServletException.class, 
            () -> mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/token/refresh").header(HttpHeaders.AUTHORIZATION, "NOTOKEN")));

    }
}
