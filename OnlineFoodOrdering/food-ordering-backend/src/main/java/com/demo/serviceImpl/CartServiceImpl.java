package com.demo.serviceImpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.demo.dto.CartDTO;
import com.demo.entity.Cart;
import com.demo.exception.CartNotFoundException;
import com.demo.repo.CartRepo;
import com.demo.service.CartService;
import com.demo.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService{
	
	private CartRepo cartRepo;
	private UserService userService;

	@Override
	public void addToCart(String foodId) {
		String loggedInUserId = userService.getUserId();
		Cart cart = cartRepo.findByUserId(loggedInUserId)
							.orElse(Cart.builder().userId(loggedInUserId).items(new HashMap<>()).build());
		Map<String,Integer> cartItems = cart.getItems();
		cartItems.put(foodId,cartItems.getOrDefault(foodId, 0) + 1);
		cart.setItems(cartItems);
		cartRepo.save(cart);
	}

	@Override
	public void removeFromCart(String foodId) throws CartNotFoundException{
		String loggedInUserId = userService.getUserId();
		Cart cart = cartRepo.findByUserId(loggedInUserId)
				.orElseThrow(() -> new CartNotFoundException("Cart Not Found with userId : "+loggedInUserId));
		Map<String, Integer> cartItems = cart.getItems();
		if(cartItems.containsKey(foodId)) {
			int currentQty = cartItems.get(foodId);
			if(currentQty > 0) {
				cartItems.put(foodId,currentQty - 1);
			}
			else {
				cartItems.remove(foodId);
			}
			cartRepo.save(cart);
		}
	}

	@Override
	public CartDTO getCart() {
		String loggedInUserId = userService.getUserId();
		Cart cart = cartRepo.findByUserId(loggedInUserId)
				.orElse(Cart.builder().id(null).userId(loggedInUserId).items(new HashMap<>()).build());
		return convertToDto(cart);
	}
	
	private CartDTO convertToDto(Cart cart) {
		return CartDTO.builder()
					  .id(cart.getId())
					  .userId(cart.getUserId())
					  .items(cart.getItems())
					  .build();
	}

	@Override
	public void clearCart() {
		String loggedInUserId = userService.getUserId();
		cartRepo.deleteByUserId(loggedInUserId);
		
		
	}

}
