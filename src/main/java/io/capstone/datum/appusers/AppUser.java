package io.capstone.datum.appusers;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import io.capstone.datum.security.token.ConfirmationToken;
import io.capstone.datum.survey.Survey;
import io.capstone.datum.survey.SurveyParticipation;
import io.capstone.datum.survey.SurveyTags;

import javax.persistence.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@PrimaryKeyJoinColumn(referencedColumnName = "id")
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String firstName;
    private String lastName;
    private String aboutMe;
    private String profilePic;
    private String country;
    private boolean isFlagged;
    private Date dateOfBirth;
    private String password;
    private Boolean locked = false;
    private Boolean enabled = false;
    private int points;
    private int streakLength; 
    private LocalDateTime streakDate;
    private String address;
    private String city;
    private String postalCode;
    private int surveysCompleted;


    private SurveyTags interestTag1;
    private SurveyTags interestTag2;
    private SurveyTags interestTag3;
    private SurveyTags interestTag4;
    private SurveyTags interestTag5;

    @Column(unique = true)
    private String email;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Occupation occupation;

    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;

    @OneToMany(cascade={CascadeType.REMOVE}, orphanRemoval = true)
    @JoinColumn(name = "survey_creator_id")
    private List<Survey> createdSurveys = new ArrayList<>();

    @OneToMany(cascade={CascadeType.REMOVE}, mappedBy = "appUser")
    private Set<SurveyParticipation> surveyParticipation;

    @OneToMany(cascade={CascadeType.REMOVE}, mappedBy = "appUser")
    private Set<ConfirmationToken> confirmationToken;

    public AppUser(String firstName, String lastName, String email, String password, String dateOfBirth, String gender, AppUserRole appUserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = Date.valueOf(dateOfBirth);
        this.gender = Gender.valueOf(gender);
        this.appUserRole = appUserRole;
        this.points = 0; 
        this.surveysCompleted =0;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAboutMe() {
        return this.aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public Gender getGender() {
        return this.gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Occupation getOccupation() {
        return this.occupation;
    }

    public void setOccupation(Occupation occupation) {
        this.occupation = occupation;
    }

    public Date getDateOfBirth() {
        return this.dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public AppUserRole getAppUserRole() {
        return this.appUserRole;
    }

    public void setAppUserRole(AppUserRole appUserRole) {
        this.appUserRole = appUserRole;
    }

    public Boolean isLocked() {
        return this.locked;
    }

    public Boolean getLocked() {
        return this.locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public Boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public List<Survey> getCreatedSurveys() {
        return this.createdSurveys;
    }

    public void setCreatedSurveys(List<Survey> createdSurveys) {
        this.createdSurveys = createdSurveys;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public List<Survey> getSurveysCreated() {
        return this.createdSurveys;
    }

    public void createSurvey(Survey survey) {
        this.createdSurveys.add(survey);
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

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProfilePic() {
        return this.profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Set<SurveyParticipation> getSurveyParticipation() {
        return this.surveyParticipation;
    }

    public int getStreakLength() {
        return this.streakLength;
    }

    public void setStreakLength(int streakLength) {
        this.streakLength = streakLength;
    }

    public LocalDateTime getStreakDate() {
        return this.streakDate;
    }

    public void setStreakDate(LocalDateTime streakDate) {
        this.streakDate = streakDate;
    }

    public void setInterestTag1(SurveyTags interestTag1) {
        this.interestTag1 = interestTag1;
    }

    public void setInterestTag2(SurveyTags interestTag2) {
        this.interestTag2 = interestTag2;
    }

    public void setInterestTag3(SurveyTags interestTag3) {
        this.interestTag3 = interestTag3;
    }

    public void setInterestTag4(SurveyTags interestTag4) {
        this.interestTag4 = interestTag4;
    }

    public void setInterestTag5(SurveyTags interestTag5) {
        this.interestTag5 = interestTag5;
    }

    public SurveyTags getInterestTag1() {
        return this.interestTag1;
    }

    public SurveyTags getInterestTag2() {
        return this.interestTag2;
    }

    public SurveyTags getInterestTag3() {
        return this.interestTag3;
    }

    public SurveyTags getInterestTag4() {
        return this.interestTag4;
    }

    public SurveyTags getInterestTag5() {
        return this.interestTag5;
    }
    

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getSurveysCompleted() {
        return this.surveysCompleted;
    }

    public void setSurveysCompleted(int surveysCompleted) {
        this.surveysCompleted = surveysCompleted;
    }
}
