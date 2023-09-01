package org.example.dto.category;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryUpdateDTO {
    private String name;
    private String description;
    private MultipartFile image;
}
