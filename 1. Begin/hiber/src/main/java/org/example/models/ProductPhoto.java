package org.example.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tbl_product_photos")
public class ProductPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "photo_path")
    private String photoPath;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}