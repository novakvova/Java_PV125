package org.example.mappers;

import org.example.dto.product.ProductCreateDTO;
import org.example.dto.product.ProductItemDTO;
import org.example.dto.product.ProductUpdateDTO;
import org.example.entities.CategoryEntity;
import org.example.entities.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = ProductImageMapper.class)
public interface ProductMapper {
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "images", source = "images")
    ProductItemDTO productToItemDTO(ProductEntity product);
    List<ProductItemDTO> listProductsToItemDTO(List<ProductEntity> list);
    @Mapping(target = "category", source = "categoryId", qualifiedByName = "categoryIdToCategory")
    ProductEntity productByCreateProductDTO(ProductCreateDTO dto);
    @Mapping(target = "category", source = "categoryId", qualifiedByName = "categoryIdToCategory")
    ProductEntity productByUpdateProductDTO(ProductUpdateDTO dto);
    @Named("categoryIdToCategory")
    static CategoryEntity categoryIdToCategory(int categoryId) {
        CategoryEntity category = new CategoryEntity();
        category.setId(categoryId);
        return category;
    }
}