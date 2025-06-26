package com.demo.service;

import java.util.List;
import java.util.Map;

import com.demo.dto.OrderDTO;
import com.demo.entity.OrderEntity;
import com.razorpay.RazorpayException;

public interface OrderService {
	
	OrderEntity createOrderWithPayment(OrderDTO orderDTO) throws RazorpayException;
	void verifyPayment (Map<String, String> paymentData,String status);
	List<OrderDTO> getUserOrders();
	void removeOrder(String orderId);
	List<OrderDTO> getOrdersOfAllUsers();
	void updateOrderStatus(String orderId,String status);
	
	

}
