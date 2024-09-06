package io.capstone.datum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import io.capstone.datum.survey.Survey;
import io.capstone.datum.survey.question.Question;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findAllBySurvey(Survey survey);

    double countBySurvey(Survey survey);

    Long removeBySurvey(Survey survey);

}
