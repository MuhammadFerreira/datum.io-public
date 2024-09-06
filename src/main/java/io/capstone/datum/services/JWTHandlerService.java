package io.capstone.datum.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import static java.util.Arrays.stream;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import io.capstone.datum.appusers.AppUser;
import io.capstone.datum.services.userservice.UserService;

@Service
public class JWTHandlerService {

    String keString = "5ebe2294ecd0e0f08eab7690d2a6ee69";

    private final Algorithm algorithm = Algorithm.HMAC256(keString.getBytes());
    private static final String ROLES = "roles";

    @Autowired
	private UserService userService;

    public Map<String, String> createTokens(User user, HttpServletRequest request) {

        // Create Access Token
        String accessToken = createAccessToken(user, request);

        // Create Refresh Token
        String refreshToken = createRefreshToken(user, request);

        // Add token in a map so it can be added to a response
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        return tokens;

    }

    public void verifyAccessToken(String token) {
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String username = decodedJWT.getSubject();
        String [] roles = decodedJWT.getClaim(ROLES).asArray(String.class);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

    }
    

    public Map<String, String> verifyRefreshToken(HttpServletRequest request, String refreshToken) {
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(refreshToken);
        
        String username = decodedJWT.getSubject();

		AppUser user = userService.getUserByEmail(username);

        String accessToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim(ROLES,
                        user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .sign(algorithm);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);

        return tokens;

    }

    public String createAccessToken(User user, HttpServletRequest request) {

        return JWT.create()
        .withSubject(user.getUsername())
        .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
        .withIssuer(request.getRequestURL().toString())
        .withClaim(ROLES,
                user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
        .sign(algorithm);

    }

    public String createRefreshToken(User user, HttpServletRequest request) {

        return JWT.create().withSubject(user.getUsername())
        .withExpiresAt(new Date(System.currentTimeMillis() + 120 * 60 * 1000))
        .withIssuer(request.getRequestURL().toString())
        .sign(algorithm);

    }

    public void setUserService(UserService userService)
    {
        this.userService = userService;
    }

}
