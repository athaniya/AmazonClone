package com.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dto.UserDTO;
import com.demo.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user/")
@AllArgsConstructor
public class UserController {
	
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<Void> register(@RequestBody UserDTO userDTO){
		userService.registerUser(userDTO);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
