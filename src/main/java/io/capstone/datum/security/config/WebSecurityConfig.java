package io.capstone.datum.security.config;

import lombok.AllArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

import io.capstone.datum.security.filter.CustomAuthenticationFilter;
import io.capstone.datum.security.filter.CustomAuthorizationFilter;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final String ADMIN = "ADMIN";

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        
        http.cors();
        http.csrf().disable().headers().frameOptions().disable();

        //Custom route for login
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");
        
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        
        //Login authorities
        http.authorizeRequests().antMatchers(GET, "/api/login/**", "/api/auth/**").permitAll();
        http.authorizeRequests().antMatchers(POST, "/api/login/**").permitAll();
        
        //Register authorities
        http.authorizeRequests().antMatchers(GET, "/api/registration/**").permitAll();
        http.authorizeRequests().antMatchers(POST, "/api/registration/**").permitAll();
        
        //User route authorities
        http.authorizeRequests().antMatchers(GET, "/api/user/**").hasAnyAuthority("USER", ADMIN);
        http.authorizeRequests().antMatchers(POST, "/api/user/**").hasAnyAuthority("USER", ADMIN);
        
        //Admin route authorities
        http.authorizeRequests().antMatchers(GET, "/api/admin/**").hasAnyAuthority(ADMIN);
        http.authorizeRequests().antMatchers(POST, "/api/admin/**").hasAnyAuthority(ADMIN);
        
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class); 
        http.httpBasic();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider(userDetailsService));
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(UserDetailsService userDetailsService2) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
