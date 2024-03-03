// Імпорт бібліотеки axios для виконання HTTP-запитів
import axios from "axios";
// Імпорт змінної BASE_URL з файлу env
import {APP_ENV} from "./env";
// Виведення у консоль базового URL для перевірки
console.log("URL", APP_ENV.BASE_URL);
// Створення екземпляру axios з базовим URL та налаштуваннями для використання у проекті
const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,// Встановлення базового URL для всіх запитів
    headers: {
        "Content-Type": "application/json"// Встановлення заголовка Content-Type для JSON-даних
    }
});
// Експорт створеного екземпляру axios для використання в інших частинах програми
export default  http_common;