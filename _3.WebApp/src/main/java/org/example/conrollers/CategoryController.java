package org.example.conrollers;

import org.example.dto.category.CategoryItemDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CategoryController {
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
}
