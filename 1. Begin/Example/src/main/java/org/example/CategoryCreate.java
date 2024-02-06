// Пакет, в якому знаходиться клас
package org.example;
// Імпорт анотацій Lombok для автоматичного створення методів (getters, setters, equals і ін.)
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Анотація @Data від Lombok генерує стандартні методи, такі як getters, setters, toString, equals і hashCode
@Data
// Анотація @AllArgsConstructor від Lombok генерує конструктор, який приймає всі аргументи
@AllArgsConstructor
// Анотація @NoArgsConstructor від Lombok генерує конструктор без аргументів
@NoArgsConstructor
public class CategoryCreate {
    // Приватне поле для назви категорії
    private String name;
    // Приватне поле для опису категорії
    private String description;
}
