package org.example.dto.productImage;

import lombok.Data;

@Data
public class ProductImageItemDTO {
    private int id;
    private int productId;
    private String image;
}
