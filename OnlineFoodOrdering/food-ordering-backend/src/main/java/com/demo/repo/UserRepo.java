package com.demo.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demo.entity.UserEntity;


public interface UserRepo extends MongoRepository<UserEntity,String>{
	
	Optional<UserEntity> findByEmail(String email);

}
