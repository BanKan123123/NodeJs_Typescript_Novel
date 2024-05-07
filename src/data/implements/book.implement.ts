import Book from "../../models/book.model";
import IBookRepository from "../interface/book.interface";
import connection from '../../config/database/server.connection';
import { OkPacket } from "mysql2";
import BookMapper from "../../mapper/book.mapper";
import Category from "../../models/category.model";
import AbstractRepository from "./abstract.implement";

class BookRepository extends AbstractRepository<Book> implements IBookRepository {

    save(book: Book): Promise<Book> {
        const query = "INSERT INTO book (title, slug, description, imageThumbnail, rate, view, liked, disable, hiddenAds, status, authorId) VALUES (? , ? , ? , ? , ? , ? , ?, ? , ?, ? , ?)";
        const params = [book.title, book.slug, book.description, book.imageThumbnail, book.rate, book.view, book.liked, book.disable, book.hiddenAds, book.status, book.authorId];

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [...params], (err, res) => {
                if (err) reject(err)
                else {
                    this.retrieveById(res.insertId)
                        .then(book => resolve(book!))
                        .catch(reject);
                }
            })
        })
    }

    generateQuery(searchParams: { title: string }): string {
        let query: string = `SELECT * FROM book`;

        if (searchParams?.title) {
            query += ` WHERE LOWER(book.title) LIKE '%${searchParams.title}%'`;
        }

        return query;
    }

    retrieveAll(searchParams: { title: string; }): Promise<any[]> {
        const query = this.generateQuery(searchParams);
        return new AbstractRepository().query(query, new BookMapper());
    }

    retrieveBySlug(slug: string): Promise<Book | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<Book[]>(
                'SELECT * FROM book WHERE slug = ?',
                [slug],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        resolve(res?.[0]);
                    }
                }
            );
        });
    }

    retrieveById(bookId: number): Promise<Book | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<Book[]>(
                'SELECT * FROM book WHERE id = ?',
                [bookId],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        resolve(res?.[0]);
                    }
                }
            );
        });
    }
    updateBook(book: Book, slug: string): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                'UPDATE book SET title = ?, slug = ?, description = ?, imageThumbnail = ?, rate = ?, view = ?, liked = ?, disable = ?, hiddenAds = ?, status = ?, authorId = ? WHERE slug = ?',
                [book.title, book.slug, book.description, book.imageThumbnail, book.rate, book.view, book.liked, book.disable, book.hiddenAds, book.status, book.authorId, slug],
                async (err, res) => {
                    if (err) reject(err);
                    else {
                        const bookRes: Book | undefined = await this.retrieveBySlug(book.slug!);
                        if (bookRes) {
                            this.deleteCategory(bookRes?.id!);
                            this.saveCategory(book.categories, bookRes?.id!);
                            resolve(res.affectedRows);
                        } else {
                            resolve(0);
                        }
                    };
                }
            );
        });
    }

    saveCategory(categories: Category[], bookId: number) {
        const query = "INSERT INTO categoriesonbook (categoryId, bookId) VALUES (? , ?)";
        categories.forEach(category => new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [category?.id, bookId!], (err, res) => {
                if (err) reject(err);
                else resolve(res.insertId);
            })
        }))
    }

    deleteCategory(bookId: number): Promise<number> {
        const query = "DELETE FROM categoriesonbook WHERE bookId = ?";
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [bookId], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            });
        });
    }

    deleteAllCategory(): Promise<number> {
        const query = "DELETE FROM categoriesonbook";
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            });
        });
    }

    delete(slugBook: string): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "DELETE FROM book WHERE slug = ?",
                [slugBook],
                async (err, res) => {
                    if (err) reject(err);
                    else {
                        const bookRes: Book | undefined = await this.retrieveBySlug(slugBook);
                        if (bookRes) {
                            this.deleteCategory(bookRes?.id!);
                            resolve(res.affectedRows);
                        } else {
                            resolve(0);
                        }
                    };
                }
            );
        });
    }
    deleteAll(): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "DELETE FROM book",
                async (err, res) => {
                    if (err) reject(err);
                    else {
                        if (await this.deleteAllCategory()) {
                            resolve(res.affectedRows)
                        } else {
                            resolve(0);
                        }
                    };
                }
            );
        });
    }
}

export default new BookRepository();