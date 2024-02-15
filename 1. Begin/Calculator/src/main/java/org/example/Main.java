package org.example;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double num1, num2, result;
        char operator;
        System.out.println("Введіть перше число:");
        num1 = scanner.nextDouble();

        System.out.println("Введіть (+, -, *, /):");
        operator = scanner.next().charAt(0);

        System.out.println("Введіть друге число:");
        num2 = scanner.nextDouble();

        switch (operator) {
            case '+':
                result = num1 + num2;
                System.out.println("Результат: " + result);
                break;
            case '-':
                result = num1 - num2;
                System.out.println("Результат: " + result);
                break;
            case '*':
                result = num1 * num2;
                System.out.println("Результат: " + result);
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println("Результат: " + result);
                } else {
                    System.out.println("Помилка: Ділення на нуль!");
                }
                break;
            default:
                System.out.println("Помилка: Невірна операція.");
        }


    }
}
