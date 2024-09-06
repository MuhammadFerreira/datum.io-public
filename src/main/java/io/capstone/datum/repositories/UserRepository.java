package io.capstone.datum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.survey.SurveyTags;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true) 
public interface UserRepository
        extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    Optional<AppUser> findById(Long id);

    List<AppUser> findAll();

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

    Long countByEnabled(Boolean enabledBoolean);

    Long countAllByIsFlagged(Boolean flaggedBoolean);

    @Query("SELECT a FROM AppUser a WHERE a.interestTag1 = ?1 OR a.interestTag2 = ?1 OR a.interestTag3 = ?1 OR a.interestTag4 = ?1 OR a.interestTag5 = ?1")
    List<AppUser> findAllByInterestTag(SurveyTags tag);

    List<AppUser> findFirst30ByOrderByPointsDescIdAsc();

    List<AppUser> findAllByOrderByPointsDesc();

    @Query("SELECT a.points " +
            "FROM AppUser a " +
            "WHERE a.id = ?1")
    int findUserPoints(Long id);

    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.points = ?2 WHERE a.id = ?1")
    int updateAppUserPoints(Long id, int points);
}
