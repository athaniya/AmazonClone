package com.demo.advice;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.demo.dto.ErrorDTO;
import com.demo.exception.CartNotFoundException;

@RestControllerAdvice
public class CartAdvice {
	
	public ResponseEntity<ErrorDTO> handleCartNotFoundException(CartNotFoundException e){
		
		HttpStatus status = HttpStatus.NOT_FOUND;
		
		ErrorDTO errorDTO = ErrorDTO.builder()
				.message(e.getMessage())
				.status(status.value())
				.error(status)
				.timeStamp(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS))
				.build();
		
		return ResponseEntity.status(status).body(errorDTO);
		
	}
 
}
