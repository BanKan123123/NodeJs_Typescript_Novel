import ChapterMapper from "../../mapper/chapter.mapper";
import Chapter from "../../models/chapter.model";
import IChapterRepository from "../interface/chapter.interface";
import AbstractRepository from "./abstract.implement";

class ChapterRepository implements IChapterRepository {
    save(chapter: Chapter): Promise<Chapter> {
        throw new Error("Method not implemented.");
    }

    generateQuery(searchParams: { title: string }): string {
        let query: string = `SELECT * FROM chapter`;
        if (searchParams?.title) {
            query += ` WHERE LOWER(chapter.title) LIKE '%${searchParams.title}%'`;
        }
        return query;
    }

    retrieveAll(searchParams: { title: string; }): Promise<Chapter[]> {
        const query = this.generateQuery(searchParams);
        return new AbstractRepository().query(query, new ChapterMapper());
    }
    retrieveById(bookId: Number): Promise<Chapter> {
        throw new Error("Method not implemented.");
    }
    retrieveBySlug(slug: string): Promise<Chapter> {
        throw new Error("Method not implemented.");
    }
    update(chapter: Chapter, slug: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(slug: string): Promise<Number> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

export default new ChapterRepository();