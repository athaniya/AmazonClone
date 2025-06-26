package com.demo.service;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.demo.exception.ImageNotFoundException;

public interface ResourceService {
	
	 String saveImg(MultipartFile file) throws IOException;
	 Resource serveImg(String fileName) throws ImageNotFoundException;
	 boolean deleteImg(String imageURL) throws ImageNotFoundException;

}
