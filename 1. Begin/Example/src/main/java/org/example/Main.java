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
        //CategoryCreate newCategory = new CategoryCreate("Одяг", "Для дорослих");
        //insertCategory(strConn,userName,password,newCategory);
// Змінна для виходу з циклу меню
        boolean exit = false;

        // Основний цикл меню
        while (!exit) {
            // Виведення меню на екран
            printMenu();

            Scanner scanner = new Scanner(System.in);
            // Зчитування введеної опції користувача
            int choice = readChoice();

            // Обробка вибору користувача
            switch (choice) {
                case 1:
                    displayCategories(strConn, userName, password);
                    break;
                case 2:
                    System.out.println("Введіть назву категорії:");
                    String categoryName = scanner.nextLine();
                    System.out.println("Введіть опис категорії:");
                    String categoryDescription = scanner.nextLine();
                    CategoryCreate newCategory = new CategoryCreate(categoryName, categoryDescription);
                    insertCategory(strConn,userName,password,newCategory);
                    break;
                case 3:
                    // Виведення списку категорій перед редагуванням
                    displayCategories(strConn, userName, password);

                    // Зчитування ID категорії для редагування
                    System.out.println("Введіть ID категорії, яку ви хочете редагувати:");
                    int categoryId = scanner.nextInt();

                    // Зчитування нових даних для категорії
                    System.out.println("Введіть нову назву категорії:");
                    String newCategoryName = scanner.nextLine(); // Consuming the newline character
                    newCategoryName = scanner.nextLine(); // Reading the actual input

                    System.out.println("Введіть новий опис категорії:");
                    String newCategoryDescription = scanner.nextLine();

                    // Виклик методу для редагування категорії в базі даних
                    updateCategory(strConn, userName, password, categoryId, newCategoryName, newCategoryDescription);
                    break;
                case 4:
                    // Виведення списку категорій перед видаленням
                    displayCategories(strConn, userName, password);

                    // Зчитування ID категорії для видалення
                    System.out.println("Введіть ID категорії, яку ви хочете видалити:");
                    int catId = scanner.nextInt();

                    // Виклик методу для видалення категорії з бази даних
                    removeCategory(strConn, userName, password, catId);
                    break;
                case 5:
                    exit = true;
                    break;
                default:
                    System.out.println("Eror.");
            }
        }

    }


    // Метод для редагування категорії в базі даних
    private static void updateCategory(String strConn, String userName, String password,
                                       int catId, String newCategoryName, String newCategoryDescription) {
        try (Connection conn = DriverManager.getConnection(strConn, userName, password)) {
            // SQL запит для оновлення запису в таблиці "categories"
            String updateQuery = "UPDATE categories SET name=?, description=? WHERE id=?";

            // Створення PreparedStatement
            PreparedStatement preparedStatement = conn.prepareStatement(updateQuery);

            // Встановлення значень для заповнювачів
            preparedStatement.setString(1, newCategoryName);
            preparedStatement.setString(2, newCategoryDescription);
            preparedStatement.setInt(3, catId);

            // Виконання SQL запиту
            int rowsAffected = preparedStatement.executeUpdate();

            // Закриття ресурсів
            preparedStatement.close();

            System.out.println("Rows affected: " + rowsAffected);
            System.out.println("Category updated successfully.");
        } catch (Exception ex) {
            System.out.println("Помилка при редагуванні категорії: " + ex.getMessage());
        }
    }

    // Метод для видалення категорії з бази даних
    private static void removeCategory(String strConn, String userName, String password, int categoryId) {
        try (Connection conn = DriverManager.getConnection(strConn, userName, password)) {
            // SQL запит для видалення запису з таблиці "categories"
            String deleteQuery = "DELETE FROM categories WHERE id=?";

            // Створення PreparedStatement
            PreparedStatement preparedStatement = conn.prepareStatement(deleteQuery);

            // Встановлення значень для заповнювача
            preparedStatement.setInt(1, categoryId);

            // Виконання SQL запиту
            int rowsAffected = preparedStatement.executeUpdate();

            // Закриття ресурсів
            preparedStatement.close();

            System.out.println("Rows affected: " + rowsAffected);
            System.out.println("Category deleted successfully.");
        } catch (Exception ex) {
            System.out.println("Помилка при видаленні категорії: " + ex.getMessage());
        }
    }

    // Метод для виведення списку категорій
    private static void displayCategories(String strConn, String userName, String password) {
        try (Connection conn = DriverManager.getConnection(strConn, userName, password)) {
            Statement statement = conn.createStatement();

            // SQL запит для вибору всіх записів з таблиці "categories"
            String selectQuery = "SELECT * FROM categories";

            // Виконання SQL запиту
            var resultSet = statement.executeQuery(selectQuery);

            // Виведення результатів запиту на екран
            System.out.println("Список категорій:");
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String description = resultSet.getString("description");

                System.out.printf("ID: %d, Назва: %s, Опис: %s%n", id, name, description);
            }

            // Закриття ресурсів
            resultSet.close();
            statement.close();
        } catch (Exception ex) {
            System.out.println("Помилка при виведенні категорій: " + ex.getMessage());
        }
    }

    // Метод для зчитування вибору користувача
    private static int readChoice() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Ваш вибір: ");
        while (!scanner.hasNextInt()) {
            System.out.println("Eror.");
            scanner.next();
        }
        return scanner.nextInt();
    }

    // Метод для виведення меню на екран
    private static void printMenu() {
        System.out.println("Меню:");
        System.out.println("1. Вивести список категорій");
        System.out.println("2. Додати категорію");
        System.out.println("3. Редагування категорії");
        System.out.println("4. Видалення категорії");
        System.out.println("5. Вихід");
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