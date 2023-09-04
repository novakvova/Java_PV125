package org.example.mappers;

import org.example.dto.productImage.ProductImageItemDTO;
import org.example.entities.ProductImageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    @Mapping(target = "productId", source = "product.id")
    ProductImageItemDTO productImageToItemDTO(ProductImageEntity productImage);
}
