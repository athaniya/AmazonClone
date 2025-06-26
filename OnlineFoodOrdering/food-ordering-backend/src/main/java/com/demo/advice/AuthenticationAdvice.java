package com.demo.advice;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.demo.dto.ErrorDTO;

@RestControllerAdvice
public class AuthenticationAdvice {
	
	@ExceptionHandler
	public ResponseEntity<ErrorDTO> handleBadCredentialException(BadCredentialsException ex){
		
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		ErrorDTO error = ErrorDTO.builder()
				.message(ex.getMessage())
				.status(status.value())
				.error(status)
				.timeStamp(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS))
				.build();
		
		return ResponseEntity.status(status).body(error);
		
	}

}
