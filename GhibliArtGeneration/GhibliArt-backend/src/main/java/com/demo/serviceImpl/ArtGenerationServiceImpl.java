package com.demo.serviceImpl;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import com.demo.dto.StabilityApiResponse;
import com.demo.service.ArtGenerationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtGenerationServiceImpl implements ArtGenerationService {

	@Value("${stability.api.secret.key}")
	private String apiKey;

	private final RestClient restClient;

	@Override
	public byte[] generateImageFromText(String prompt) {
		Map<String, Object> requestBody = Map.of("text_prompts", List.of(Map.of("text", prompt)),
													"cfg_scale", 7,
													"height", 512, 
													"width", 512, 
													"samples", 1, 
													"steps", 30);

		StabilityApiResponse response = restClient.post()
												  .uri("/v1/generation/stable-diffusion-v1-6/text-to-image")
												  .header("Authorization", "Bearer " + apiKey)
												  .contentType(MediaType.APPLICATION_JSON)
												  .accept(MediaType.APPLICATION_JSON)
												  .body(requestBody).retrieve().body(StabilityApiResponse.class);

		if (response != null && response.getArtifacts() != null && !response.getArtifacts().isEmpty()) {
			String base64Image = response.getArtifacts().get(0).getBase64();
			return Base64.getDecoder().decode(base64Image);
		}

		throw new RuntimeException("Failed to generate image from Stability API");

	}

	@Override
	public byte[] generateImageFromImage(MultipartFile imageFile, String prompt) {
	    try {
	        // Wrap MultipartFile bytes in a resource with filename for multipart
	        ByteArrayResource imageResource = new ByteArrayResource(imageFile.getBytes()) {
	            @Override
	            public String getFilename() {
	                return imageFile.getOriginalFilename() != null ? imageFile.getOriginalFilename() : "input.png";
	            }
	        };

	        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
	        body.add("prompt", prompt);
	        body.add("init_image", imageResource);
	        body.add("output_format", "png");

	        byte[] responseBytes = restClient.post()
	            .uri("/v2beta/stable-image/generate/sd3")  // or correct image-to-image endpoint if different
	            .header("Authorization", "Bearer " + apiKey)
	            .contentType(MediaType.MULTIPART_FORM_DATA)
	            .accept(MediaType.parseMediaType("image/*"))
	            .body(body)
	            .retrieve()
	            .body(byte[].class);

	        return responseBytes;

	    } catch (IOException e) {
	        throw new RuntimeException("Failed to process input image", e);
	    }
	}



	

}
