package com.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "foods")
public class Food {
	
	@Id
	private String id;
	@Field("food_name")
	private String name;
	@Field("food_description")
	private String description;
	@Field("food_price")
	private double price;
	@Field("food_img_url")
	private String imgUrl;
	@Field("food_category")
	private String category;

}
