package com.demo.serviceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.demo.exception.ImageNotFoundException;
import com.demo.service.ResourceService;

@Service
public class ResourceServiceImpl implements ResourceService {
	
	private final String IMG_DIR = "uploads/images/";
	private final String exceptionMessage = "Image not Found with URL : ";

	@Override
	public String saveImg(MultipartFile file) throws IOException {
		Path imgPath = Paths.get(IMG_DIR);
		
		if(Files.notExists(imgPath)) {
			Files.createDirectories(imgPath);
		}
		
		String uniqueFileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
	    Path filePath = imgPath.resolve(uniqueFileName);
	    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
	    return uniqueFileName;
	}

	@Override
	public Resource serveImg(String fileName) throws ImageNotFoundException{
		Path completeFilePath = Paths.get(IMG_DIR).resolve(fileName);
		if(Files.exists(completeFilePath)) {
			Resource imgResource = new FileSystemResource(completeFilePath);
			return imgResource;
		}
		else {
			throw new ImageNotFoundException(exceptionMessage +""+fileName);
		}
		
	}

	@Override
	public boolean deleteImg(String imageURL) throws ImageNotFoundException{
		
		try {
			Files.delete(Paths.get(IMG_DIR).resolve(imageURL));
		} catch (IOException e) {
			throw new ImageNotFoundException(exceptionMessage + "" +imageURL);
		}
		
		return true;
	}
	

}
