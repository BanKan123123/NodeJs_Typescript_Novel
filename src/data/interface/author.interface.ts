import Author from "../../models/author.model";

export default interface IAuthorRepository {
    save(author: Author): Promise<Author>;
    retrieveAll(searchParams: { title: string }): Promise<Author[]>;
    retrieveById(authorId: number): Promise<Author>;
    retrieveBySlug(slug: string): Promise<Author>;
    update(author: Author, slug: string): Promise<number>;
    delete(slug: string): Promise<number>;
    deleteAll(): Promise<number>;
}   