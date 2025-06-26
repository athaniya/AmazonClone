package com.demo.service;

import com.demo.dto.CartDTO;
import com.demo.exception.CartNotFoundException;

public interface CartService {
	
	void addToCart(String foodId);
	void removeFromCart(String foodId) throws CartNotFoundException;
	CartDTO getCart();
	void clearCart();

}
