import ChapterMapper from "../../mapper/chapter.mapper";
import Chapter from "../../models/chapter.model";
import IChapterRepository from "../interface/chapter.interface";
import AbstractRepository from "./abstract.implement";
import connection from '../../config/database/server.connection';
import { OkPacket } from "mysql2";

class ChapterRepository implements IChapterRepository {
    save(chapter: Chapter): Promise<Chapter> {
        const query = "INSERT INTO chapter (title, slug, data, bookId, chapterIndex, audioUrl) VALUES (? , ? , ? , ?, ? , ?)";
        const params = [chapter.title, chapter.slug, chapter.data, chapter.book?.id, chapter.chapterIndex, chapter.audioUrl];

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [...params], (err, res) => {
                if (err) reject(err);
                else {
                    this.retrieveById(res.insertId)
                        .then(chapter => resolve(chapter))
                        .catch(reject);
                };
            });
        });
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
    retrieveById(id: Number): Promise<Chapter> {
        const query = "SELECT * FROM chapter WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection.query<Chapter[]>(
                query,
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        resolve(res?.[0]);
                    }
                }
            );
        });
    }
    retrieveBySlug(slug: string): Promise<Chapter> {
        const query = "SELECT * FROM chapter WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection.query<Chapter[]>(query, [slug], (err, res) => {
                if (err) reject(err);
                else {
                    resolve(res?.[0]);
                }
            }
            );
        });
    }

    update(chapter: Chapter, slug: string): Promise<number> {
        const query = "UPDATE chapter SET title = ?, slug = ?, data = ?, bookId = ?, chapterIndex = ?, audioUrl = ? WHERE slug = ?";
        const params = [chapter.title, chapter.slug, chapter.data, chapter.book?.id, chapter.chapterIndex, chapter.audioUrl, slug];

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [...params], (err, res) => {
                if (err) reject(err)
                else resolve(res.affectedRows);
            });
        });
    }

    delete(slug: string): Promise<Number> {
        let query = "DELETE FROM chapter WHERE slug = ?";
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [slug], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }

    deleteAll(): Promise<number> {
        let query = "DELETE FROM chapter";
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }
}

export default new ChapterRepository();