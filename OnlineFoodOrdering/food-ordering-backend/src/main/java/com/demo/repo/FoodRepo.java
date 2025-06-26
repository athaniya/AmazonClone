package com.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demo.entity.Food;

public interface FoodRepo extends MongoRepository<Food, String>{

}
