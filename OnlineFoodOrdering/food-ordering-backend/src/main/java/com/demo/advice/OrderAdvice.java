package com.demo.advice;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.demo.dto.ErrorDTO;
import com.razorpay.RazorpayException;

@RestControllerAdvice
public class OrderAdvice {
	
	@ExceptionHandler
	public ResponseEntity<ErrorDTO> handleRazorpayException(RazorpayException ex){
		HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
		
		ErrorDTO errorDTO = ErrorDTO.builder()
									.message(ex.getMessage())
									.status(status.value())
									.error(status)
									.timeStamp(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS))
									.build();
		
		return ResponseEntity.status(status).body(errorDTO);
	}

}
