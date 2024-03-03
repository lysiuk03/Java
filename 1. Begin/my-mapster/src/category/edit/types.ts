// Інтерфейс для представлення даних, необхідних для редагування існуючої категорії
export interface ICategoryEdit {
    id: number;
    name: string;
    file: File|undefined;
    description: string;
}