package org.example.dto.product;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Data
public class ProductUpdateDTO {
    private String name;
    private String description;
    private List<MultipartFile> images;
    private int categoryId;
}