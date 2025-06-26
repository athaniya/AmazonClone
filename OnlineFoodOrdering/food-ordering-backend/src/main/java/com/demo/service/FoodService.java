package com.demo.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.demo.dto.FoodDTO;
import com.demo.exception.FoodNotFoundException;
import com.demo.exception.ImageNotFoundException;

public interface FoodService {
	
	void addFood(MultipartFile file, FoodDTO foodDTO) throws IOException;
	FoodDTO getFood(String id) throws FoodNotFoundException;
	List<FoodDTO> getAllFood();
	void deleteFood(String id) throws ImageNotFoundException;

}
