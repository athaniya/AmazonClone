package com.demo.service;

import org.springframework.web.multipart.MultipartFile;

public interface ArtGenerationService {
	
	byte[] generateImageFromText(String prompt);
    byte[] generateImageFromImage(MultipartFile imageFile, String prompt);

}
