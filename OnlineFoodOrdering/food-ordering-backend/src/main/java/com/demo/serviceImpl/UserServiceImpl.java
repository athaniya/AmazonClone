package com.demo.serviceImpl;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.demo.dto.UserDTO;
import com.demo.entity.UserEntity;
import com.demo.repo.UserRepo;
import com.demo.service.AuthenticationFacade;
import com.demo.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	private UserRepo userRepo;
	private PasswordEncoder encoder;
	private AuthenticationFacade authenticationFacade;

	@Override
	public void registerUser(UserDTO userDTO) {
		UserEntity user = convertToEntity(userDTO);
		userRepo.save(user);
	}
	
	private UserEntity convertToEntity(UserDTO userDTO) {
		return UserEntity.builder()
			.name(userDTO.getLastName() +" "+userDTO.getFirstName())
			.email(userDTO.getEmail())
			.password(encoder.encode(userDTO.getPassword()))
			.build();
	}

	@Override
	public String getUserId() {
		String email = authenticationFacade.getAuthentication().getName();
		String userId = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email : " +email))
				.getId();
		return userId;
	}

}
