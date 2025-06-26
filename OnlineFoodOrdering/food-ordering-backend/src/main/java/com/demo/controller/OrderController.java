package com.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dto.OrderDTO;
import com.demo.entity.OrderEntity;
import com.demo.service.OrderService;
import com.razorpay.RazorpayException;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {
	
	private OrderService orderService;
	
	@PostMapping
	public ResponseEntity<OrderEntity> createOrderWithPayment(@RequestBody OrderDTO orderDTO) throws RazorpayException{
		OrderEntity orderEntity = orderService.createOrderWithPayment(orderDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(orderEntity);
	}
	
	@PostMapping("/verify")
	public ResponseEntity<Void> verifyPayment(@RequestBody Map<String, String> paymentData){
		orderService.verifyPayment(paymentData, "paid");
		return ResponseEntity.status(HttpStatus.OK).build();
		
	}
	
	@GetMapping
	public ResponseEntity<List<OrderDTO>> getUserOrders() {
		List<OrderDTO> userOrders = orderService.getUserOrders();
		return ResponseEntity.status(HttpStatus.OK).body(userOrders);
	}
	
	@DeleteMapping("{orderId}")
	public ResponseEntity<Void> deleteOrder(@PathVariable String orderId){
		orderService.removeOrder(orderId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@GetMapping("/allUserOrders")
	public ResponseEntity<List<OrderDTO>> getAllUserOrders(){
		List<OrderDTO> ordersOfAllUsers = orderService.getOrdersOfAllUsers();
		return ResponseEntity.status(HttpStatus.OK).body(ordersOfAllUsers);
	}
	
	@PatchMapping("/status/{orderId}")
	public ResponseEntity<Void> updateOrderStatus(@PathVariable String orderId,@RequestParam String status){
		orderService.updateOrderStatus(orderId, status);
		return ResponseEntity.status(HttpStatus.OK).build();
		
	}
	
	
	

}
