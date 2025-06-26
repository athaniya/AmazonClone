package com.demo.serviceImpl;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.demo.dto.OrderDTO;
import com.demo.entity.OrderEntity;
import com.demo.repo.OrderRepo;
import com.demo.service.CartService;
import com.demo.service.OrderService;
import com.demo.service.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
	
	@Value("${razor.pay.id}")
	private String RAZOR_KEY; 
	@Value("${razor.pay.secret.key}")
	private String RAZOR_SECRET_KEY;
	
	private final  OrderRepo orderRepo;
	private final  UserService userService;
	private final CartService cartService;
	
	
	
	@Override
	public OrderEntity createOrderWithPayment(OrderDTO orderDTO) throws RazorpayException {
		OrderEntity orderEntity = convertToEntity(orderDTO);
		OrderEntity newOrderEntity = orderRepo.save(orderEntity);
		
		try {
			RazorpayClient razorpayClient = new RazorpayClient(RAZOR_KEY, RAZOR_SECRET_KEY);
			JSONObject orderRequest = new JSONObject();
			orderRequest.put("amount",newOrderEntity.getAmount() * 100);
			orderRequest.put("currency", "INR");
			orderRequest.put("payment_capture", 1);
			
			Order razorPayOrder = razorpayClient.orders.create(orderRequest);
			newOrderEntity.setRazorpayOrderId(razorPayOrder.get("id"));
			String loggedInUserId = userService.getUserId();
			newOrderEntity.setUserId(loggedInUserId);
			
		} catch (RazorpayException e) {
			
			throw new RazorpayException("Error While creating order");
		}
		return orderRepo.save(newOrderEntity);
		
	}
	
	private OrderEntity convertToEntity(OrderDTO orderDTO) {
		
		return OrderEntity.builder()
						  .id(orderDTO.getId())
						  .userId(orderDTO.getUserId())
						  .userAddress(orderDTO.getUserAddress())
						  .email(orderDTO.getEmail())
						  .amount(orderDTO.getAmount())
						  .orderItems(orderDTO.getOrderItems())
						  .orderStatus(orderDTO.getOrderStatus())
						  .phoneNumber(orderDTO.getPhoneNumber())
				.build();
	}
	
	private OrderDTO convertToDto(OrderEntity orderEntity) {
		
		return OrderDTO.builder()
				  .id(orderEntity.getId())
				  .userId(orderEntity.getUserId())
				  .userAddress(orderEntity.getUserAddress())
				  .email(orderEntity.getEmail())
				  .amount(orderEntity.getAmount())
				  .orderItems(orderEntity.getOrderItems())
				  .orderStatus(orderEntity.getOrderStatus())
				  .phoneNumber(orderEntity.getPhoneNumber())
				  .razorpayOrderId(orderEntity.getRazorpayOrderId())
				  .razorpaySignature(orderEntity.getRazorpaySignature())
				  .razorpayPaymentId(orderEntity.getRazorpayPaymentId())
				  .paymentStatus(orderEntity.getPaymentStatus())
		.build();
	}


	@Override
	public void verifyPayment(Map<String, String> paymentData, String status) {
		String razorpayOrderId = paymentData.get("razorpay_order_id");
		OrderEntity existingOrder = orderRepo.findByRazorpayOrderId(razorpayOrderId)
				 .orElseThrow(() -> new RuntimeException("Order Not found with Id :" + razorpayOrderId));
		
		existingOrder.setPaymentStatus(status);
		existingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));
		existingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));
		orderRepo.save(existingOrder);
		
		if("paid".equalsIgnoreCase(status)) {
			cartService.clearCart();
		}
		
	}

	@Override
	public List<OrderDTO> getUserOrders() {
		String loggedInUserId = userService.getUserId();
		List<OrderEntity> listOfOrder = orderRepo.findByUserId(loggedInUserId);
		 return listOfOrder.stream()
				   .map(entity -> convertToDto(entity))
				   .toList();
	}

	@Override
	public void removeOrder(String orderId) {
		orderRepo.deleteById(orderId);
	}

	@Override
	public List<OrderDTO> getOrdersOfAllUsers() {
		List<OrderDTO> orders = orderRepo.findAll()
										 .stream()
										 .map(entity -> convertToDto(entity))
										 .toList();
		return orders;
	}

	@Override
	public void updateOrderStatus(String orderId, String status) {
		OrderEntity orderEntity = orderRepo.findById(orderId)
				 .orElseThrow(() -> new RuntimeException("Order not found with id : "+ orderId));
		
		orderEntity.setOrderStatus(status);
		orderRepo.save(orderEntity);
		
	}
	
	
	

}
