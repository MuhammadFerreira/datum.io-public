package io.capstone.datum.controllers;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.capstone.datum.services.JWTHandlerService;
import io.capstone.datum.services.userservice.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = {"*"})
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;

	@Autowired
	private JWTHandlerService jwtHandlerService;


    //GET Route to retrive the User's General Information
	@GetMapping("/user/auth/userinfo")
	public String getUserInfo(Principal user) {		
		return userService.getCurrentUserInfo(user.getName());	 
	}

	//GET Route to refresh the Access Token
	@GetMapping("/auth/token/refresh")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String authorizationHeader = request.getHeader(AUTHORIZATION);
		if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			try {
				String refreshToken = authorizationHeader.substring("Bearer ".length());
				
				Map<String, String> tokenResponse = jwtHandlerService.verifyRefreshToken(request, refreshToken);

        		response.setContentType(APPLICATION_JSON_VALUE);
        		new ObjectMapper().writeValue(response.getOutputStream(), tokenResponse);
			} catch (Exception e) {
				log.error("ERROR Refreshing Token", e.getMessage());
				response.setHeader("error", e.getMessage());
				response.sendError(FORBIDDEN.value());
			}
		} else {
			throw new RuntimeException("Refresh Token is Missing!");
		}
	}

	@GetMapping("/surveys/{id}")
    public String getSurveys(@PathVariable("id") String id) {
        return userService.getSurveys(id).toString();
    }

	//get surveys participated in
	@GetMapping("/surveys/participated/{id}")
	public String getParticipatedSurveys(@PathVariable("id") String id) {
		return userService.getParticipatedSurveys(id).toString();
	}

	//get surveys created
	@GetMapping("/surveys/created/{id}")
	public String getCreatedSurveys(@PathVariable("id") String id) {
		return userService.getCreatedSurveys(id).toString();
	}

	//get surveys completed
	@GetMapping("/surveys/completed/{id}")
	public String getCompletedSurveys(@PathVariable("id") String id) {
		return userService.getCompletedSurveys(id).toString();
	}

	@GetMapping("/participants/{id}")
	public String getSurveyParticipants(@PathVariable("id") String id) {
		return userService.getSurveyParticipants(id).toString();
	}

	@GetMapping("/user/{id}")
    public String getUser(@PathVariable("id") String id) {
        return userService.getUser(id);
    }

	@GetMapping("/count/active/surveys")
    public String countActiveSurveys() {
        return userService.countActiveSurveys().toString();
    }

	@GetMapping("/count/surveys")
    public String countSurveys() {
        return userService.countSurveys().toString();
    }

	@GetMapping("/survey/{id}")
	public String getSurvey(@PathVariable("id") String id) {
		return userService.getSurvey(id);
	}

	//create post route to update user info
	@PostMapping("/update/info/{id}")
	public boolean updateUserInfo(@PathVariable("id") String id, @RequestBody String userInfo) {
		return userService.updateUserInfo(id, userInfo);
	}

	//create post route to create a new survey
	@PostMapping("/create/survey")
	public boolean createSurvey(@RequestBody String surveyInfo) {
		return userService.createSurvey(surveyInfo);
	}

	@PostMapping("/edit/survey")
	public boolean editSurvey(@RequestBody String surveyInfo) {
		return userService.editSurvey(surveyInfo);
	}

	//create post route to participate in a survey
	@PostMapping("/participate/survey/{id}")
	public boolean participateSurvey(@PathVariable("id") String id, @RequestBody String userId) {
		return userService.participateSurvey(id, userId);
	}

	//create post route to withdraw from a survey
	@PostMapping("/withdraw/survey/{id}")
	public boolean withdrawSurvey(@PathVariable("id") String id, @RequestBody String userId) {
		return userService.withdrawSurvey(id, userId);
	}

	//post route for survey completion
	@PostMapping("/complete/survey/{id}")
	public boolean completeSurvey(@PathVariable("id") String id, @RequestBody String userId) {
		return userService.completeSurvey(id, userId);
	}

	@PostMapping("/save/answers/{id}")
	public boolean saveAnswers(@PathVariable("id") String id, @RequestBody String answers) {
		return userService.saveAnswers(id, answers);
	}

	@GetMapping("/get/answers/{surveyid}/{userid}")
	public String getAnswers(@PathVariable("surveyid") String surveyid, @PathVariable("userid") String userid) {
		return userService.getAnswers(surveyid, userid);
	}
	
	//post route for Survey Creator Notification 
	@PostMapping("/survey/creator/notification/{id}")
	public boolean sendNotification(@PathVariable("id") String id, @RequestBody String body) {
		return userService.creatorNotification(id, body);
	}

	//post route for Survey Creator Notification 
	@PostMapping("/user/profile/{receiverId}/message")
	public boolean sendMessage(@PathVariable("receiverId") String id, @RequestBody String body) {
		return userService.sendMessage(id, body);
	}
	
	@GetMapping("/get/top30Users")
	public String getTop5Users() {
		return userService.getTop30Users().toString();
	}

	@GetMapping("/user/rank/{id}")
	public String getUserRankInfo(@PathVariable("id") String id) {
		return userService.geUserRankData(id).toString();
	}
	
	@GetMapping("/user/userinfo")
	public String getAllUserInfo(Principal user) {		
		return userService.getCurrentUserInfo(user.getName());	
	}

	@PostMapping("/user/survey/participant/invite/{surveyId}")
	public boolean inviteParticipant(@PathVariable("surveyId") String surveyId, @RequestBody String body) {
		return userService.sendInvite(surveyId, body);
	}
	
	@GetMapping("/survey/get/notification/{surveyId}")
	public String getSurveyNotifications(@PathVariable("surveyId") String id) {
		return userService.getSurveyNotifications(id).toString();
	}
	
}
