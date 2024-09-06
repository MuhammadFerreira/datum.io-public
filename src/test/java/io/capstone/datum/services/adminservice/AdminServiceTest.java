package io.capstone.datum.services.adminservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import javax.mail.internet.MimeMessage;
import javax.mail.Session;

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
import io.capstone.datum.repositories.AdminRepository;
import io.capstone.datum.repositories.ConfirmationTokenRepository;
import io.capstone.datum.repositories.SurveyParticipationRepository;
import io.capstone.datum.repositories.SurveyRepository;
import io.capstone.datum.repositories.UserRepository;
import io.capstone.datum.requests.AdminRegistrationRequest;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.email.EmailService;
import io.capstone.datum.services.userservice.UserService;


@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@DataJpaTest
class AdminServiceTest {

    private UserService userService;
    private ConfirmationTokenService tokenService;
    private BCryptPasswordEncoder passwordEncoder;
    private AdminService adminService;
    private EmailService emailService;
    
    @MockBean
    private JavaMailSender mailSender;
    private MimeMessage mimeMessage;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AdminRepository adminRepo;
    @Autowired
    private ConfirmationTokenRepository tokenRepo;
    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private SurveyRepository surveyRepo;
    @Autowired
    private SurveyParticipationRepository surveyParticipationRepo;

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
        userService = Mockito.spy(new UserService(userRepo, surveyParticipationRepo, passwordEncoder, tokenService, surveyRepo, emailService, null, null)); 
        tokenService = Mockito.spy(new ConfirmationTokenService(tokenRepo)); 

        mimeMessage = new MimeMessage((Session)null);
        mailSender = mock(JavaMailSender.class);
        emailService = Mockito.spy(new EmailService(mailSender));

        adminService = Mockito.spy(new AdminService(userService, emailService, adminRepo, userRepo, surveyParticipationRepo, tokenService, surveyRepo)); 
    }

    @AfterEach
    void tearDown(){
        tokenRepo.deleteAll();
        userRepo.deleteAll();
        adminRepo.deleteAll();
    }

    @Test
    void testRegisterAdmin() throws Exception {


        AdminRegistrationRequest request = new AdminRegistrationRequest("test", "test", "test@test.com", "ADMIN");               
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        adminService.register(request);

        AppUser inRepo = userRepo.findByEmail("test@test.com").get();

        assertEquals(AppUserRole.ADMIN, inRepo.getAppUserRole());
        assertNull(inRepo.getPassword());
        
    }

    @Test
    void testRegisterUser() throws Exception {

        AdminRegistrationRequest request = new AdminRegistrationRequest("test", "test", "test@test.com", "USER");               
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        adminService.register(request);

        AppUser inRepo = userRepo.findByEmail("test@test.com").get();

        assertEquals(AppUserRole.USER, inRepo.getAppUserRole());
        assertNull(inRepo.getPassword());

        

    }

    @Test
    void testDisableUsers(){
        AppUser user = new AppUser("John", "Doe", "john@doe.com", "password",
                "1998-07-23", "MALE",
                AppUserRole.USER);
        AppUser user2 = new AppUser("Andrew", "Ng", "andrew.ng@doe.com", "password",
                "1998-07-23", "MALE",
                AppUserRole.USER);

        userRepo.save(user);
        userRepo.save(user2);

        Long user1Id = userRepo.findByEmail("john@doe.com").get().getId();
        Long user2Id = userRepo.findByEmail("andrew.ng@doe.com").get().getId();

        String ids = "[\""+user1Id+"\", \""+user2Id+"\"]";
        boolean response = adminService.disableUsers(ids);
        assertTrue(response);
    }

    
    @Test
    void testRegisterWithSameEmail() throws Exception {

        AdminRegistrationRequest request = new AdminRegistrationRequest("test", "test", "test@test.com", "USER");               
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        adminService.register(request);

        AppUser inRepo = userRepo.findByEmail("test@test.com").get();

        assertNotNull(inRepo);

        entityManager.refresh(inRepo);

        assertNull(inRepo.getPassword());
        
        assertThrows(IllegalStateException.class, () -> adminService.register(request));
    }


}