package org.example.controllers;

import lombok.AllArgsConstructor;
import org.example.dto.product.ProductCreateDTO;
import org.example.dto.product.ProductItemDTO;
import org.example.dto.product.ProductUpdateDTO;
import org.example.entities.ProductEntity;
import org.example.entities.ProductImageEntity;
import org.example.mappers.ProductMapper;
import org.example.repositories.ProductImageRepository;
import org.example.repositories.ProductRepository;
import org.example.storage.StorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductMapper productMapper;
    private final StorageService storageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductEntity> create(@ModelAttribute ProductCreateDTO dto) {
        ProductEntity product = productMapper.productByCreateProductDTO(dto);
        product.setImages(new ArrayList<>());
        productRepository.save(product);
        for (MultipartFile image : dto.getImages()) {
            String fileName = storageService.saveMultipartFile(image);
            ProductImageEntity productImage = new ProductImageEntity();
            productImage.setImage(fileName);
            productImage.setProduct(product);
            productImageRepository.save(productImage);
            product.getImages().add(productImage);
        }
        return ResponseEntity.ok().body(product);
    }

    @PutMapping(value = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductEntity> updateProduct(@PathVariable int id, @ModelAttribute ProductUpdateDTO dto) {
        Optional<ProductEntity> existingProduct = productRepository.findById(id);

        if (existingProduct.isPresent()) {
            ProductEntity product = productMapper.productByUpdateProductDTO(dto);
            product.setImages(new ArrayList<>());
            product.setId(id);

            for (ProductImageEntity existingImage : existingProduct.get().getImages()) {
                storageService.removeFile(existingImage.getImage());
                productImageRepository.deleteById(existingImage.getId());
            }

            for (MultipartFile image : dto.getImages()) {
                String fileName = storageService.saveMultipartFile(image);
                ProductImageEntity productImage = new ProductImageEntity();
                productImage.setImage(fileName);
                productImage.setProduct(product);
                product.getImages().add(productImage);
            }

            productRepository.save(product);
            return ResponseEntity.ok().body(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductItemDTO> getProduct(@PathVariable int id) {
        return productRepository.findById(id)
                .map(product -> ResponseEntity.ok().body(productMapper.productToItemDTO(product)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping()
    public ResponseEntity<List<ProductItemDTO>> getAllCategories() {
        return ResponseEntity.ok(productMapper.listProductsToItemDTO(productRepository.findAll()));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            ProductEntity product = optionalProduct.get();
            List<ProductImageEntity> productImages = product.getImages();
            for (ProductImageEntity productImage : productImages) {
                storageService.removeFile(productImage.getImage());
            }
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}