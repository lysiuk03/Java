package org.example;

import org.example.models.Category;
import org.example.models.Product;
import org.example.models.ProductPhoto;
import org.example.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        menu();
        //AddProduct();
        //ShowProducts();
    }

    private static void menu() {
        int action=0;
        Scanner in = new Scanner(System.in);
        do {
            System.out.println("0.Вихід");
            System.out.println("1.Додати");
            System.out.println("2.Показати всі");
            System.out.println("3.Змінити");
            System.out.println("4.Видалить");
            System.out.println("5.Додати продукт з фото");
            System.out.print("->_");
            action=in.nextInt();
            switch(action) {
                case 1: {
                    AddCategory();
                    break;
                }
                case 2: {
                    ShowCategories();
                    break;
                }
                case 3: {
                    EditCategory();
                    break;
                }
                case 4: {
                    DeleteCategory();
                    break;
                }
                case 5: {
                    AddProductWithPhotos();
                    break;
                }
            }
        }while(action!=0);
    }

    private static void AddProductWithPhotos() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();

        try (Session context = sf.openSession()) {
            context.beginTransaction();

            Product product = new Product();
            System.out.print("Вкажіть назву продукту: ");
            product.setName(in.nextLine());
            System.out.print("Вкажіть опис продукту: ");
            product.setDescription(in.nextLine());
            System.out.print("Вкажіть ціну продукту: ");
            product.setPrice(in.nextDouble());

            System.out.print("Вкажіть id категорії продукту: ");
            int categoryId = in.nextInt();
            Category category = context.get(Category.class, categoryId);
            if (category == null) {
                System.out.println("Категорію з таким id не знайдено.");
                context.getTransaction().commit();
                return;
            }

            product.setCategory(category);

            product.setPhotos(new ArrayList<>());

            context.save(product);

            System.out.print("Скільки фотографій бажаєте додати? ");
            int numPhotos = in.nextInt();
            in.nextLine();

            for (int i = 0; i < numPhotos; i++) {
                ProductPhoto photo = new ProductPhoto();
                System.out.print("Вкажіть шлях до фотографії " + (i + 1) + ": ");
                photo.setPhotoPath(in.nextLine());

                photo.setProduct(product);
                product.getPhotos().add(photo);

                context.save(photo);
            }

            context.update(product);

            context.getTransaction().commit();
        }
    }



    private static void AddCategory() {
        Calendar calendar = Calendar.getInstance();
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            Category category = new Category();
            System.out.print("Вкажіть назву: ");
            category.setName(in.nextLine());
            System.out.print("Вкажіть фото: ");
            category.setImage(in.nextLine());
            category.setDateCreated(calendar.getTime());
            context.save(category);
            context.getTransaction().commit();
        }
    }

    private static void ShowCategories() {
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            List<Category> list = context.createQuery("from Category", Category.class)
                    .getResultList();
            for (Category category : list) {
                System.out.println("Category: " + category);
            }
            context.getTransaction().commit();
        }
    }

    private static void EditCategory() {
        SessionFactory sf = HibernateUtil.getSessionFactory();
        Calendar calendar = Calendar.getInstance();
        Scanner in = new Scanner(System.in);
        System.out.println("Введіть id категорії яку хочете відредагувати: ");
        int id = in.nextInt();
        in.nextLine();

        try (Session context = sf.openSession()) {
            context.beginTransaction();

            Category category = context.get(Category.class, id);

            System.out.println("Вкажіть нову назву: ");
            String text = in.nextLine();
            category.setName(text);
            System.out.println("Вкажіть нове фото: ");
            String img = in.nextLine();
            category.setImage(img);

            context.update(category);
            context.getTransaction().commit();
        }
    }

    private static void DeleteCategory() {
        SessionFactory sf = HibernateUtil.getSessionFactory();

        Scanner in = new Scanner(System.in);
        System.out.println("Введіть id категорії яку хочете видалити: ");
        int id = in.nextInt();
        in.nextLine();

        try (Session context = sf.openSession()) {
            context.beginTransaction();

            Category category = context.get(Category.class, id);

            context.delete(category);

            context.getTransaction().commit();
        }
    }


    private static void AddProduct() {
        Scanner in = new Scanner(System.in);
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            Product product = new Product();
            System.out.print("Вкажіть назву: ");
            product.setName(in.nextLine());
            System.out.print("Вкажіть опис: ");
            product.setDescription(in.nextLine());
            System.out.print("Вкажіть id категрії: ");
            Category category = new Category();
            category.setId(in.nextInt());
            product.setCategory(category);
            System.out.print("Вкажіть ціну: ");
            product.setPrice(in.nextDouble());
            context.save(product);
            context.getTransaction().commit();
        }
    }

    private static void ShowProducts() {
        SessionFactory sf = HibernateUtil.getSessionFactory();
        try(Session context = sf.openSession()) {
            context.beginTransaction();
            List<Product> list = context.createQuery("from Product", Product.class)
                    .getResultList();
            for (Product product : list) {
                System.out.println("Product: " + product);
            }
            context.getTransaction().commit();
        }
    }
}