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
import io.capstone.datum.repositories.AdminRepository;
import io.capstone.datum.repositories.ConfirmationTokenRepository;
import io.capstone.datum.repositories.UserRepository;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.adminservice.AdminService;
import io.capstone.datum.services.email.EmailService;
import io.capstone.datum.services.userservice.UserService;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class AdminControllerTest {

    private AdminController adminController;
    private UserService userService;
    private ConfirmationTokenService tokenService;
    private BCryptPasswordEncoder passwordEncoder;
    private AdminService adminService;
    private EmailService emailService;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AdminRepository adminRepo;
    @Autowired
    private ConfirmationTokenRepository tokenRepo;

    @Test
    void contextLoads()
    {
        assertNotNull(userRepo);
        assertNotNull(tokenRepo);
        assertNotNull(adminRepo);
    }

    @BeforeEach
    void setUp(){

        passwordEncoder  = new BCryptPasswordEncoder();

        tokenService = Mockito.spy(new ConfirmationTokenService(tokenRepo));  
        userService = Mockito.spy(new UserService(userRepo, passwordEncoder, tokenService)); 
        tokenService = Mockito.spy(new ConfirmationTokenService(tokenRepo)); 
        adminService = Mockito.spy(new AdminService(userService, emailService, adminRepo, userRepo, tokenService, passwordEncoder)); 
        adminController =  Mockito.spy(new AdminController(adminService));
    }

    @AfterEach
    void tearDown(){
        tokenRepo.deleteAll();
        userRepo.deleteAll();
        adminRepo.deleteAll();
    }

    @Test
    void testRegister() throws Exception {


        Principal mockPrincipal = Mockito.mock(Principal.class);
        Mockito.when(mockPrincipal.getName()).thenReturn("test@test.com");
        mockMvc.perform(MockMvcRequestBuilders.post("/api/admin/register").header(HttpHeaders.AUTHORIZATION, "Bearer IAMEXPIRED")).andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }
}
