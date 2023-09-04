package org.example.dto.product;

import lombok.Data;
import org.example.dto.productImage.ProductImageItemDTO;

import java.util.List;

@Data
public class ProductItemDTO {
    private int id;
    private String name;
    private String description;
    private List<ProductImageItemDTO> images;
    private int categoryId;
}
