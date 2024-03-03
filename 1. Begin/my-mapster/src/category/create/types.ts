// Інтерфейс для представлення даних, необхідних для створення нової категорії
export interface ICategoryCreate {
    name: string;
    image: File|undefined;
    description: string;
}
// Інтерфейс для представлення відвантаженого файлу, який містить фото категорії
export interface IUploadedFile {
    originFileObj: File
}