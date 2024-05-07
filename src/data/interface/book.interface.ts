import Book from "../../models/book.model";

export default interface IBookRepository {
    save(book: Book): Promise<Book>;
    retrieveAll(searchParams: { title: string }): Promise<Book[]>;
    retrieveById(bookId: number): Promise<Book | undefined>;
    retrieveBySlug(slug: string): Promise<Book | undefined>;
    updateBook(book: Book, slug: string): Promise<number>;
    delete(slugBook: string): Promise<number>;
    deleteAll(): Promise<number>;
}   