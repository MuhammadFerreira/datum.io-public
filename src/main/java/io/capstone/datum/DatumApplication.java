package io.capstone.datum;

import org.springframework.boot.SpringApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.AllArgsConstructor;


@SpringBootApplication
@EnableScheduling
@AllArgsConstructor
@ComponentScan
public class DatumApplication {	
	public static void main(String[] args) {
		SpringApplication.run(DatumApplication.class, args);
	}

	@Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
