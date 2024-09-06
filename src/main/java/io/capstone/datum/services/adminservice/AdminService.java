package io.capstone.datum.services.adminservice;

import io.capstone.datum.appusers.Admin;
import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.AppUserRole;
import io.capstone.datum.appusers.Occupation;
import io.capstone.datum.requests.AdminRegistrationRequest;
import io.capstone.datum.repositories.AdminRepository;
import io.capstone.datum.repositories.SurveyParticipationRepository;
import io.capstone.datum.repositories.SurveyRepository;
import io.capstone.datum.repositories.UserRepository;
import io.capstone.datum.security.token.ConfirmationToken;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.email.EmailService;
import io.capstone.datum.services.userservice.UserService;
import io.capstone.datum.survey.Survey;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminService {

    private final UserService appUserService;
    private final EmailService emailSender;
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final SurveyParticipationRepository surveyParticipationRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final SurveyRepository surveyRepository;

    private static final Logger logger = LogManager.getLogger(AdminService.class);

    public String register(AdminRegistrationRequest request) {

        String token;

        if (request.getRole().equals("ADMIN")) {
            token = signUpAdmin(
                    new Admin(
                            request.getFirstName(),
                            request.getLastName(),
                            request.getEmail(),
                            null,
                            "1998-07-23",
                            "MALE",
                            AppUserRole.ADMIN
                    )
            );
        }
        else {
            token = appUserService.signUpUser(
                    new AppUser(
                            request.getFirstName(),
                            request.getLastName(),
                            request.getEmail(),
                            null,
                            "1998-07-23",
                            "MALE",
                            AppUserRole.USER
                    )
            );
        }

        String link = "http://localhost:3000/confirm/" + token;
        String emailBody = "Hi " + request.getFirstName() + ",<br><br>Someone has signed you up for datum.io!<br>Please click on the below link to activate your account:<br><br><a href=\"" + link + "\">Activate Now</a><br>Link will expire in 15 minutes.<br><br>See you soon";
        emailSender.sendMessage(request.getEmail(), "Confirm your email!", emailBody);

        return token;
    }

    private String signUpAdmin(Admin admin) {
        // Sign Up a User
        boolean userExists = adminRepository
                .findByEmail(admin.getEmail())
                .isPresent();

        if (userExists) {

            throw new IllegalStateException("email already taken");
        }
        admin.setOccupation(Occupation.NONE);

        adminRepository.save(admin);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                admin);

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        return token;
    }

    

    public Long countUsers() {
        return userRepository.count();
    }

    // for counting active user accounts
    public Long countActiveAccounts() {
        return userRepository.countByEnabled(true) + 1;
    }

    // for counting flagged user accounts
    public Long countFlaggedUsers() {
        return userRepository.countAllByIsFlagged(true) - 1;
    }

    // for counting flagged surveys accounts
    public Long countFlaggedSurveys() {
        return surveyRepository.countAllByIsFlagged(true);
    }

    public Long countAdmins() {
        return adminRepository.count();
    }

    public Long countSurveys() {
        return surveyRepository.count();
    }

    public Long countActiveSurveys() {
        return surveyRepository.countByIsSurveyActive(true);
    }

    public JSONArray getUsers() {

        // Get users from DB
        List<AppUser> users = userRepository.findAll();
        JSONArray responseArray = new JSONArray();

        // Iterate through surveys and print survey title
        for (AppUser user : users) {
            JSONObject response = new JSONObject();
            response.put("id", user.getId());
            response.put("name", user.getFirstName() + " " + user.getLastName());
            response.put("email", user.getEmail());
            response.put("flag", user.getIsFlagged() ? "Unflag" : "Flag");
            response.put("status", user.getEnabled() != null && user.getEnabled() ? "Active" : "Inactive");
            response.put("image", user.getProfilePic());
            response.put("occupation", user.getOccupation());
            response.put("online", "Offline");
            response.put("activity", user.getId());
            response.put("role", user.getAppUserRole().toString());
            response.put("tag1", user.getInterestTag1());
            response.put("tag2", user.getInterestTag2());
            response.put("tag3", user.getInterestTag3());
            response.put("tag4", user.getInterestTag4());
            response.put("tag5", user.getInterestTag5());
            responseArray.put(response);
        }

        return responseArray;
    }

    public JSONArray getSurveys() {

        // Get surveys from DB that are active
        List<Survey> surveys = surveyRepository.findAll();
        JSONArray responseArray = new JSONArray();

        // Iterate through surveys and print survey title
        for (Survey survey : surveys) {
            JSONObject response = new JSONObject();
            response.put("id", survey.getId());
            response.put("title", survey.getSurveyTitle());
            response.put("surveyImage", survey.getSurveyImage());
            response.put("nbParticipants", survey.getTotalParticipants());
            response.put("status", survey.getIsSurveyActive() ? "Active" : "Inactive");
            response.put("flag", survey.getIsFlagged() ? "Unflag" : "Flag");
            response.put("researcher", survey.getCreator().getFirstName() + " " + survey.getCreator().getLastName());
            response.put("researcherId", survey.getCreator().getId());
            response.put("creatorProfileImage", survey.getCreator().getProfilePic());
            response.put("tag1", survey.getSurveyTag1());
            response.put("tag2", survey.getSurveyTag2());
            response.put("tag3", survey.getSurveyTag3());
            response.put("description", survey.getSurveyDescription());
            response.put("duration", survey.getTotalQuestions());
            response.put("numParticipants", survey.getTotalParticipants());
            response.put("reward", survey.getPoints());

            responseArray.put(response);
        }

        return responseArray;
    }

    public boolean deleteUsers(String ids) {
        JSONArray response = new JSONArray(ids);

        // iterate through emails and delete users
        for (int i = 0; i < response.length(); i++) {
            Optional<AppUser> possibleUser = userRepository.findById(response.getLong(i));
            AppUser user;
            if(possibleUser.isPresent()) {
                user = possibleUser.get();
                userRepository.delete(user);
            }
            else {
                throw new NoSuchElementException();
            }
        }

        return true;
    }

    public boolean sendEmail(String data) {

        try {

            JSONArray response = new JSONArray(data);

            String title = response.getString(2);
            String message = response.getString(1);
            String email = response.getString(0);

            JSONArray emails = new JSONArray(email);

            // create array from response
            String[] userEmails = emails.toList().toArray(new String[0]);

            // send email
            emailSender.sendMessage(userEmails, title, message);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    public boolean toggleFlagSurveys(String surveyIds) {

        try {
            JSONArray response = new JSONArray(surveyIds);

            // iterate through ids and flag surveys
            for (int i = 0; i < response.length(); i++) {
                Optional<Survey> possibleSurvey = surveyRepository.findById(response.getLong(i));
                Survey survey;
                if(possibleSurvey.isPresent()) {
                    survey = possibleSurvey.get();
                    survey.setIsFlagged(!survey.getIsFlagged());
                    surveyRepository.save(survey);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean promoteUsers(String ids) {

        try {
            JSONArray response = new JSONArray(ids);

            // iterate through ids and promote users
            for (int i = 0; i < response.length(); i++) {
                Optional<AppUser> possibleUser = userRepository.findById(response.getLong(i));
                AppUser user;
                if(possibleUser.isPresent()) {
                    user = possibleUser.get();
                    user.setAppUserRole(AppUserRole.ADMIN);
                    adminRepository.save((Admin) user);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean flagUsers(String ids) {

        try {
            JSONArray response = new JSONArray(ids);

            // iterate through ids and flag users
            for (int i = 0; i < response.length(); i++) {
                Optional<AppUser> possibleUser = userRepository.findById(response.getLong(i));
                AppUser user;
                if(possibleUser.isPresent()) {
                    user = possibleUser.get();
                    user.setIsFlagged(!user.getIsFlagged());
                    userRepository.save(user);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean enableUsers(String ids) {

        try {
            JSONArray response = new JSONArray(ids);

            // iterate through ids and enable users
            for (int i = 0; i < response.length(); i++) {
                Optional<AppUser> possibleUser = userRepository.findById(response.getLong(i));
                AppUser user;
                if(possibleUser.isPresent()) {
                    user = possibleUser.get();
                    user.setEnabled(true);
                    userRepository.save(user);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean disableUsers(String ids) {

        try {
            JSONArray response = new JSONArray(ids);

            // iterate through ids and disable users
            for (int i = 0; i < response.length(); i++) {
                Optional<AppUser> possibleUser = userRepository.findById(response.getLong(i));
                AppUser user;
                if (possibleUser.isPresent()) {
                    user = possibleUser.get();
                    user.setEnabled(false);
                    userRepository.save(user);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean deleteSurveys(String ids) {

        try {
            JSONArray response = new JSONArray(ids);

            // iterate through ids and delete surveys
            for (int i = 0; i < response.length(); i++) {
                Optional<Survey> possibleSurvey = surveyRepository.findById(response.getLong(i));
                Survey survey;
                if(possibleSurvey.isPresent()) {
                    survey = possibleSurvey.get();
                    surveyRepository.delete(survey);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean disableSurveys(String ids) {

        try {
            JSONArray response = new JSONArray(ids);

            // iterate through ids and disable surveys
            for (int i = 0; i < response.length(); i++) {
                Optional<Survey> possibleSurvey = surveyRepository.findById(response.getLong(i));
                Survey survey;
                if(possibleSurvey.isPresent()) {
                    survey = possibleSurvey.get();
                    survey.setIsEnabled(true);
                    surveyRepository.save(survey);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean enableSurveys(String ids) {

        try {
            JSONArray response = new JSONArray(ids);

            // iterate through ids and enable surveys
            for (int i = 0; i < response.length(); i++) {
                Optional<Survey> possibleSurvey = surveyRepository.findById(response.getLong(i));
                Survey survey;
                if(possibleSurvey.isPresent()) {
                    survey = possibleSurvey.get();
                    survey.setIsEnabled(false);
                    surveyRepository.save(survey);
                }
                else {
                    throw new NoSuchElementException();
                }
            }

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    // Mapping for 7 days left on Survey Notice
    public boolean sevenDayNotification() {
        try {
            // Get Survey Participation from DB
            List<String> surveyParticipation;
            surveyParticipation = surveyParticipationRepository.findAllParticipantEmailSevenDays();
            // send emails to all participants in the survey
            for (int i = 0; i < surveyParticipation.size(); i++) {
                emailSender.sendMessage(surveyParticipation.get(i), "Notice: Survey will end soon",
                        "This survey is set to end in 7 days, please be sure to complete and submit it before the due date.");
            }
            // return true if successful
            return true;
        } catch (Exception e) {
            // return false if unsuccessful
            logger.error(e.getMessage());
            return false;
        }
    }

    // Mapping for 3 days left on Survey Notice
    public boolean threeDayNotification() {
        try {
            // Get Survey Participation from DB
            List<String> surveyParticipation;
            surveyParticipation = surveyParticipationRepository.findAllParticipantEmailThreeDays();
            // send emails to all participants in the survey
            for (int i = 0; i < surveyParticipation.size(); i++) {
                emailSender.sendMessage(surveyParticipation.get(i), "Notice: Survey will end soon",
                        "This survey is set to end in 3 days, please be sure to complete and submit it before the due date.");
            }
            // return true if successful
            return true;
        } catch (Exception e) {
            // return false if unsuccessful
            logger.error(e.getMessage());
            return false;
        }
    }

    // Mapping for 1 days left on Survey Notice
    public boolean oneDayNotification() {
        try {
            // Get Survey Participation from DB
            List<String> surveyParticipation;
            surveyParticipation = surveyParticipationRepository.findAllParticipantEmailOneDay();
            // send emails to all participants in the survey
            for (int i = 0; i < surveyParticipation.size(); i++) {
                emailSender.sendMessage(surveyParticipation.get(i), "Notice: Survey will end soon",
                        "This survey is set to end in 1 day, please be sure to complete and submit it before the due date.");
            }
            // return true if successful
            return true;
        } catch (Exception e) {
            // return false if unsuccessful
            logger.error(e.getMessage());
            return false;
        }
    }

     
     //This will be a scheduled call that changes the on_streak and streak_length values if necessary
     public boolean globalUserStreakCheck() { 
        try {
        
         
            //Iterate through AppUsers, and check to see if their streak is still valid, if not remove streak, remove streakDate, and remove streak length   
        for (AppUser usr : userRepository.findAll()) {
            LocalDateTime localDateTime = LocalDateTime.now();
           
            if((int)ChronoUnit.HOURS.between(usr.getStreakDate(), localDateTime) >= 48){
                usr.setStreakLength(0);
                userRepository.save(usr);
            }                 
        }
            //return true if successful
            return true;  
        }
        catch(Exception e){
            //return false if unsuccessful
            logger.error(e.getMessage());
            return false;
        }
    } 

    //This will be a scheduled call that changes that remind users to continue their streak
    public boolean globalUserStreakReminder() { 
        try {
        LocalDateTime localDateTime = LocalDateTime.now();
        //Iterate through AppUsers, and check to see if they are on streak, if so, remind them to keep it going  
        for (AppUser usr : userRepository.findAll()) {
           
            if((int)ChronoUnit.HOURS.between(usr.getStreakDate(), localDateTime) > 24 && (int)ChronoUnit.HOURS.between(usr.getStreakDate(), localDateTime) < 48 && usr.getStreakLength() >= 3){
                emailSender.sendMessage(usr.getEmail(), "Notice: Streak Is About To End", "You are currently on a " + usr.getStreakLength() + " day streak, keep it going by completing another survey today!" );
            }
                 
        }
            //return true if successful
            return true;  
        }
        catch(Exception e){
            //return false if unsuccessful
            logger.error(e.getMessage());
            return false;
        }
    }

}
