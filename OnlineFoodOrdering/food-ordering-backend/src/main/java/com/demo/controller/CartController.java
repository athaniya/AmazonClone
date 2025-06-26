package com.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dto.CartDTO;
import com.demo.exception.CartNotFoundException;
import com.demo.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {
	
	private CartService cartService;
	
	@PostMapping
	public ResponseEntity<Void> addToCart(@RequestBody CartDTO cartDTO){
		String foodId = cartDTO.getFoodId();
		cartService.addToCart(foodId);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	@GetMapping
	public ResponseEntity<CartDTO> getCart(){
		CartDTO cart = cartService.getCart();
		return ResponseEntity.status(HttpStatus.OK).body(cart);
	}
	
	@PutMapping
	public ResponseEntity<Void> removeFromCart(@RequestBody CartDTO cartDTO) throws CartNotFoundException{
		cartService.removeFromCart(cartDTO.getFoodId());
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	@DeleteMapping
	public ResponseEntity<Void> deleteCart(){
		cartService.clearCart();
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
}
