package io.capstone.datum.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.capstone.datum.requests.AdminRegistrationRequest;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.adminservice.AdminService;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping(path = "api/admin")
@AllArgsConstructor
public class AdminController {

    @Autowired
    private final AdminService adminService;

    @Autowired
    private final ConfirmationTokenService confirmationTokenService;

    @PostMapping("/register")
    public String register(@RequestBody AdminRegistrationRequest request) {
        return adminService.register(request);
    }

    @GetMapping("/users")
    public String getUsers() {
        return adminService.getUsers().toString();
    }

    @GetMapping("/surveys")
    public String getSurveys() {
        return adminService.getSurveys().toString();
    }

    @GetMapping("/count/active/accounts")
    public String getActiveAccounts() {
        return adminService.countActiveAccounts().toString();
    }
    
    @GetMapping("/count/active/accounts/months")
    public String getActiveAccountsMonth() {
        return confirmationTokenService.usersJoinedMonth().toString();
    }

    @GetMapping("/count/users")
    public String countUsers() {
        return adminService.countUsers().toString();
    }

    @GetMapping("/count/admins")
    public String countAdmins() {
        return adminService.countAdmins().toString();
    }

    @GetMapping("/count/surveys")
    public String countSurveys() {
        return adminService.countSurveys().toString();
    }

    @GetMapping("/count/active/surveys")
    public String countActiveSurveys() {
        return adminService.countActiveSurveys().toString();
    }

    @GetMapping("/count/users/month")
    public String countUsersMonth() {
        return confirmationTokenService.usersJoined().toString();
    }

    @GetMapping("/count/admins/month")
    public String countAdminMonth() {
        return confirmationTokenService.adminsJoinedMonth().toString();
    }

    @GetMapping("/count/flagged/users")
    public String countFlaggedUsers() {
        return adminService.countFlaggedUsers().toString();
    }

    
    @GetMapping("/count/flagged/surveys")
    public String countFlaggedSurveys() {
        return adminService.countFlaggedSurveys().toString();
    }

    @PostMapping("/delete/user")
    public boolean deleteUsers(@RequestBody String ids) {
        return adminService.deleteUsers(ids);
    }

    @PostMapping("/flag/user")
    public boolean flagUsers(@RequestBody String ids) {
        return adminService.flagUsers(ids);
    }

    @PostMapping("/disable/user")
    public boolean disableUsers(@RequestBody String ids) {
        return adminService.disableUsers(ids);
    }

    @PostMapping("/enable/user")
    public boolean enableUsers(@RequestBody String ids) {
        return adminService.enableUsers(ids);
    }

    @PostMapping("/promote/user")
    public boolean promoteUsers(@RequestBody String ids) {
        return adminService.promoteUsers(ids);
    }

    @PostMapping("/send/email")
    public boolean sendEmail(@RequestBody String data) {
        return adminService.sendEmail(data);
    }

    @PostMapping("/delete/survey")
    public boolean deleteSurveys(@RequestBody String ids) {
        return adminService.deleteSurveys(ids);
    }

    @PostMapping("/disable/survey")
    public boolean disableSurveys(@RequestBody String ids) {
        return adminService.disableSurveys(ids);
    }

    @PostMapping("/enable/survey")
    public boolean enableSurveys(@RequestBody String ids) {
        return adminService.enableUsers(ids);
    }

    @PostMapping("/flag/survey")
    public boolean flagSurveys(@RequestBody String surveyIds) {
        return adminService.toggleFlagSurveys(surveyIds);
    }

}