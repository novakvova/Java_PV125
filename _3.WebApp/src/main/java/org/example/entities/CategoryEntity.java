package org.example.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name="tbl_categories")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="name", length = 250, nullable = false)
    private String name;
    @Column(name="image", length = 250, nullable = false)
    private String image;
    @Column(name="description", length = 250, nullable = false)
    private String description;
    @Column(name="is_delete", nullable = false)
    private boolean isDelete;
    @JsonManagedReference
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<ProductEntity> products;
}
