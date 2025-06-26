package com.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.dto.FoodDTO;
import com.demo.exception.FoodNotFoundException;
import com.demo.exception.ImageNotFoundException;
import com.demo.service.FoodService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/foods")
@CrossOrigin("*")
public class FoodController {
	
	private ObjectMapper objectMapper;
	private FoodService foodService;
	
	@GetMapping("/{foodId}")
	public ResponseEntity<FoodDTO> getFood(@PathVariable String foodId) throws FoodNotFoundException{
		FoodDTO food = foodService.getFood(foodId.trim());
		return ResponseEntity.status(HttpStatus.OK).body(food);
	}
	
	@PostMapping
	public ResponseEntity<Void> createFood(@RequestPart MultipartFile imgFile,@RequestPart String food) throws IOException{
		FoodDTO foodDTO = objectMapper.readValue(food,FoodDTO.class);
		foodService.addFood(imgFile, foodDTO);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@GetMapping
	public ResponseEntity<List<FoodDTO>> getAllFood(){
		List<FoodDTO> foods = foodService.getAllFood();
		return ResponseEntity.status(HttpStatus.OK).body(foods);
	}
	
	@DeleteMapping("/{foodId}")
	public ResponseEntity<Void> deleteFood(@PathVariable String foodId) throws ImageNotFoundException{
		foodService.deleteFood(foodId.trim());
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
