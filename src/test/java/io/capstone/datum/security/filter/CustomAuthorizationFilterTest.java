package io.capstone.datum.security.filter;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.times;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import io.capstone.datum.services.JWTHandlerService;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@ExtendWith(MockitoExtension.class)
class CustomAuthorizationFilterTest {

    @InjectMocks
    private CustomAuthorizationFilter customAuthorizationFilter;
    
    @Mock
    private HttpServletRequest request;
    
    @Mock
    private HttpServletResponse response;
    
    @Mock
    private FilterChain filterChain;

    @Mock
    private JWTHandlerService jwtHandlerService;
    

    @Test
    void testDoFilterInternalLoginRoute() throws IOException, ServletException {

        Mockito.when(request.getServletPath()).thenReturn("/api/login");
        Mockito.doNothing().when(filterChain).doFilter(request, response);
        customAuthorizationFilter.doFilter(request, response, filterChain);
        Mockito.verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    void testDoFilterInternalTokenRefreshRoute() throws IOException, ServletException {

        Mockito.when(request.getServletPath()).thenReturn("/api/auth/token/refresh");
        Mockito.doNothing().when(filterChain).doFilter(request, response);
        customAuthorizationFilter.doFilter(request, response, filterChain);
        Mockito.verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    void testDoFilterInternalEmptyHeader() throws IOException, ServletException {

        Mockito.when(request.getServletPath()).thenReturn("SomethingElse");
        Mockito.when(request.getHeader(AUTHORIZATION)).thenReturn(null);
        Mockito.doNothing().when(filterChain).doFilter(request, response);
        customAuthorizationFilter.doFilter(request, response, filterChain);
        Mockito.verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    void testDoFilterInternalNoBearer() throws IOException, ServletException {

        Mockito.when(request.getServletPath()).thenReturn("SomethingElse");
        Mockito.when(request.getHeader(AUTHORIZATION)).thenReturn("IAmWrong");
        Mockito.doNothing().when(filterChain).doFilter(request, response);
        customAuthorizationFilter.doFilter(request, response, filterChain);
        Mockito.verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    void testDoFilterInternalInvalidToken() throws IOException, ServletException {

        Mockito.when(request.getServletPath()).thenReturn("SomethingElse");
        Mockito.when(request.getHeader(AUTHORIZATION)).thenReturn("Bearer 1234");
        Mockito.doNothing().when(filterChain).doFilter(request, response);
        try{
            customAuthorizationFilter.doFilter(request, response, filterChain);
        } catch(Exception e) {
            fail();
        }
        
    }
}
