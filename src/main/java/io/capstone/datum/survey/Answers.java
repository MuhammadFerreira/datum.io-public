package io.capstone.datum.survey;

import javax.persistence.*;

import io.capstone.datum.survey.question.Question;

@Entity
public class Answers {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "survey_participation_id")
    private SurveyParticipation surveyParticipation;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    
    private String answer;

    public Answers() {
    }

    public Answers(SurveyParticipation surveyParticipation, Question question, String answer) {
        this.surveyParticipation = surveyParticipation;
        this.question = question;
        this.answer = answer;
    }

    public SurveyParticipation getSurveyParticipation() {
        return surveyParticipation;
    }

    public void setSurvey(SurveyParticipation surveyParticipation) {
        this.surveyParticipation = surveyParticipation;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
