package org.example.utils;

import lombok.Getter;
import org.example.models.Category;
import org.example.models.Product;
import org.example.models.ProductPhoto;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    @Getter
    private static SessionFactory sessionFactory;

    static {
        try {
            Configuration conf = new Configuration().configure();
            //автоматично створить в БД таблицю tbl_categories якщо її там немає
            conf.addAnnotatedClass(Category.class);
            conf.addAnnotatedClass(Product.class);
            conf.addAnnotatedClass(ProductPhoto.class);
            sessionFactory = conf.buildSessionFactory();
        } catch(Throwable ex) {
            System.out.println("Помилка підключення до БД! " + ex.getMessage());
        }
    }
}