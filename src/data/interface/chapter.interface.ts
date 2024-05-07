import Chapter from "../../models/chapter.model";

export default interface IChapterRepository {
    save(chapter: Chapter): Promise<Chapter>;
    retrieveAll(searchParams: { title: string }): Promise<Chapter[]>;
    retrieveById(bookId: Number): Promise<Chapter>;
    retrieveBySlug(slug: string): Promise<Chapter>;
    update(chapter: Chapter, slug: string): Promise<number>;
    delete(slug: string): Promise<Number>;
    deleteAll(): Promise<number>;
}