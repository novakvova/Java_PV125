package org.example.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.example.dto.category.CategoryCreateDTO;
import org.example.dto.category.CategoryItemDTO;
import org.example.dto.category.CategoryUpdateDTO;
import org.example.entities.CategoryEntity;
import org.example.mappers.CategoryMapper;
import org.example.repositories.CategoryRepository;
import org.example.storage.FileSaveFormat;
import org.example.storage.StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
@SecurityRequirement(name="my-api")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;
    @GetMapping()
    public ResponseEntity<List<CategoryItemDTO>> index() {
        var list = categoryRepository.findAll();
        List<CategoryItemDTO> items = categoryMapper.listCategoriesToItemDTO(list);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CategoryItemDTO create(@ModelAttribute CategoryCreateDTO dto) {
        //String fileName = storageService.saveMultipartFile(dto.getImage());
       String fileName = storageService.saveThumbnailator(dto.getImage(), FileSaveFormat.WEBP);
//        String fileName = storageService.saveThumbnailator(dto.getImage(), FileSaveFormat.JPG);

        CategoryEntity cat = CategoryEntity
                .builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .image(fileName)
                .build();
        categoryRepository.save(cat);
        return categoryMapper.categoryToItemDTO(cat);
    }
    @GetMapping("{id}")
    public ResponseEntity<CategoryItemDTO> getCategoryById(@PathVariable int id) {
        Optional<CategoryEntity> categoryOptional = categoryRepository.findById(id);
        return categoryOptional
                .map(category -> ResponseEntity.ok().body(categoryMapper.categoryToItemDTO(category)))
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping(value = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryItemDTO> updateCategory(@PathVariable int id, @ModelAttribute CategoryUpdateDTO dto) {
        Optional<CategoryEntity> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            var category = categoryOptional.get();
            if(category.getImage()!=null && !category.getImage().isEmpty()) {
                storageService.removeFile(category.getImage());
            }
            String fileName = storageService.saveThumbnailator(dto.getImage(), FileSaveFormat.WEBP);
            category.setName(dto.getName());
            category.setDescription(dto.getDescription());
            category.setImage(fileName);
            categoryRepository.save(category);
            return ResponseEntity.ok().body(categoryMapper.categoryToItemDTO(category));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        Optional<CategoryEntity> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            var category = categoryOptional.get();
            if(category.getImage()!=null && !category.getImage().isEmpty()) {
                storageService.removeFile(category.getImage());
            }
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
