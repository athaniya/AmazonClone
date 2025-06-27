package com.demo.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.service.ArtGenerationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/generate")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ArtGenerationController {

	private final ArtGenerationService artService;

	@PostMapping(produces = MediaType.IMAGE_PNG_VALUE)
	public ResponseEntity<byte[]> generate(@RequestParam String prompt) {
		byte[] imageBytes = artService.generateImageFromText(prompt);

		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
	}
	
	@PostMapping(value = "/image", produces = MediaType.IMAGE_PNG_VALUE)
	public ResponseEntity<byte[]> generateFromImage(@RequestPart MultipartFile image,
	                                                @RequestParam String prompt) {
	    byte[] generated = artService.generateImageFromImage(image, prompt);
	    return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(generated);
	}

}
