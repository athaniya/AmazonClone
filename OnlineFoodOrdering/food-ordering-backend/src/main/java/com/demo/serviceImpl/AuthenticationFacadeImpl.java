package com.demo.serviceImpl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.demo.service.AuthenticationFacade;

@Component
public class AuthenticationFacadeImpl implements AuthenticationFacade{

	@Override
	public Authentication getAuthentication() {
		
		return SecurityContextHolder.getContext().getAuthentication();
	}

}
