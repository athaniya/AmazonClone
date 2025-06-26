package com.demo.advice;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.demo.dto.ErrorDTO;
import com.demo.exception.FoodNotFoundException;
import com.demo.exception.ImageNotFoundException;

@RestControllerAdvice
public class FoodAdvice {
	
	@ExceptionHandler
	public ResponseEntity<ErrorDTO> handleFoodNotFoundException(FoodNotFoundException e){
		
		HttpStatus status =  HttpStatus.NOT_FOUND;
		
		ErrorDTO errorDTO = ErrorDTO.builder()
				.message(e.getMessage())
				.error(status)
				.status(status.value())
				.timeStamp(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS))
				.build();
		
		return ResponseEntity.status(status).body(errorDTO);
		
	}
	
	@ExceptionHandler
	public ResponseEntity<ErrorDTO> handleImageNotFoundException(ImageNotFoundException e){
		
		HttpStatus status =  HttpStatus.NOT_FOUND;
		
		ErrorDTO errorDTO = ErrorDTO.builder()
				.message(e.getMessage())
				.error(status)
				.status(status.value())
				.timeStamp(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS))
				.build();
		
		return ResponseEntity.status(status).body(errorDTO);
		
	}

}
