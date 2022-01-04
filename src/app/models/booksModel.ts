export class BooksClass {
    id: number = Math.random() * 100;
    createdAt: Date = new Date();
    name: string = "";
    isFavorite: boolean = false;
}