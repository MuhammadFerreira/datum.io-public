package io.capstone.datum.services.userservice;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.appusers.Gender;
import io.capstone.datum.appusers.Occupation;
import io.capstone.datum.repositories.AnswerRepository;
import io.capstone.datum.repositories.QuestionRepository;
import io.capstone.datum.repositories.SurveyParticipationRepository;
import io.capstone.datum.repositories.SurveyRepository;
import io.capstone.datum.repositories.UserRepository;
import io.capstone.datum.security.token.ConfirmationToken;
import io.capstone.datum.security.token.ConfirmationTokenService;
import io.capstone.datum.services.email.EmailService;
import io.capstone.datum.survey.Answers;
import io.capstone.datum.survey.Survey;
import io.capstone.datum.survey.SurveyParticipation;
import io.capstone.datum.survey.SurveyTags;
import io.capstone.datum.survey.question.Question;
import io.capstone.datum.survey.question.QuestionType;
import lombok.AllArgsConstructor;
 import java.text.SimpleDateFormat;
 import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.Queue;
import java.util.TimeZone;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository appUserRepository;
    private final SurveyParticipationRepository surveyParticipationRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final SurveyRepository surveyRepository;
    private final EmailService emailService;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    private static final Logger logger = LogManager.getLogger(UserService.class);

    private static final String TITLE = "title";
    private static final String DESC = "description";
    private static final String DURATION = "duration";
    private static final String NUM_PARTICIPANTS = "numParticipants";
    private static final String REWARD = "reward";
    private static final String SURVEY_IMG = "surveyImage";
    private static final String CREATOR = "creator";
    private static final String CREATOR_PIC = "profilePicCreator";
    private static final String CREATOR_ID = "creatorId";
    private static final String FIRST_NAME = "firstName";
    private static final String LAST_NAME = "lastName";
    private static final String EMAIL = "email";
    private static final String COUNTRY = "country";
    private static final String GENDER = "gender";
    private static final String OCCUPATION = "occupation";
    private static final String ABOUT_ME = "aboutMe";
    private static final String ADDRESS = "address";
    private static final String POSTAL_CODE = "postalCode";
    private static final String PROFILE_PIC = "profilePic";
    private static final String DUE_DATE = "dueDate";
    private static final String SURVEY_TYPE = "surveyType";
    private static final String POINTS = "points";
    private static final String SUBJECT = "subject";
    private static final String MESSAGE = "message";

    // Retrieve user from DB via email. Return as UserDetails object.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<AppUser> possibleUser = appUserRepository.findByEmail(email);
        AppUser user;

        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        } else {
            throw new NoSuchElementException();
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(user.getAppUserRole().name()));

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);

    }

    // Retrieve user from DB via email.
    public AppUser getUserByEmail(String email) {
        Optional<AppUser> possibleUser = appUserRepository.findByEmail(email);
        AppUser user;
        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }
        return user;
    }

    // Sign Up a User
    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        if (appUser.getPassword() != null) {
            String encodedPassword = bCryptPasswordEncoder
                    .encode(appUser.getPassword());
            appUser.setPassword(encodedPassword);
        }
        appUser.setOccupation(Occupation.NONE);
        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser);

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

        return token;
    }

    // Edit Password
    public void editPassword(String token, String password) {
        Optional<ConfirmationToken> possibleToken = confirmationTokenService.getToken(token);
        AppUser user;

        if (possibleToken.isPresent()) {
            user = possibleToken.get().getAppUser();
        }
        else {
            throw new NoSuchElementException();
        }
        String encodedPassword = bCryptPasswordEncoder
                .encode(password);

        user.setPassword(encodedPassword);

        appUserRepository.save(user);
    }

    // Enable a User
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public JSONArray getSurveys(String id) {

        // Get surveys from DB
        List<Survey> surveys = surveyRepository.findSurveysAppUserIsNotParticipatingIn(Long.parseLong(id));
        JSONArray responseArray = new JSONArray();

        // Iterate through surveys and print survey title
        for (Survey survey : surveys) {

            JSONObject response = new JSONObject();
            response.put("id", survey.getId());
            response.put(TITLE, survey.getSurveyTitle());
            response.put(DESC, survey.getSurveyDescription());
            response.put(DURATION, survey.getTotalQuestions());
            response.put(NUM_PARTICIPANTS, survey.getTotalParticipants());
            response.put(REWARD, survey.getPoints());
            response.put(SURVEY_IMG, survey.getSurveyImage());
            response.put(CREATOR, survey.getCreator().getFirstName() + " " + survey.getCreator().getLastName());
            response.put("tag1", survey.getSurveyTag1());
            response.put("tag2", survey.getSurveyTag2());
            response.put("tag3", survey.getSurveyTag3());
            response.put("dueDate", survey.getSurveyEndDate());
            response.put(CREATOR_PIC, survey.getCreator().getProfilePic());
            response.put(CREATOR_ID, survey.getCreator().getId());
            responseArray.put(response);
        }

        return responseArray;
    }

    public String getUser(String id) {

        Optional<AppUser> possibleUser = appUserRepository.findById(Long.parseLong(id));
        AppUser user;
        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }

        JSONObject response = new JSONObject();

        String capGender = user.getGender().name();
        String gender = capGender.substring(0, 1) + capGender.substring(1).toLowerCase(); 

        String capOccupation = user.getOccupation().name();
        String occupation = capOccupation.substring(0, 1) + capOccupation.substring(1).toLowerCase();

        response.put("id", user.getId());
        response.put(FIRST_NAME, user.getFirstName());
        response.put(LAST_NAME, user.getLastName());
        response.put(EMAIL, user.getEmail());
        response.put("userImage", user.getProfilePic());
        response.put("userRole", user.getAppUserRole().name());
        response.put(COUNTRY, user.getCountry());
        response.put("dob", user.getDateOfBirth());
        response.put(GENDER, gender);
        response.put(OCCUPATION, occupation);
        response.put(ABOUT_ME, user.getAboutMe());
        response.put(ADDRESS, user.getAddress());
        response.put("city", user.getCity());
        response.put(POSTAL_CODE, user.getPostalCode());

        response.put("tag1", user.getInterestTag1());
        response.put("tag2", user.getInterestTag2());
        response.put("tag3", user.getInterestTag3());
        response.put("tag4", user.getInterestTag4());
        response.put("tag5", user.getInterestTag5());

        return response.toString();
    }

    public Long countActiveSurveys() {
        return surveyRepository.countByIsSurveyActive(true);
    }

    public Long countSurveys() {
        return surveyRepository.count();
    }

    public String getCurrentUserInfo(String name) {
        AppUser user = getUserByEmail(name);
        
        int streakLength = user.getStreakLength();

        JSONObject response = new JSONObject();

        String capGender = user.getGender().name();
        String gender = capGender.substring(0, 1) + capGender.substring(1).toLowerCase();

        String capOccupation = user.getOccupation().name();
        String occupation = capOccupation.substring(0, 1) + capOccupation.substring(1).toLowerCase();

        response.put("id", user.getId());
        response.put(FIRST_NAME, user.getFirstName());
        response.put(LAST_NAME, user.getLastName());
        response.put(EMAIL, user.getEmail());
        response.put("userImage", user.getProfilePic());
        response.put("userRole", user.getAppUserRole());
        response.put(COUNTRY, user.getCountry());
        response.put("dob", user.getDateOfBirth());
        response.put(GENDER, gender);
        response.put(OCCUPATION, occupation);
        response.put(ABOUT_ME, user.getAboutMe());
        response.put(ADDRESS, user.getAddress());
        response.put("city", user.getCity());
        response.put(POSTAL_CODE, user.getPostalCode());
        if(streakLength >=3){
            response.put("streakLength", streakLength);
}
        // create an array containing interest tags
        JSONArray tags = new JSONArray();
        tags.put(user.getInterestTag1());
        tags.put(user.getInterestTag2());
        tags.put(user.getInterestTag3());
        tags.put(user.getInterestTag4());
        tags.put(user.getInterestTag5());
        response.put("tags", tags);

        return response.toString();
    }

    public boolean updateUserInfo(String id, String userInfo) {

        try {

            JSONObject info = new JSONObject(userInfo);

            Optional<AppUser> possibleUser = appUserRepository.findById(Long.parseLong(id));
            AppUser user;
            if (possibleUser.isPresent()) {
                user = possibleUser.get();
            }
            else {
                throw new NoSuchElementException();
            }

            user.setAboutMe(info.getString(ABOUT_ME));
            user.setCountry(info.getString(COUNTRY));
            user.setDateOfBirth(Date.valueOf(info.getString("dob")));
            user.setOccupation(Occupation.valueOf(info.getString(OCCUPATION).toUpperCase()));
            user.setGender(Gender.valueOf(info.getString(GENDER).toUpperCase()));
            user.setProfilePic(info.getString(PROFILE_PIC));
            user.setAddress(info.getString(ADDRESS));
            user.setCity(info.getString("city"));
            user.setPostalCode(info.getString(POSTAL_CODE));

            user.setInterestTag1(null);
            user.setInterestTag2(null);
            user.setInterestTag3(null);
            user.setInterestTag4(null);
            user.setInterestTag5(null);

            JSONArray tags = info.getJSONArray("tags");

            if (tags.length() > 0) {
                user.setInterestTag1(SurveyTags.valueOf(tags.getString(0)));
            }

            if (tags.length() > 1) {
                user.setInterestTag2(SurveyTags.valueOf(tags.getString(1)));
            }

            if (tags.length() > 2) {
                user.setInterestTag3(SurveyTags.valueOf(tags.getString(2)));
            }

            if (tags.length() > 3) {
                user.setInterestTag4(SurveyTags.valueOf(tags.getString(3)));
            }

            if (tags.length() > 4) {
                user.setInterestTag5(SurveyTags.valueOf(tags.getString(4)));
            }

            appUserRepository.save(user);

            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean editSurvey(String surveyInfo) {
        try {
            JSONObject info = new JSONObject(surveyInfo);

            Optional<Survey> possibleSurvey = surveyRepository.findById(info.getLong("id"));
            Survey survey = new Survey();
            if (possibleSurvey.isPresent()) {
                survey = possibleSurvey.get();
            }

            survey.setSurveyTitle(info.getString(TITLE));
            survey.setSurveyDescription(info.getString(DESC));
            survey.setIsSurveyActive(info.getBoolean("active"));
            survey.setSurveyImage(info.getString(SURVEY_IMG));

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date parsedDate = new Date(dateFormat.parse(info.getString(DUE_DATE)).getTime());
            survey.setSurveyEndDate(parsedDate);

            JSONArray tags = info.getJSONArray("tags");

            if (tags.length() > 0) {
                survey.setSurveyTag1(SurveyTags.valueOf(tags.getString(0)));
            }

            if (tags.length() > 1) {
                survey.setSurveyTag2(SurveyTags.valueOf(tags.getString(1)));
            }

            if (tags.length() > 2) {
                survey.setSurveyTag3(SurveyTags.valueOf(tags.getString(2)));
            }

            questionRepository.removeBySurvey(survey);

            surveyRepository.save(survey);

            importDefaultQuestions(info.getJSONArray("questionList"), survey);

            // Get Survey Participation from DB
            Queue<String> surveyParticipation = new LinkedList<>();

            surveyParticipation.addAll(surveyParticipationRepository.findAllParticipantEmail(survey.getId()));

            String subject = "Survey Update: " + survey.getSurveyTitle();
            String message = "Hello, <br>"
                    + "There were some changes made to the survey you are participating in:"
                    + "<br><br>"
                    + survey.getSurveyTitle()
                    + "<br><br>"
                    + "Please click on the link below to view the survey. <br>"
                    + "http://localhost:3000/user/participating/studies"
                    + "<br><br>";

            Thread task1 = new Thread(new Runnable() {
                @Override
                public void run() {

                    try {
                        // send emails to all participants in the survey
                        for (int i = 0; i < surveyParticipation.size(); i++) {
                            emailService.sendMessage(surveyParticipation.poll(), subject, message);
                        }

                    } catch (Exception e) {
                        logger.error(e.getMessage());
                    }
                }
            });

            task1.start();

            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public boolean createSurvey(String surveyInfo) {

        try {
            JSONObject info = new JSONObject(surveyInfo);

            Optional<AppUser> possibleUser = appUserRepository.findById(info.getLong("user"));
            AppUser user;
            if (possibleUser.isPresent()) {
                user = possibleUser.get();
            }
            else {
                throw new NoSuchElementException();
            }

            Survey survey = new Survey();

            survey.setSurveyTitle(info.getString(TITLE));
            survey.setSurveyDescription(info.getString(DESC));
            survey.setCreator(user);
            survey.setIsSurveyActive(true);
            survey.setIsEnabled(true);
            survey.setIsFlagged(false);
            survey.setSurveyType(info.getString(SURVEY_TYPE));
            survey.setIsSurveyComplete(false);
            survey.setIsSurveyActive(info.getBoolean("active"));
            survey.setSurveyImage(info.getString(SURVEY_IMG));
            survey.setIsSurveyImported(true);
            survey.setSurveyLink(info.getString("link"));

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date parsedDate = new Date(dateFormat.parse(info.getString(DUE_DATE)).getTime());
            survey.setSurveyEndDate(parsedDate);

            JSONArray tags = info.getJSONArray("tags");

            if (tags.length() > 0) {
                survey.setSurveyTag1(SurveyTags.valueOf(tags.getString(0)));
            }

            if (tags.length() > 1) {
                survey.setSurveyTag2(SurveyTags.valueOf(tags.getString(1)));
            }

            if (tags.length() > 2) {
                survey.setSurveyTag3(SurveyTags.valueOf(tags.getString(2)));
            }

            surveyRepository.save(survey);

            if (info.getString(SURVEY_TYPE).equals("Google Form")) {
                importGoogleForm(info.getString("link"), survey);
            } else {
                importDefaultQuestions(info.getJSONArray("questionList"), survey);
            }

            Thread task = new Thread(new Runnable() {
                @Override
                public void run() {
                    // check if any user in the database has the same interest tags as the survey
                    List<AppUser> users = appUserRepository.findAllByInterestTag(survey.getSurveyTag1());

                    for (AppUser user : users) {
                        try {
                            // send email to user
                            String to = user.getEmail();
                            String subject = "New " + survey.getSurveyTag1().toString() + " Survey Available!";
                            String body = "Hi " + user.getFirstName() + ",<br><br>"
                                    + "A new survey has been added to the system that matches your interests. Please log in to your account to view the survey.<br><br>"
                                    + "Kind Regards,<br>" + "The datum.io Team";

                            emailService.sendMessage(to, subject, body);
                        } catch (Exception e) {
                            logger.error(e.getMessage());
                        }
                    }

                    // check if any user in the database has the same interest tags as the survey
                    users = appUserRepository.findAllByInterestTag(survey.getSurveyTag2());

                    for (AppUser user : users) {
                        try {
                            // send email to user
                            String to = user.getEmail();
                            String subject = "New " + survey.getSurveyTag2().toString() + " Survey Available!";
                            String body = "Hi " + user.getFirstName() + ",<br><br>"
                                    + "A new survey has been added to the system that matches your interests. Please log in to your account to view the survey.<br><br>"
                                    + "Kind Regards,<br>" + "The datum.io Team";

                            emailService.sendMessage(to, subject, body);
                        } catch (Exception e) {
                            logger.error(e.getMessage());
                        }
                    }

                    // check if any user in the database has the same interest tags as the survey
                    users = appUserRepository.findAllByInterestTag(survey.getSurveyTag3());

                    for (AppUser user : users) {
                        try {
                            // send email to user
                            String to = user.getEmail();
                            String subject = "New " + survey.getSurveyTag3().toString() + " Survey Available!";
                            String body = "Hi " + user.getFirstName() + ",<br><br>"
                                    + "A new survey has been added to the system that matches your interests. Please log in to your account to view the survey.<br><br>"
                                    + "Kind Regards,<br>" + "The datum.io Team";

                            emailService.sendMessage(to, subject, body);
                        } catch (Exception e) {
                            logger.error(e.getMessage());
                        }
                    }
                }
            });

            task.start();

            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }

    }

    public void importDefaultQuestions(JSONArray questionList, Survey survey) {
        int totalPoints = 0;
        int totalQuestions = 0;

        for (int i = 0; i < questionList.length(); i++) {
            JSONObject questionObject = questionList.getJSONObject(i);
            String questionType = questionObject.getString("type");
            String questionTitle = questionObject.getString("question");
            Question question = new Question();
            if (questionType.equals("textbox")) {
                question.setQuestionType(QuestionType.TEXT);
            } else if (questionType.equals("mcq")) {
                question.setQuestionType(QuestionType.MCQ);
                JSONArray options = questionObject.getJSONArray("options");
                question.setOptions(options.toList().toArray(new String[0]));
            } else if (questionType.equals("linear")) {
                // Do Steps for Linear Questions
                question.setQuestionType(QuestionType.SCALE);
            }

            question.setQuestion(questionTitle);
            question.setSurvey(survey);
            question.setPoints(calculatePoints(question));
            totalPoints += question.getPoints();
            totalQuestions++;
            questionRepository.save(question);
        }
        survey.setPoints(totalPoints);
        survey.setTotalQuestions(totalQuestions);
        surveyRepository.save(survey);
    }

    public void importGoogleForm(String getUrl, Survey survey) throws IOException {
        URL url = new URL(getUrl);
        try (BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()))) {
            // Get variables from google forms
            String data = in.readLine();
            String[] dataSplit = data.split("var FB_PUBLIC_LOAD_DATA_ = ");
            String[] dataSplit2 = dataSplit[1].split(";");
            String dataSplit3 = dataSplit2[0];

            JSONArray jsonArray = new JSONArray(dataSplit3);
            JSONArray jsonArray3 = (JSONArray) jsonArray.get(1);
            JSONArray jsonArray4 = (JSONArray) jsonArray3.get(1);

            int totalPoints = 0;
            int totalQuestions = 0;

            for (int i = 0; i < jsonArray4.length(); i++) {

                JSONArray jsonArray5 = (JSONArray) jsonArray4.get(i);
                String questionTitle = jsonArray5.get(1).toString();
                int questionType = (int) jsonArray5.get(3);

                Question question = new Question();
                question.setQuestion(questionTitle);
                question.setSurvey(survey);

                if (questionType == 2) {
                    JSONArray jsonArray6 = (JSONArray) jsonArray5.get(4);
                    JSONArray jsonArray7 = (JSONArray) jsonArray6.get(0);
                    JSONArray jsonArray8 = (JSONArray) jsonArray7.get(1);

                    // Create an array of strings to store the options
                    String[] options = new String[jsonArray8.length()];

                    for (int j = 0; j < jsonArray8.length(); j++) {

                        JSONArray jsonArray9 = (JSONArray) jsonArray8.get(j);
                        options[j] = jsonArray9.get(0).toString();
                    }

                    question.setQuestionType(QuestionType.MCQ);
                    question.setOptions(options);
                    question.setPoints(calculatePoints(question));
                    questionRepository.save(question);
                } else if (questionType == 5) {
                    JSONArray jsonArray6 = (JSONArray) jsonArray5.get(4);
                    JSONArray jsonArray7 = (JSONArray) jsonArray6.get(0);
                    JSONArray jsonArray8 = (JSONArray) jsonArray7.get(1);

                    // get minimum and maximum values
                    int minValue = Integer.parseInt(((JSONArray) jsonArray8.get(0)).get(0).toString());
                    int maxValue = Integer
                            .parseInt(((JSONArray) jsonArray8.get(jsonArray8.length() - 1)).get(0).toString());

                    question.setQuestionType(QuestionType.SCALE);
                    question.setMinValue(minValue);
                    question.setMaxValue(maxValue);
                    question.setPoints(calculatePoints(question));
                    questionRepository.save(question);
                } else {
                    question.setQuestionType(QuestionType.TEXT);
                    question.setPoints(calculatePoints(question));
                    questionRepository.save(question);
                }

                totalPoints += question.getPoints();
                totalQuestions++;

            }

            survey.setPoints(totalPoints);
            survey.setTotalQuestions(totalQuestions);

            surveyRepository.save(survey);
        }
    }

    public String getSurvey(String id) {
        Optional<Survey> possibleSurvey = surveyRepository.findById(Long.parseLong(id));
        Survey survey;
        if (possibleSurvey.isPresent()) {
            survey = possibleSurvey.get();
        }
        else {
            throw new NoSuchElementException();
        }

        JSONObject response = new JSONObject();

        response.put("id", survey.getId());
        response.put(TITLE, survey.getSurveyTitle());
        response.put(DESC, survey.getSurveyDescription());
        response.put(SURVEY_TYPE, survey.getSurveyType());
        response.put(SURVEY_IMG, survey.getSurveyImage());
        response.put("surveyLink", survey.getSurveyLink());
        response.put(CREATOR, survey.getCreator().getFirstName() + " " + survey.getCreator().getLastName());
        response.put("isSurveyActive", survey.getIsSurveyActive());
        response.put("isSurveyComplete", survey.getIsSurveyComplete());
        response.put("isSurveyImported", survey.getIsSurveyImported());
        response.put(REWARD, survey.getPoints());
        response.put("tag1", survey.getSurveyTag1());
        response.put("tag2", survey.getSurveyTag2());
        response.put("tag3", survey.getSurveyTag3());
        response.put(DUE_DATE, survey.getSurveyEndDate());

        // create an array containing interest tags
        JSONArray tags = new JSONArray();
        tags.put(survey.getSurveyTag1());
        tags.put(survey.getSurveyTag2());
        tags.put(survey.getSurveyTag3());
        response.put("tags", tags);

        // Get questions from Repository
        List<Question> questions = questionRepository.findAllBySurvey(survey);

        JSONArray questionsArray = new JSONArray();

        for (Question question : questions) {
            JSONObject questionObject = new JSONObject();
            questionObject.put("id", question.getId());
            questionObject.put("question", question.getQuestion());
            questionObject.put("questionType", question.getQuestionType());
            questionObject.put("minValue", question.getMinValue());
            questionObject.put("maxValue", question.getMaxValue());
            questionObject.put("options", question.getOptions());
            questionObject.put(POINTS, question.getPoints());
            questionsArray.put(questionObject);
        }

        response.put("questions", questionsArray);

        return response.toString();
    }

    public boolean participateSurvey(String id, String payload) {

        JSONObject info = new JSONObject(payload);
        Long userId = info.getLong("id");

        try {
            Optional<AppUser> possibleUser = appUserRepository.findById(userId);
            AppUser user;
            if (possibleUser.isPresent()) {
                user = possibleUser.get();
            }
            else {
                throw new NoSuchElementException();
            }

            Optional<Survey> possibleSurvey = surveyRepository.findById(Long.parseLong(id));
            Survey survey;
            if (possibleSurvey.isPresent()) {
                survey = possibleSurvey.get();
            }
            else {
                throw new NoSuchElementException();
            }

            survey.setTotalParticipants(survey.getTotalParticipants() + 1);

            surveyParticipationRepository.save(new SurveyParticipation(survey, user));
            emailService.sendMessage(user.getEmail(), "You are now participating in " + survey.getSurveyTitle(),
                    user.getFirstName() + " " + user.getLastName() + ", Congratulations! You are now participating in "
                            + survey.getSurveyTitle() + ".");
            emailService.sendMessage(survey.getCreator().getEmail(), " A New User Has Participated In Your Survey",
                    user.getFirstName() + " " + user.getLastName()
                            + " has participated in your survey. Please check your dashboard for more information.");
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }

    }

    public boolean withdrawSurvey(String id, String payload) {
        JSONObject info = new JSONObject(payload);
        Long userId = info.getLong("id");
        try {
            Optional<AppUser> possibleUser = appUserRepository.findById(userId);
            AppUser user;
            if (possibleUser.isPresent()) {
                user = possibleUser.get();
            }
            else {
                throw new NoSuchElementException();
            }

            Optional<Survey> possibleSurvey = surveyRepository.findById(Long.parseLong(id));
            Survey survey;
            if (possibleSurvey.isPresent()) {
                survey = possibleSurvey.get();
            }
            else {
                throw new NoSuchElementException();
            }

            survey.setTotalParticipants(survey.getTotalParticipants() - 1);

            surveyParticipationRepository.deleteByAppUserAndSurvey(user, survey);
            surveyParticipationRepository.flush();

            AppUser creator = survey.getCreator();

            emailService.sendMessage(creator.getEmail(), "User Has Withdrawn From " + survey.getSurveyTitle(),
                    user.getFirstName() + " " + user.getLastName()
                            + " has withdrawn from your survey. Please check your dashboard for more information.");

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public JSONArray getParticipatedSurveys(String id) {

        // Get surveys from DB
        Optional<AppUser> possibleUser = appUserRepository.findById(Long.parseLong(id));
        AppUser user;
        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }

        JSONArray responseArray = new JSONArray();

        // Iterate through surveys and print survey title
        for (Survey survey : surveyParticipationRepository.findByAppUserAndCompleted(user, false).stream()
                .map(SurveyParticipation::getSurvey).collect(Collectors.toList())) {

            JSONObject response = new JSONObject();
            response.put("id", survey.getId());
            response.put(TITLE, survey.getSurveyTitle());
            response.put(DESC, survey.getSurveyDescription());
            response.put(DURATION, survey.getTotalQuestions());
            response.put(NUM_PARTICIPANTS, survey.getTotalParticipants());
            response.put(REWARD, survey.getPoints());
            response.put(SURVEY_IMG, survey.getSurveyImage());
            response.put(CREATOR, survey.getCreator().getFirstName() + " " + survey.getCreator().getLastName());
            response.put("tag1", survey.getSurveyTag1());
            response.put("tag2", survey.getSurveyTag2());
            response.put("tag3", survey.getSurveyTag3());
            response.put("dueDate", survey.getSurveyEndDate());
            response.put(CREATOR_PIC, survey.getCreator().getProfilePic());
            response.put(CREATOR_ID, survey.getCreator().getId());
            responseArray.put(response);
        }

        return responseArray;
    }

    public boolean completeSurvey(String id, String userId) {
        try {
            JSONObject info = new JSONObject(userId);
            //get current date
            LocalDateTime localDateTime = LocalDateTime.now();

            //getting userId as Long
            Long userIdExtracted = info.getLong("id");
            // Get Survey from DB
            Optional<Survey> possibleSurvey = surveyRepository.findById(Long.parseLong(id));
            Survey survey;
            if (possibleSurvey.isPresent()) {
                survey = possibleSurvey.get();
            }
            else {
                throw new NoSuchElementException();
            }
            // Get User from DB
            Optional<AppUser> possibleUser = appUserRepository.findById(userIdExtracted);
            AppUser user;
            if (possibleUser.isPresent()) {
                user = possibleUser.get();
            }
            else {
                throw new NoSuchElementException();
            }
            // Get Survey Participation from DB
            SurveyParticipation surveyParticipation = surveyParticipationRepository.findByAppUserAndSurvey(user,
                    survey);

            // Set Survey Participation to complete
            surveyParticipation.setCompleted(true);
            //Update participation date completed 
            surveyParticipation.setDateCompleted(localDateTime); 
            
             //Get point value associate with survey
             int surveyPoints = surveyRepository.findSurveyPoints(Long.parseLong(id));
             //Get points user currently has
             int usrPoints = appUserRepository.findUserPoints(userIdExtracted); // eslint-disable-next-line
             //get users current streak 
             int usrStreakLength = user.getStreakLength();

             //This is the case where there is no streakDate or the streakDate is >=48 hrs behind the current date. In this case we set the streakDate to
             //Our current date, increase the streak length to 1, and add the regular amount of points from the survey to the user.
             if(user.getStreakDate() == null || (int)ChronoUnit.HOURS.between(user.getStreakDate(), localDateTime) >= 48){
                user.setStreakDate(localDateTime);
                usrStreakLength=1;
                usrPoints += surveyPoints;
                //Send email "Keep going, you are "usrStreak_length" days away from being on a streak!"
                emailService.sendMessage(user.getEmail(), "Streak Alert: Almost There!!!", "Hello, <br><br> Keep up the good work, you're almost on a streak! <br><br> You are "+ (3-usrStreakLength) +" days away from being on a streak! <br><br> Keep it up and extra points will be added for survey completion!" );
             } 
             //This is the case where the streakDate is less or equal to 24 hrs behind the current date. In this case, we dont increase the streak length,
             //set the streakDate, or add extra points, nor do we send an email.
             else if((int)ChronoUnit.HOURS.between(user.getStreakDate(), localDateTime) <=24){
                usrPoints += surveyPoints;
             }
             //This is the case where there is >24 vbut <48 hours between the streakDate and our current date. In this case, we set streak date to today
             //increase the streak length, add bonus points, and write an email either congradulating the user for earning a streak or encouraging them to
             //continue their streak
             else if((int)ChronoUnit.HOURS.between(user.getStreakDate(), localDateTime) > 24 && (int)ChronoUnit.HOURS.between(user.getStreakDate(), localDateTime) < 48){
                user.setStreakDate(localDateTime);
                usrStreakLength+=1;
                //if streakLength = 3, they have officially been on streak
                if(usrStreakLength == 3){
                    usrPoints += surveyPoints + 50;
                    emailService.sendMessage(user.getEmail(), "Streak Alert: You're On A Streak!!!", "Hello, <br><br> Congradulations, with this you're officially on a streakl! <br><br> Your streak has increased to "+ usrStreakLength +" days in a row! <br><br> Keep it up and enjoy the extra 50 points for completing your last survey!" );
                }
                //if streakLength > 3, they are continueing their streak
                else if(usrStreakLength > 3){
                    usrPoints += surveyPoints + 50;
                    emailService.sendMessage(user.getEmail(), "Streak Alert: You're On Fire!!!", "Hello, <br><br> Your streak has increased to "+ usrStreakLength +" days in a row! <br><br> Keep it up and enjoy the extra 50 points for completing your last survey!" );
                }
                //else they have a streakLength < 3, so they do not receive bonus points. They have 3- streakLength Days left until they are on Streak
                else{
                    usrPoints += surveyPoints;
                    emailService.sendMessage(user.getEmail(), "Streak Alert: Almost There!!!", "Hello, <br><br> Keep up the good work, you're almost on a streak! <br><br> You are "+ (3-usrStreakLength) +" days away from being on a streak! <br><br> Keep it up and extra points will be added for survey completion!" );
                }  
             }
             //setting userStreakLength and userPoints
             user.setStreakLength(usrStreakLength);
             user.setPoints(usrPoints);

              //getting completed surveys 
              int surveyCount = user.getSurveysCompleted();
              surveyCount++;
 
              //Update user points in DB
              user.setSurveysCompleted(surveyCount);
             
             //Update user and surveyParticipation in DB
             appUserRepository.save(user);
             surveyParticipationRepository.save(surveyParticipation);

            emailService.sendMessage(survey.getCreator().getEmail(),
                    user.getFirstName() + " " + user.getLastName() + " Has Completed Your Survey",
                    "Hello, <br><br> A new survey has been completed. <br><br> More details can be found on the website!");
            emailService.sendMessage(user.getEmail(), "Thanks for completing a survey: " + survey.getSurveyTitle(),
                    "Hello, <br><br> A new survey has been completed. <br><br> More details can be found on the website!");

            emailService.sendMessage(survey.getCreator().getEmail(),
                    user.getFirstName() + " " + user.getLastName() + " Has Completed Your Survey",
                    "Hello, <br><br> A new survey has been completed. <br><br> More details can be found on the website!");
            emailService.sendMessage(user.getEmail(), "Thanks for completing a survey: " + survey.getSurveyTitle(),
                    "Hello, <br><br> A new survey has been completed. <br><br> More details can be found on the website!");

            // return true if successful
            return true;
        } catch (Exception e) {
            // return false if unsuccessful
            logger.error(e.getMessage());
            return false;
        }
    }

    // Mapping for Survey Creator Send Notification
    public synchronized boolean creatorNotification(String id, String body) {

        try {
            JSONObject info = new JSONObject(body);
            // Get Survey from DB
            Optional<Survey> possibleSurvey = surveyRepository.findById(Long.parseLong(id));
            Survey survey;
            if (possibleSurvey.isPresent()) {
                survey = possibleSurvey.get();
            }
            else {
                throw new NoSuchElementException();
            }
            // Get Survey Participation from DB
            Queue<String> surveyParticipation = new LinkedList<>();

            surveyParticipation.addAll(surveyParticipationRepository.findAllParticipantEmail(survey.getId()));

            String subject = info.getString(SUBJECT);
            String message = info.getString(MESSAGE);

            Thread task1 = new Thread(new Runnable() {
                @Override
                public void run() {

                    try {
                        // send emails to all participants in the survey
                        for (int i = 0; i < surveyParticipation.size(); i++) {
                            emailService.sendMessage(surveyParticipation.poll(), subject, message);
                        }

                    } catch (Exception e) {
                        logger.error(e.getMessage());
                    }
                }
            });

            task1.start();

            // send copy of the email to the survey creator
            emailService.sendMessage(survey.getCreator().getEmail(), subject, message);

            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public JSONArray getCreatedSurveys(String id) {
        // Get surveys from DB
        Optional<AppUser> possibleUser = appUserRepository.findById(Long.parseLong(id));
        AppUser user;
        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }

        JSONArray responseArray = new JSONArray();

        // Iterate through surveys and print survey title
        for (Survey survey : user.getCreatedSurveys()) {

            JSONObject response = new JSONObject();
            response.put("id", survey.getId());
            response.put(TITLE, survey.getSurveyTitle());
            response.put(DESC, survey.getSurveyDescription());
            response.put(DURATION, survey.getTotalQuestions());
            response.put(NUM_PARTICIPANTS, survey.getTotalParticipants());
            response.put(REWARD, survey.getPoints());
            response.put(SURVEY_IMG, survey.getSurveyImage());
            response.put(CREATOR, survey.getCreator().getFirstName() + " " + survey.getCreator().getLastName());
            response.put("tag1", survey.getSurveyTag1());
            response.put("tag2", survey.getSurveyTag2());
            response.put("tag3", survey.getSurveyTag3());
            response.put("dueDate", survey.getSurveyEndDate());
            response.put(CREATOR_PIC, survey.getCreator().getProfilePic());
            response.put(CREATOR_ID, survey.getCreator().getId());
            responseArray.put(response);
        }

        return responseArray;
    }

    public JSONArray getCompletedSurveys(String id) {
        // Get surveys from DB
        Optional<AppUser> possibleUser = appUserRepository.findById(Long.parseLong(id));
        AppUser user;
        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }

        JSONArray responseArray = new JSONArray();

        // Iterate through surveys and print survey title
        for (Survey survey : surveyParticipationRepository.findByAppUserAndCompleted(user, true).stream()
                .map(SurveyParticipation::getSurvey).collect(Collectors.toList())) {

            JSONObject response = new JSONObject();
            response.put("id", survey.getId());
            response.put(TITLE, survey.getSurveyTitle());
            response.put(DESC, survey.getSurveyDescription());
            response.put(DURATION, survey.getTotalQuestions());
            response.put(NUM_PARTICIPANTS, survey.getTotalParticipants());
            response.put(REWARD, survey.getPoints());
            response.put(SURVEY_IMG, survey.getSurveyImage());
            response.put(CREATOR, survey.getCreator().getFirstName() + " " + survey.getCreator().getLastName());
            response.put("tag1", survey.getSurveyTag1());
            response.put("tag2", survey.getSurveyTag2());
            response.put("tag3", survey.getSurveyTag3());
            response.put("dueDate", survey.getSurveyEndDate());
            response.put(CREATOR_PIC, survey.getCreator().getProfilePic());
            response.put(CREATOR_ID, survey.getCreator().getId());
            responseArray.put(response);
        }

        return responseArray;
    }

    public JSONArray getSurveyParticipants(String surveyId) {
        Optional<Survey> possibleSurvey = surveyRepository.findById(Long.parseLong(surveyId));
        Survey survey;
        if(possibleSurvey.isPresent()) {
            survey = possibleSurvey.get();
        }
        else {
            throw new NoSuchElementException();
        }
        JSONArray participantArray = new JSONArray();

        // loops through all the participants 
        for (SurveyParticipation participant: surveyParticipationRepository.findAll()){

            if (participant.getSurvey() == survey) {

                AppUser user = participant.getAppUser();
                JSONObject response = new JSONObject();

                String capGender = user.getGender().name();
                String gender = capGender.substring(0, 1) + capGender.substring(1).toLowerCase(); 

                String capOccupation = user.getOccupation().name();
                String occupation = capOccupation.substring(0, 1) + capOccupation.substring(1).toLowerCase();

                response.put("id", user.getId());
                response.put(COUNTRY, user.getCountry());
                response.put(EMAIL, user.getEmail());
                response.put(FIRST_NAME, user.getFirstName());
                response.put(GENDER, gender);
                response.put(LAST_NAME, user.getLastName());
                response.put(OCCUPATION, occupation);
                response.put(PROFILE_PIC, user.getProfilePic());
                response.put("percentCompleted", participant.getPercentComplete());
                response.put(ADDRESS, user.getAddress());
                response.put("city", user.getCity());
                response.put(POSTAL_CODE, user.getPostalCode());

                participantArray.put(response);
            }
        }

        return participantArray;
    }


    //method to get all answers for a survey
    public JSONArray getTop30Users() {
        JSONArray top5UsersArray = new JSONArray();

        for (AppUser user : appUserRepository.findFirst30ByOrderByPointsDescIdAsc()) {

            AppUser currentUser = user;
            JSONObject response = new JSONObject();

            response.put(FIRST_NAME, currentUser.getFirstName());
            response.put(LAST_NAME, currentUser.getLastName());
            response.put(POINTS, currentUser.getPoints());
            response.put(OCCUPATION, currentUser.getOccupation());
            response.put(COUNTRY, currentUser.getCountry());
            response.put(PROFILE_PIC, currentUser.getProfilePic());
            response.put(EMAIL, currentUser.getEmail());
            response.put("id", currentUser.getId());
            response.put("finishedSurveysCount", currentUser.getSurveysCompleted());

            top5UsersArray.put(response);
        }
        return top5UsersArray;
    }

    public JSONObject geUserRankData(String id) {
        // Getting current user
        Optional<AppUser> possibleUser = appUserRepository.findById(Long.parseLong(id));
        AppUser currentUser;
        if(possibleUser.isPresent()) {
            currentUser = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }
        // List of all users in descending order by points
        List<AppUser> rankingList = appUserRepository.findAllByOrderByPointsDesc();
        // rank = index where we find our current user obj
        int rank = rankingList.indexOf(currentUser) + 1;

        // create JSON object with necesary data
        JSONObject response = new JSONObject();
        response.put(FIRST_NAME, currentUser.getFirstName());
        response.put(LAST_NAME, currentUser.getLastName());
        response.put(POINTS, currentUser.getPoints());
        response.put(OCCUPATION, currentUser.getOccupation());
        response.put(COUNTRY, currentUser.getCountry());
        response.put(PROFILE_PIC, currentUser.getProfilePic());
        response.put(EMAIL, currentUser.getEmail());
        response.put("rank", rank);
        response.put("id", currentUser.getId());
        response.put("finishedSurveysCount",
                surveyParticipationRepository.countByAppUserAndCompletedIsTrue(currentUser));

        return response;
    }

    // method to get all answers for a survey
    public String getAnswers(String surveyId, String userId) {

        // get survey from DB
        Optional<Survey> possibleSurvey = surveyRepository.findById(Long.parseLong(surveyId));
        Survey survey;
        if (possibleSurvey.isPresent()) {
            survey = possibleSurvey.get();
        }
        else{
            throw new NoSuchElementException();
        }

        // get user from DB
        Optional<AppUser> possibleUser = appUserRepository.findById(Long.parseLong(userId));
        AppUser user;
        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }

        // get survey participation from DB
        SurveyParticipation surveyParticipation = surveyParticipationRepository.findByAppUserAndSurvey(user, survey);

        // get answers from DB
        List<Answers> answersList = answerRepository.findAllBySurveyParticipation(surveyParticipation);

        // create JSON array
        JSONArray answers = new JSONArray();

        // iterate through answers
        for (Answers answer : answersList) {
            // create JSON object
            JSONObject ans = new JSONObject();

            // add question id to JSON object
            ans.put("questionId", answer.getQuestion().getId());

            // add answer to JSON object
            ans.put("answer", answer.getAnswer());

            // add JSON object to JSON array
            answers.put(ans);
        }

        // return JSON array
        return answers.toString();
    }

    public boolean saveAnswers(String id, String answers) {

        JSONObject info = new JSONObject(answers);

        // parse String id to long to get survey id
        Long surveyId = Long.parseLong(id);

        // get survey from DB
        Optional<Survey> possibleSurvey = surveyRepository.findById(surveyId);
        Survey survey;
        if (possibleSurvey.isPresent()) {
            survey = possibleSurvey.get();
        }
        else {
            throw new NoSuchElementException();
        }

        // get user from DB
        Optional<AppUser> possibleUser = appUserRepository.findById(info.getLong("id"));
        AppUser user;
        if (possibleUser.isPresent()) {
            user = possibleUser.get();
        }
        else {
            throw new NoSuchElementException();
        }

        // get survey participation from DB
        SurveyParticipation surveyParticipation = surveyParticipationRepository.findByAppUserAndSurvey(user, survey);

        // get answers from JSON
        JSONArray ans = info.getJSONArray("answers");

        // iterate through answers
        for (int i = 0; i < ans.length(); i++) {
            // get answer from JSON
            JSONObject answer = ans.getJSONObject(i);

            // get question from DB
            Optional<Question> possibleQuestion = questionRepository.findById(answer.getLong("questionId"));
            Question question;
            if (possibleQuestion.isPresent()) {
                question = possibleQuestion.get();
            }
            else {
                throw new NoSuchElementException();
            }

            // check if answer already exists
            if (answerRepository.findAllBySurveyParticipationAndQuestion(surveyParticipation, question) != null) {
                // if answer exists, delete it
                answerRepository.deleteBySurveyParticipationAndQuestion(surveyParticipation, question);
                answerRepository.flush();
            }

            // Create new answer object only if answer is not empty
            if (!answer.getString("value").equals("")) {
                Answers newAnswer = new Answers(surveyParticipation, question, answer.getString("value"));
                // save answer to DB
                answerRepository.save(newAnswer);
            }

        }

        // calculate percentage of survey completed
        int percentage = (int) (answerRepository.countBySurveyParticipation(surveyParticipation)
                / questionRepository.countBySurvey(survey) * 100);

        // set percentage of survey completed
        surveyParticipation.setPercentComplete(percentage);

        // save survey participation to DB
        surveyParticipationRepository.save(surveyParticipation);

        return true;
    }

    // Calculate value of question in points
    // Current Rule Set:
    // 1. Scale Question = 2 points
    // 2. MCQ Question with 4 or less options = 1 point
    // 3. MCQ Question with more than 4 options = 2 points
    // 4. Text Question = 3 points
    // 5. Other Question Types = 0 points
    public int calculatePoints(Question question) {
        int points = 0;

        // Points attributed to question type are still tentative
        switch (question.getQuestionType()) {
            case SCALE:
                points = 2;
                break;
            case MCQ:
                int questionLength = question.getOptions().length;
                if (questionLength > 4) {
                    points = 2;
                } else {
                    points = 1;
                }
                break;
            case TEXT:
                points = 3;
                break;
            default:
                points = 0;
        }
        return points;
    }

     // Mapping for Survey Creator Send Notification
     public synchronized boolean sendMessage(String receiverId, String body) {

        try {
            JSONObject info = new JSONObject(body);
            // Get Sender From DB
            Optional<AppUser> possibleSender = appUserRepository.findById(info.getLong("senderId"));
            //Get receiverfrom DB 
            Optional<AppUser> posssibleReceiver = appUserRepository.findById(Long.parseLong(receiverId));

            AppUser sender = new AppUser();
            AppUser receiver = new AppUser();

            if (possibleSender.isPresent()) {
                sender = possibleSender.get();
            }
            if (posssibleReceiver.isPresent()) {
                receiver = posssibleReceiver.get();
            }

            String subject = info.getString(SUBJECT);
            String message = info.getString(MESSAGE);

            
             try {
                 // send emails to all participants in the survey
                 emailService.sendMessage(receiver.getEmail(), "User " + sender.getFirstName() + " " + sender.getLastName() + "Has Sent You A Message", subject + "<br><br>" + message + "<br><br>" + "You can reply to the user via our platform or the users email: " + sender.getEmail());
                       
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
            
            // send copy of the email to the sender
            emailService.sendMessage(sender.getEmail(), "You Sent The Following To: " + receiver.getFirstName() + " "+ receiver.getLastName(), subject + "<br><br>" + message);

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    public JSONArray getSurveyNotifications(String userId) {
        JSONArray participantArray = new JSONArray();

        // loops through all the participants
        for (Survey survey : surveyRepository.notificationSurveys(Long.parseLong(userId))) {
            JSONObject response = new JSONObject();
            response.put(TITLE, survey.getSurveyTitle());
            response.put("deadline", survey.getSurveyEndDate());
            response.put("surveyId", survey.getId());
            response.put("image", survey.getSurveyImage());
            response.put("link", survey.getSurveyLink());
            participantArray.put(response);

        }

        return participantArray;
    }

    // Mapping for Survey Creator Send Notification
    public synchronized boolean sendInvite(String surveyId, String body) {

        try {
            JSONObject info = new JSONObject(body);
            // Get Sender Survey From DB
            Optional<Survey> possibleSender = surveyRepository.findById(Long.parseLong(surveyId));

            AppUser sender;
            Survey survey;

            if (possibleSender.isPresent()) {
                sender = possibleSender.get().getCreator();
                survey = possibleSender.get();
            }
            else {
                throw new NoSuchElementException();
            }

            String subject = info.getString(SUBJECT);
            String message = info.getString(MESSAGE);

            try {
                // send emails to all participants in the survey
                emailService.sendMessage(info.getString("receiverEmail"),
                        "User " + sender.getFirstName() + " " + sender.getLastName() + "<br>has Sent You A Message",
                        subject + "<br><br>" + message + "<br><br>"
                                + "You can reply to the user via our platform or the users email: " + sender.getEmail()
                                + "<br><br>" + "http://localhost:3000/user/search/"
                                + survey.getSurveyTitle());

            } catch (Exception e) {
                logger.error(e.getMessage());
            }

            // send copy of the email to the sender
            emailService.sendMessage(sender.getEmail(), "You Sent The Following To: " + info.getString("receiverEmail"),
                    subject + "<br><br>" + message);

            return true;

        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }
}
