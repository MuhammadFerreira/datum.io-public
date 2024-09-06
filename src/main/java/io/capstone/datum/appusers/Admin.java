package io.capstone.datum.appusers;

import javax.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Admin extends AppUser {

    public Admin(String firstName,
                 String lastName,
                 String email,
                 String password,
                 String dateOfBirth,
                 String gender,
                 AppUserRole appUserRole) {
        super(firstName, lastName, email, password, dateOfBirth, gender, appUserRole);
    }

}
