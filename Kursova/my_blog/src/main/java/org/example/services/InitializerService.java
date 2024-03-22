package org.example.services;

import com.github.javafaker.Faker;
import org.example.entities.CategoryEntity;
import org.example.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Service
public class InitializerService {
    private final Faker faker;
    private final CategoryRepository categoryRepository;

    public InitializerService(CategoryRepository categoryRepository) {
        faker = new Faker(new Locale("uk"));
        this.categoryRepository = categoryRepository;
    }

    public void seedCategories() {
        final int n = 10;
        if(categoryRepository.count() < n) {
            for (int i=0;i<n;i++) {
                CategoryEntity cat = new CategoryEntity();
                String name = faker.commerce().department();
                //String slug = generateSlug(name);
                cat.setName(name);
            }
        }
    }
}




