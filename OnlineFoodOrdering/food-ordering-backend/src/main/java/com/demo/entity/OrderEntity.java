package com.demo.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.demo.dto.OrderItem;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "orders")
public class OrderEntity {
	
	@Id
	private String id;
	private String userId;
	private String userAddress;
	private int phoneNumber;
	private String email;
	private List<OrderItem> orderItems;
	private double amount;
	private String paymentStatus;
	private String razorpayOrderId;
	private String razorpayPaymentId;
	private String razorpaySignature;
	private String orderStatus;
	
	

}
