package com.demo.utils;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	@Value("${jwt.secret.key}")
	private String SECRET_KEY;
	
	public String generateToken(UserDetails userDetails) {
		Map<String,Object> claims = new HashMap<>();
		return createToken(claims,userDetails.getUsername());
	}

	private String createToken(Map<String, Object> claims, String subject) {
		
		String token = Jwts.builder()
			.claims(claims)
			.subject(subject)
			.issuedAt(new Date(System.currentTimeMillis()))
			.expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) //10 hours expiration
            .signWith(getSigningKey(),Jwts.SIG.HS256)
            .compact();
		return token;
	}
	
	private SecretKey getSigningKey() {
        byte[] keyBytes =Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
	
	private Claims parseJwtToken(String token) {
		Claims claims = Jwts.parser()
			.verifyWith(getSigningKey())
			.build()
			.parseSignedClaims(token)
			.getPayload();
		
		return claims;
	}
	
	public String extractEmail(String token) {
		return parseJwtToken(token).getSubject();
	}
	
	public Date extractExpiration(String token) {
		return parseJwtToken(token).getExpiration();
	}
	
	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	public boolean validateToken(String token,UserDetails userDetails) {
		final String username = extractEmail(token);
		return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
	}

}
