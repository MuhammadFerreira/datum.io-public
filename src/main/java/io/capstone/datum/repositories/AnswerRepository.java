package io.capstone.datum.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import io.capstone.datum.survey.Answers;
import io.capstone.datum.survey.SurveyParticipation;
import io.capstone.datum.survey.question.Question;

@Repository
@Transactional(readOnly = true)
public interface AnswerRepository extends JpaRepository<Answers, Long> {

    List<Answers> findAllBySurveyParticipation(SurveyParticipation surveyParticipation);

    List<Answers> findAllBySurveyParticipationAndQuestion(SurveyParticipation surveyParticipation, Question question);

    void deleteBySurveyParticipationAndQuestion(SurveyParticipation surveyParticipation, Question question);

    double countBySurveyParticipation(SurveyParticipation surveyParticipation);
    
}
