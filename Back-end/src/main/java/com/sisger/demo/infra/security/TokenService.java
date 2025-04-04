package com.sisger.demo.infra.security;



import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.sisger.demo.exception.InternalServerErrorException;
import com.sisger.demo.exception.UnauthorizedException;
import com.sisger.demo.user.domain.User;
import com.sisger.demo.user.infra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final UserRepository userRepository;


    private String secret = "dweorwiroewijoweifweifowienoeifnweoiojwoe";

    public String generateToken(User user) {
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("auth-api-jwt")
                    .withSubject(user.getEmail())
                    .withExpiresAt(genarateExpirationTime())
                    .sign(algorithm);

            return token;
        }catch (JWTCreationException exception) {
            System.out.println("JWT generation failed");
            return null;
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api-jwt")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException exception){
            System.out.println("Invalid JWT token");
            return null;
        }

    }

    private Instant genarateExpirationTime() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

    public User getUserByToken(String token) {
        token = token.substring(7).trim();
        String id = JWT.decode(token).getSubject();
        return userRepository.findByEmail(id);
    }
}
