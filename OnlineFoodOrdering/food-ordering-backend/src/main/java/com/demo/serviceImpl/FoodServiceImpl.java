package com.demo.serviceImpl;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.demo.dto.FoodDTO;
import com.demo.entity.Food;
import com.demo.exception.FoodNotFoundException;
import com.demo.exception.ImageNotFoundException;
import com.demo.repo.FoodRepo;
import com.demo.service.FoodService;
import com.demo.service.ResourceService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FoodServiceImpl implements FoodService{
	
	private FoodRepo foodRepo;
	private ResourceService resourceService;
	private final String message = "Food not found with id :" ;

	@Override
	public void addFood(MultipartFile file, FoodDTO foodDTO) {
		try {
			String imgUrl = resourceService.saveImg(file);
			foodDTO.setImgUrl(imgUrl);
		}
		catch (IOException e) {
			throw new RuntimeException("Invalid Image");
		}
		
		Food food = foodDTOToFood(foodDTO);
		foodRepo.save(food);
	}
	
	@Override
	public FoodDTO getFood(String id) throws FoodNotFoundException {
		Food foodResult = foodRepo.findById(id).orElseThrow(() -> new FoodNotFoundException(message +id));
		FoodDTO food = foodToFoddDTO(foodResult);
		return food;
	}

	@Override
	public List<FoodDTO> getAllFood() {
		List<Food> allFood = foodRepo.findAll();
		List<FoodDTO> foods = allFood.stream()
									 .map(f -> foodToFoddDTO(f))
									 .toList();
		
		return foods;
	}
	
	@Override
	public void deleteFood(String id) throws ImageNotFoundException{
		    FoodDTO food = getFood(id);
			boolean isDeleted = resourceService.deleteImg(food.getImgUrl());
			if(isDeleted) {
				foodRepo.deleteById(id);
			}
	}
	
	
	private Food foodDTOToFood(FoodDTO foodDTO) {
		
		return Food.builder()
			.id(foodDTO.getId())
			.name(foodDTO.getName())
			.description(foodDTO.getDescription())
			.imgUrl(foodDTO.getImgUrl())
			.price(foodDTO.getPrice())
			.category(foodDTO.getCategory())
			.build();
	}
	
	private FoodDTO foodToFoddDTO(Food food) {
		
		return FoodDTO.builder()
					  .id(food.getId())
					  .name(food.getName())
					  .description(food.getDescription())
					  .price(food.getPrice())
					  .category(food.getCategory())
					  .imgUrl(food.getImgUrl())
					  .build();
	}

	

	

	
}
