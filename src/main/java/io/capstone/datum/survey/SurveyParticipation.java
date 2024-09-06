package io.capstone.datum.survey;

import javax.persistence.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import io.capstone.datum.appusers.AppUser;

@Entity
public class SurveyParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "survey_id")
    private Survey survey;

    private Date participationDate;
    private boolean completed;

    @OneToMany(cascade={CascadeType.REMOVE}, mappedBy = "surveyParticipation")
    private List<Answers> answers;

    private int percentComplete = 0;

    private LocalDateTime dateCompleted;

    public SurveyParticipation() {

    }

    public SurveyParticipation(Survey survey, AppUser appUser) {
        this.survey = survey;
        this.appUser = appUser;
        this.participationDate = new Date(System.currentTimeMillis());
        this.completed = false;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppUser getAppUser() {
        return this.appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public Survey getSurvey() {
        return this.survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Date getParticipationDate() {
        return this.participationDate;
    }

    public void setParticipationDate(Date participationDate) {
        this.participationDate = participationDate;
    }

    public boolean isCompleted() {
        return this.completed;
    }

    public boolean getCompleted() {
        return this.completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public List<Answers> getAnswers() {
        return this.answers;
    }

    public void setAnswers(List<Answers> answers) {
        this.answers = answers;
    }

    public int getPercentComplete() {
        return this.percentComplete;
    }

    public void setPercentComplete(int percentComplete) {
        this.percentComplete = percentComplete;
    }

    public LocalDateTime getDateCompleted() {
        return this.dateCompleted;
    }

    public void setDateCompleted(LocalDateTime dateCompleted) {
        this.dateCompleted = dateCompleted;
    }
    
}
