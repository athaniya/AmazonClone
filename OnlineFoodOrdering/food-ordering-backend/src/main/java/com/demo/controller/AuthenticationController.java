package com.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dto.AuthDTO;
import com.demo.dto.UserDTO;
import com.demo.utils.JwtUtil;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthenticationController {
	
	private AuthenticationManager authenticationManager;
	private UserDetailsService service;
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<AuthDTO> login(@RequestBody UserDTO userDTO){
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
		final UserDetails userDetails = service.loadUserByUsername(userDTO.getEmail());
		String jwtToken = jwtUtil.generateToken(userDetails);
		AuthDTO authDTO = new AuthDTO(userDetails.getUsername(), jwtToken);
		return ResponseEntity.status(HttpStatus.OK).body(authDTO);
	}
	
}
