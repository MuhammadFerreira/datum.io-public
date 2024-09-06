package io.capstone.datum.survey;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.survey.question.Question;
import java.sql.Date;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@PrimaryKeyJoinColumn(referencedColumnName = "id")
public class Survey {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser surveyCreator;

    private String surveyTitle;
    private String surveyDescription;
    private String surveyType;
    private boolean isSurveyActive;
    private boolean isSurveyComplete;
    private boolean isFlagged;
    private boolean isEnabled;
    private String surveyImage;
    private String surveyLink;
    private boolean isSurveyImported;
    private Date surveyStartDate;
    private Date surveyEndDate;
    private int points;
    private int totalQuestions;
    private int totalParticipants;
    private SurveyTags surveyTag1;
    private SurveyTags surveyTag2;
    private SurveyTags surveyTag3;
    private int priority;

    @OneToMany(cascade={CascadeType.REMOVE}, mappedBy = "survey")
    private Set<Question> questions;

    @OneToMany(cascade={CascadeType.REMOVE}, mappedBy = "survey")
    private Set<SurveyParticipation> surveyParticipation;


    public String getSurveyImage() {
        return this.surveyImage;
    }

    public void setSurveyImage(String surveyImage) {
        this.surveyImage = surveyImage;
    }

    public String getSurveyLink() {
        return this.surveyLink;
    }

    public void setSurveyLink(String surveyLink) {
        this.surveyLink = surveyLink;
    }

    public boolean isIsSurveyImported() {
        return this.isSurveyImported;
    }

    public boolean getIsSurveyImported() {
        return this.isSurveyImported;
    }

    public void setIsSurveyImported(boolean isSurveyImported) {
        this.isSurveyImported = isSurveyImported;
    }

    public boolean isIsEnabled() {
        return this.isEnabled;
    }

    public boolean getIsEnabled() {
        return this.isEnabled;
    }

    public void setIsEnabled(boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    public boolean isIsFlagged() {
        return this.isFlagged;
    }

    public boolean getIsFlagged() {
        return this.isFlagged;
    }

    public void setIsFlagged(boolean isFlagged) {
        this.isFlagged = isFlagged;
    }

    public AppUser getCreator() {
        return this.surveyCreator;
    }

    public Date getSurveyStartDate() {
        return this.surveyStartDate;
    }

    public Date getSurveyEndDate() {
        return this.surveyEndDate;
    }

    public void setSurveyStartDate(Date surveyStart) {
        this.surveyStartDate = surveyStart;
    }

    public void setSurveyEndDate(Date surveyEnd) {
        this.surveyEndDate = surveyEnd;
    }

    public void setCreator(AppUser appUser) {
        this.surveyCreator = appUser;
    }

    public String getSurveyTitle() {
        return this.surveyTitle;
    }

    public void setSurveyTitle(String surveyTitle) {
        this.surveyTitle = surveyTitle;
    }

    public String getSurveyDescription() {
        return this.surveyDescription;
    }

    public void setSurveyDescription(String surveyDescription) {
        this.surveyDescription = surveyDescription;
    }

    public String getSurveyType() {
        return this.surveyType;
    }

    public void setSurveyType(String surveyType) {
        this.surveyType = surveyType;
    }

    public boolean isIsSurveyActive() {
        return this.isSurveyActive;
    }

    public boolean getIsSurveyActive() {
        return this.isSurveyActive;
    }

    public void setIsSurveyActive(boolean isSurveyActive) {
        this.isSurveyActive = isSurveyActive;
    }

    public boolean isIsSurveyComplete() {
        return this.isSurveyComplete;
    }

    public boolean getIsSurveyComplete() {
        return this.isSurveyComplete;
    }

    public void setIsSurveyComplete(boolean isSurveyComplete) {
        this.isSurveyComplete = isSurveyComplete;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppUser getSurveyCreator() {
        return this.surveyCreator;
    }

    public void setSurveyCreator(AppUser surveyCreator) {
        this.surveyCreator = surveyCreator;
    }

    public Set<SurveyParticipation> getSurveyParticipation() {
        return this.surveyParticipation;
    }

    public void setSurveyParticipation(Set<SurveyParticipation> surveyParticipation) {
        this.surveyParticipation = surveyParticipation;
    }

    public void addQuestion(Question question) {
        this.questions.add(question);
    }
    
    public void removeQuestion(Question question) {
        this.questions.remove(question);
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<Question> getQuestions() {
        return this.questions;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getTotalQuestions() {
        return this.totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getTotalParticipants() {
        return this.totalParticipants;
    }

    public void setTotalParticipants(int totalParticipants) {
        this.totalParticipants = totalParticipants;
    }

    public SurveyTags getSurveyTag1() {
        return this.surveyTag1;
    }

    public void setSurveyTag1(SurveyTags surveyTag1) {
        this.surveyTag1 = surveyTag1;
    }

    public SurveyTags getSurveyTag2() {
        return this.surveyTag2;
    }

    public void setSurveyTag2(SurveyTags surveyTag2) {
        this.surveyTag2 = surveyTag2;
    }

    public SurveyTags getSurveyTag3() {
        return this.surveyTag3;
    }

    public void setSurveyTag3(SurveyTags surveyTag3) {
        this.surveyTag3 = surveyTag3;
    }

    public int getPriority() {
        return this.priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }
    
}