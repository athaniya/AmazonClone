package com.demo.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demo.entity.Cart;


public interface CartRepo extends MongoRepository<Cart, String>{
	
	Optional<Cart> findByUserId(String userId);
	void deleteByUserId(String userId);

}
