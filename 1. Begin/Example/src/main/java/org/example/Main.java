// Пакет, в якому знаходиться клас
package org.example;

// Імпорти необхідних класів
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

// Головний клас програми
public class Main {
    // Метод main - точка входу в програму
    public static void main(String[] args) {
        // inputData()
        // simpleArray();
        // sortPerson();

        // З'єднання з базою даних та створення категорії
        String userName="root";
        String password="";
        String host = "localhost";
        String port = "3306";
        String database = "java_spu111";
        String strConn ="jdbc:mariadb://"+host+":"+port+"/"+database;
        createCategory(strConn,userName,password);
        // Створення об'єкта категорії та вставка його в базу даних
        CategoryCreate newCategory = new CategoryCreate("Одяг", "Для дорослих");
        insertCategory(strConn,userName,password,newCategory);
    }

    // Метод для створення таблиці категорій в базі даних
    private static void createCategory(String strConn, String userName, String password){
        try(Connection conn = DriverManager.getConnection(strConn,userName,password)) {
            Statement statement = conn.createStatement();

            // SQL запит для створення таблиці "categories"
            String createTableSQL = "CREATE TABLE IF NOT EXISTS categories ("
                    + "id INT AUTO_INCREMENT PRIMARY KEY,"
                    + "name VARCHAR(255) NOT NULL,"
                    + "description TEXT"
                    + ")";

            // Виконання SQL запиту
            statement.execute(createTableSQL);

            // Закриття ресурсів
            statement.close();

            System.out.println("В БД створено таблицю categories");

            System.out.println("Підключення до БД успішно");
        }
        catch(Exception ex) {
            System.out.println("Error connection: "+ex.getMessage());
        }
    }

    // Метод для вставки категорії в таблицю бази даних
    private static void insertCategory(String strConn, String userName, String password,
                                       CategoryCreate categoryCreate) {
        try(Connection conn = DriverManager.getConnection(strConn,userName,password)) {
            Statement statement = conn.createStatement();

            String insertQuery = "INSERT INTO categories (name, description) VALUES (?, ?)";
            // Створення PreparedStatement
            PreparedStatement preparedStatement = conn.prepareStatement(insertQuery);

            // Встановлення значень для заповнювачів
            preparedStatement.setString(1, categoryCreate.getName());
            preparedStatement.setString(2, categoryCreate.getDescription());

            // Виконання SQL запиту
            int rowsAffected = preparedStatement.executeUpdate();

            // Закриття ресурсів
            preparedStatement.close();
            System.out.println("Rows affected: " + rowsAffected);
            System.out.println("Category inserted successfully.");
        }
        catch(Exception ex) {
            System.out.println("Помилка створення категорії: "+ex.getMessage());
        }
    }

    // Метод для сортування масиву об'єктів Person
    private static void sortPerson(){
        // Створення масиву об'єктів типу Person
    Person[] list={
            new Person("Іван","Мельник"),
            new Person("Мальвіна","Мельник"),
            new Person("Петро","Мельник"),
            new Person("Олег","Мельник"),
    };
        // Виведення несортованого масиву на екран
    System.out.println("Звичайний масив");
    for(var item:list){
        System.out.println(item);
    }
    System.out.println("Сортований масив");
        // Сортування масиву за прізвищем та ім'ям
    Arrays.sort(list);
        // Виведення відсортованого масиву на екран
    for(var item:list){
        System.out.println(item);
    }
}
    // Метод для роботи зі звичайним масивом та виведення статистики
    private static void simpleArray(){
        // Створення об'єкту Scanner для зчитування введення з консолі
        Scanner scanner = new Scanner(System.in);
        // Задання розміру масиву
        int n=10;
        // Створення масиву цілих чисел розміром n
        int []mas = new int[n];
        // Заповнення масиву випадковими числами в діапазоні від -5 до 30
        for (int i=0;i<n;i++)
            mas[i]=getRandom(-5,30);
        // Виведення несортованого масиву на екран
        System.out.println("Звичайний масив");
        for(int item:mas){
            System.out.printf("%d\t",item);
        }
        System.out.println("\nВідсортований масив");
        // Сортування масиву
        Arrays.sort(mas);
        // Виведення відсортованого масиву на екран
        for(int item:mas){
            System.out.printf("%d\t",item);
        }
        // Підрахунок кількості додатних чисел у масиві
        int count=0;

        for(int item:mas){
            if(item>=0)
                count++;
        }
        // Виведення кількості додатних чисел на екран
        System.out.println("\nКількість додатних чисел "+count);
    }

    // Метод для отримання випадкового числа в заданому діапазоні
    private static int getRandom(int min, int max){
        // Створення об'єкту Random для генерації випадкових чисел
        Random random = new Random();
        // Генерація випадкового цілого числа в заданому діапазоні [min, max)
        return random.nextInt(max-min)+min;
    }

    // Метод для введення даних з консолі
    public static void inputData(){
        // Створення об'єкту Scanner для зчитування введення з консолі
        Scanner input = new Scanner(System.in);
        // Виведення запитання на екран
        System.out.println("Як вас звати?");
        // Зчитування введення користувача та збереження його в змінну name
        String name=input.nextLine();
        // Виведення привітання з використанням введеного імені
        System.out.println("Hello "+name+"!");
    }
}