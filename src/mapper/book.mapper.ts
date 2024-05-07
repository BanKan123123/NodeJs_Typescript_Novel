import Book from "../models/book.model";
import RowMapper from "./Row.interface";
import connection from "../config/database/server.connection";
import Category from "../models/category.model";
import Author from "../models/author.model";

export default class BookMapper implements RowMapper<Book> {

    getCategory(bookId: number | undefined): Promise<Category[]> {

        const query = `SELECT category.id, category.name, category.slug, category.created_at, category.updated_at FROM book, category, categoriesonbook WHERE book.id = categoriesonbook.bookId AND category.id = categoriesonbook.categoryId AND book.id = ${bookId}`;

        return new Promise((resolve, reject) => {
            connection.query<Category[]>(query, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    }

    getAuthor(authorId: number): Promise<Author[]> {
        const query = `SELECT * FROM author WHERE id = ${authorId}`;
        return new Promise((resolve, reject) => {
            connection.query<Author[]>(query, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    }


    async mapRow(rows: Book[]): Promise<Book[]> {
        const nestedBook: any[] = [];

        for (let row of rows) {
            const author = await this.getAuthor(row.authorId);
            const categoriesOnBook = await this.getCategory(row?.id);

            const book = {
                id: row.id,
                title: row.title,
                slug: row.slug,
                description: row.description,
                imageThumbnail: row.imageThumbnail,
                rate: row.rate,
                views: row.views,
                realView: row.realView,
                liked: row.liked,
                disabled: row.disabled,
                hiddenAds: row.hiddenAds,
                status: row.status,
                author: author,
                categories: categoriesOnBook,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
            }
            nestedBook.push(book);
        }
        return nestedBook;
    }

}