// Інтерфейс для представлення окремого елемента категорії
export interface ICategoryItem {
    id: number;
    name: string;
    description: string;
    image: string;
}
// Інтерфейс для представлення відповіді від сервера із списком категорій
export interface IGetCategories {
    content: ICategoryItem[],
    totalPages: number,
    totalElements: number,
    number: number
}
// Інтерфейс для представлення параметрів пошуку категорій
export interface ICategorySearch{
    name: string,
    page: number,
    size: number
}
