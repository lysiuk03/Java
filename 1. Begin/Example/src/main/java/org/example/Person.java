// Пакет, в якому знаходиться клас
package org.example;

// Імпорт анотацій Lombok для автоматичного створення методів (getters, setters, equals і ін.)
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Клас, що представляє особу (Person) і реалізує інтерфейс Comparable для можливості порівняння об'єктів
@Data
// Анотація @NoArgsConstructor від Lombok генерує конструктор без аргументів
@NoArgsConstructor
// Анотація @AllArgsConstructor від Lombok генерує конструктор, який приймає всі аргументи
@AllArgsConstructor
public class Person implements Comparable {
    // Приватне поле для імені
    private String firstName;
    // Приватне поле для прізвища
    private String lastName;

    // Перевизначений метод compareTo інтерфейсу Comparable для порівняння об'єктів Person
    @Override
    public int compareTo(Object o) {
        // Приведення параметра до типу Person
        Person p = (Person) o;
        // Порівняння за прізвищем
        int result = this.lastName.compareTo(p.lastName);
        // Якщо прізвища однакові, порівнюємо за ім'ям
        if (result == 0)
            result = this.firstName.compareTo(p.firstName);
        // Повертаємо результат порівняння
        return result;
    }
}