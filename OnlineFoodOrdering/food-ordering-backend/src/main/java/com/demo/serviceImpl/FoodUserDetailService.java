package com.demo.serviceImpl;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.demo.entity.UserEntity;
import com.demo.repo.UserRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FoodUserDetailService implements UserDetailsService{
	
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity userEntity = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));
		
		UserDetails userDetails = User.withUsername(userEntity.getEmail())
			.password(userEntity.getPassword())
			.authorities(Collections.emptyList())
			.build();
		
		return userDetails;
	}

}
