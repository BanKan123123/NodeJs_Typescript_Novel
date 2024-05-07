import Author from "../../models/author.model";
import connection from '../../config/database/server.connection';
import IAuthorRepository from "../interface/author.interface";
import { OkPacket } from "mysql2";
import AbstractRepository from "./abstract.implement";
import AuthorMapper from "../../mapper/author.mapper";

class AuthorRepository implements IAuthorRepository {

    retrieveBySlug(slug: string): Promise<Author> {
        const query = "SELECT * FROM author WHERE slug = ?";
        return new Promise((resolve, reject) => {
            connection.query<Author[]>(query, [slug], (err, res) => {
                if (err) reject(err);
                else resolve(res?.[0]);
            })
        })
    }

    save(author: Author): Promise<Author> {
        const query = "INSERT INTO author (name, slug) VALUES (? , ?)";
        const params = [author.name, author.slug];

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, params, (err, res) => {
                if (err) reject(err);
                else {
                    this.retrieveById(res.insertId)
                        .then(author => resolve(author))
                        .catch(reject);
                }
            })
        })
    }

    retrieveAll(searchParams: { title: string; }): Promise<Author[]> {
        let query = "SELECT * FROM author";
        if (searchParams?.title) {
            query += ` WHERE LOWER(author.name) LIKE '%${searchParams.title}%'`;
        }
        return new AbstractRepository().query(query, new AuthorMapper());
    }

    retrieveById(authorId: number): Promise<Author> {
        const query = "SELECT * FROM author WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection.query<Author[]>(query, [authorId], (err, res) => {
                if (err) reject(err);
                else resolve(res?.[0]);
            })
        })
    }

    update(author: Author, slug: string): Promise<number> {
        const query = "UPDATE author SET name = ?, slug = ? WHERE slug = ?";

        const params = [author.name, author.slug, slug];

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [...params], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }

    delete(slug: string): Promise<number> {
        let query = "DELETE FROM author WHERE slug = ?";
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [slug], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }

    deleteAll(): Promise<number> {
        let query = "DELETE FROM author";

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }

}

export default new AuthorRepository();