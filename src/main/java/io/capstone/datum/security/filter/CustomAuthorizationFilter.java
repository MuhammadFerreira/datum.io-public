package io.capstone.datum.security.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import org.springframework.web.filter.OncePerRequestFilter;

import io.capstone.datum.services.JWTHandlerService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    private JWTHandlerService jwtHandlerService = new JWTHandlerService();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
         
        if(request.getServletPath().equals("/api/login") || request.getServletPath().equals("/api/auth/token/refresh")) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {
                    String token = authorizationHeader.substring("Bearer ".length());
                    jwtHandlerService.verifyAccessToken(token);
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    log.error("ERROR Logging in " + e.getMessage());
                    response.setHeader("error", e.getMessage());
                    response.sendError(FORBIDDEN.value());
                }
            } else {
                filterChain.doFilter(request, response);
            }
        }

        
    }
    
    
}
