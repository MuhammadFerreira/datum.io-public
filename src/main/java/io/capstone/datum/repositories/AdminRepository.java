package io.capstone.datum.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import io.capstone.datum.appusers.Admin;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AdminRepository 
    extends JpaRepository <Admin, Long> {

        Optional<Admin> findByEmail(String email);
}
