package com.demo.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.exception.ImageNotFoundException;
import com.demo.service.ResourceService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/uploads/images")
@AllArgsConstructor
@CrossOrigin("*")
public class ResourceController {
	
	private ResourceService resourceService;
	
	@GetMapping("/{fileName}")
	public ResponseEntity<Resource> getImageResource(@PathVariable String fileName) throws ImageNotFoundException{
		Resource imgResource = resourceService.serveImg(fileName);
		String extention = fileName.substring(fileName.lastIndexOf(".")).substring(1);
		return ResponseEntity.status(HttpStatus.OK)
				             .contentType(MediaType.parseMediaType("image/"+extention))
				             .body(imgResource);
	}

}
