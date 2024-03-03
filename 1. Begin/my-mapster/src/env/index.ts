// Код використовує Vite's environment variables для отримання значення VITE_API_URL з .env файлу.
// Визначається константа BASE_URL, яка отримує значення VITE_API_URL та зазначає його тип як string.
const BASE_URL: string = import.meta.env.VITE_API_URL as string;
// Створюється об'єкт APP_ENV, який містить єдину властивість BASE_URL з отриманого значення.
const APP_ENV = {
    BASE_URL: BASE_URL
};
// Експортується об'єкт APP_ENV для використання в інших частинах програми.
export { APP_ENV }