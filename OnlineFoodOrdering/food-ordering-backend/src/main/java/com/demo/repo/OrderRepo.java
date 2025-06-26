package com.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demo.entity.OrderEntity;
import java.util.List;
import java.util.Optional;


public interface OrderRepo extends MongoRepository<OrderEntity,String>{
	
	List<OrderEntity> findByUserId(String userId);
	Optional<OrderEntity> findByRazorpayOrderId(String razorpayOrderId);

}
