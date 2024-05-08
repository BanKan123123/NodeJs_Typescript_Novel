import Chapter from "../models/chapter.model";
import RowMapper from "./Row.interface";
import AbstractRepository from "../data/implements/abstract.implement";
import BookMapper from "./book.mapper";

export default class ChapterMapper implements RowMapper<Chapter> {

    getBook(bookId: number | undefined): Promise<any[]> {
        const query = `SELECT * FROM book WHERE id = ?`;
        return new AbstractRepository().queryOne(query, new BookMapper(), bookId!);
    }

    async mapRow(rows: Chapter[]): Promise<Chapter[]> {

        const chapters: any = [];
        for (let row of rows) {
            const book = await this.getBook(row.book?.id);

            const chapter = {
                id: row.id,
                title: row.title,
                slug: row.slug,
                data: row.data,
                book: book,
                chapterIndex: row.chapterIndex,
                audioUrl: row.audioUrl,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
                hiddenAds: row.hiddenAds,
                summary: row.summary,
            }

            chapters.push(chapter);
        }

        return chapters;
    }

}