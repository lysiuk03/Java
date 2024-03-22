package org.example.services;

import com.github.javafaker.Faker;
import org.example.entities.CategoryEntity;
import org.example.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Service
public class InitializerService {
    private final Faker faker;
    private final CategoryRepository categoryRepository;

    private Map<String,String> letters = new HashMap<>();

    public InitializerService(CategoryRepository categoryRepository) {
        faker = new Faker(new Locale("uk"));
        this.categoryRepository = categoryRepository;
        fillLetters();
    }

    public void seedCategories(){
        final int count = 10;
        if(categoryRepository.count()==0){
            for(int i = 0;i<count;i++){
                CategoryEntity category = new CategoryEntity();
                String name = faker.commerce().department();
                category.setName(name);
                String slug = DoSlugUrl(name);
                category.setUrlSlug(slug);
                String description = "Виробник : "+faker.company().name()+
                        " | Матеріал : "+ faker.commerce().material();
                category.setDescription(description);
                categoryRepository.save(category);
            }
        }
    }

    public String DoSlugUrl(String text){
        String slug ="";
        for (var item : text.toCharArray()){
            if(Character.isUpperCase(item)){
                item=Character.toLowerCase(item);
            }
            String symb = letters.get(Character.toString(item));
            if(Character.isUpperCase(item)){
                symb=symb.toUpperCase();
            }
            if(symb!=null)
                slug+=symb;
        }
        return slug;
    }
    private void fillLetters(){
        letters.put(  "а","a" );
        letters.put(  "б","b" );
        letters.put(  "в","v" );
        letters.put(  "г","g" );
        letters.put(  "ґ","g" );
        letters.put(  "д","d" );
        letters.put(  "е","e" );
        letters.put( "є" ,"ye");
        letters.put( "ж" ,"zh");
        letters.put(  "з","z" );
        letters.put(  "и","u" );
        letters.put( "і" ,"i");
        letters.put( "ї" ,"yi");
        letters.put(  "й","y" );
        letters.put(  "к","k" );
        letters.put(  "л","l" );
        letters.put(  "м","m" );
        letters.put(  "н","n" );
        letters.put(  "о","o" );
        letters.put(  "п","p" );
        letters.put(  "р","r" );
        letters.put(  "с","s" );
        letters.put(  "т","t" );
        letters.put(  "у","u" );
        letters.put(  "ф","f" );
        letters.put(  "х","h" );
        letters.put(  "ц","c" );
        letters.put( "ч" ,"ch");
        letters.put( "ш" ,"sh");
        letters.put("щ" , "sch");
        letters.put( "ю", "yu");
        letters.put( "я", "ya");
        letters.put( "-","-" );
        letters.put(" " ,"-" );
        letters.put("&" ,"ta" );
    }
}
