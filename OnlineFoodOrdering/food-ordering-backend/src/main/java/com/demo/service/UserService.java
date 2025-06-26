package com.demo.service;

import com.demo.dto.UserDTO;

public interface UserService {
	
	void registerUser(UserDTO userDTO);
	String getUserId();

}
