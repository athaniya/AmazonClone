package com.demo.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderDTO {

	private String id;
	private String userId;
	private String userAddress;
	private int phoneNumber;
	private String email;
	private List<OrderItem> orderItems;
	private double amount;
	private String paymentStatus;
	private String razorpayOrderId;
	private String razorpaySignature;
	private String razorpayPaymentId;
	private String orderStatus;
}
