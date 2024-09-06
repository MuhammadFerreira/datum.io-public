package io.capstone.datum.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.survey.Survey;
import io.capstone.datum.survey.SurveyParticipation;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true) 
public interface SurveyParticipationRepository 
    extends JpaRepository<SurveyParticipation, Long>  {

    Optional<SurveyParticipation> findByAppUser(AppUser appUser);  
    int countByAppUser(AppUser appUser);
    int countBySurvey(Survey survey);
    int countByAppUserAndCompletedIsTrue(AppUser appUser);
    

    @Query("SELECT a.email " +
    "FROM AppUser a " +
    "WHERE a.id IN " +
    "(SELECT sp.appUser.id " +
    "FROM SurveyParticipation sp " +
    "WHERE sp.survey.id =?1)")
        List<String> findAllParticipantEmail(Long id);

    @Query("SELECT a.email " +
    "FROM AppUser a " +
    "WHERE a.id IN " +
    "(SELECT sp.appUser.id " +
    "FROM SurveyParticipation sp " +
    "WHERE sp.survey.id IN " + 
    "(SELECT s.id " + 
    "FROM Survey s " + 
    "WHERE DATEDIFF(s.surveyEndDate ,CURRENT_DATE) = 7))")
    //find emails of all participants in a survey that has 7 days left on it
    List<String> findAllParticipantEmailSevenDays();
    
    @Query("SELECT sp.dateCompleted "+
    "FROM SurveyParticipation sp "+
    "WHERE sp.appUser = ?1 "+
    "ORDER BY sp.dateCompleted DESC")
    Date findDateCompleted1(Long id);

    

    @Query("SELECT a.email " +
    "FROM AppUser a " +
    "WHERE a.id IN " +
    "(SELECT sp.appUser.id " +
    "FROM SurveyParticipation sp " +
    "WHERE sp.survey.id IN " + 
    "(SELECT s.id " + 
    "FROM Survey s " + 
    "WHERE DATEDIFF(s.surveyEndDate ,CURRENT_DATE) = 3))")
    //find emails of all participants in a survey that has 7 days left on it
    List<String> findAllParticipantEmailThreeDays();

    @Query("SELECT a.email " +
    "FROM AppUser a " +
    "WHERE a.id IN " +
    "(SELECT sp.appUser.id " +
    "FROM SurveyParticipation sp " +
    "WHERE sp.survey.id IN " + 
    "(SELECT s.id " + 
    "FROM Survey s " + 
    "WHERE DATEDIFF(s.surveyEndDate ,CURRENT_DATE) = 1))")
    //find emails of all participants in a survey that has 7 days left on it
    List<String> findAllParticipantEmailOneDay();

    //Remove survey participation by app user and survey
    void deleteByAppUserAndSurvey(AppUser appUser, Survey survey);
    SurveyParticipation findByAppUserAndSurvey(AppUser user, Survey survey);
    List <SurveyParticipation> findByAppUserAndCompleted(AppUser user, boolean completed);
}
