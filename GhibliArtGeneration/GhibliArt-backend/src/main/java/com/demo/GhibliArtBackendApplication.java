package com.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GhibliArtBackendApplication {
	
	@Value("${stability.api.secret.key}")
	public String key;

	public static void main(String[] args) {
		SpringApplication.run(GhibliArtBackendApplication.class, args);
		

	}

}
