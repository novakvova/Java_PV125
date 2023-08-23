package org.example.conrollers;

import lombok.AllArgsConstructor;
import org.example.dto.category.CategoryCreateDTO;
import org.example.dto.category.CategoryItemDTO;
import org.example.entities.CategoryEntity;
import org.example.repositories.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class CategoryController {
    private final CategoryRepository categoryRepository;
    @GetMapping("/")
    public ResponseEntity<List<CategoryItemDTO>> index() {
        var result = new ArrayList<CategoryItemDTO>();
        var item = new CategoryItemDTO();
        item.setId(1);
        item.setName("Сало");
        item.setImage("salo.jpg");
        item.setDescription("Для козаків");
        result.add(item);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/category")
    public CategoryEntity create(@RequestBody CategoryCreateDTO dto) {
        CategoryEntity cat = CategoryEntity
                .builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .image(dto.getImage())
                .build();
        categoryRepository.save(cat);
        return cat;
    }

}
