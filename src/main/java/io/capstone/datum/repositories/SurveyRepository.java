package io.capstone.datum.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import io.capstone.datum.survey.Survey;

@Repository
@Transactional(readOnly = true)
public interface SurveyRepository extends JpaRepository<Survey, Long> {

        Long countByIsSurveyActive(Boolean isSurveyActive);
        
        List<Survey> findAllByIsSurveyActive(Boolean isSurveyActive);
        
        @Query("SELECT s FROM Survey s WHERE s.isSurveyActive = true AND s.id NOT IN (SELECT sp.survey.id FROM SurveyParticipation sp WHERE sp.appUser.id = ?1) ORDER BY s.priority ASC")
        List<Survey> findSurveysAppUserIsNotParticipatingIn(Long appUserId);

        //examples of how to define these
        List<Survey> findBySurveyDescription(String description);

        Long countAllByIsFlagged(Boolean isFlagged);

        List<Survey> findBySurveyCreatorId(Long appUserId);

        @Query("SELECT s.points "+ 
        "FROM Survey s "+ 
        "WHERE s.id = ?1")
        int findSurveyPoints(Long id); 
        
        Optional<Survey> findById(Long surveyId);

        @Query("SELECT s "+
        "FROM Survey s "+
        "WHERE s IN "+
        "(SELECT sp.survey "+
        "FROM SurveyParticipation sp "+
        "WHERE sp.appUser.id = ?1 AND sp.completed = false) "+
        "ORDER BY s.surveyEndDate DESC"
        )
        List<Survey> notificationSurveys(Long appUserId);
}
