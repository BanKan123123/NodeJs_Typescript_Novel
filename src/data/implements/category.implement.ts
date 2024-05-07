import CategoryMapper from "../../mapper/category.mapper";
import Category from "../../models/category.model";
import ICategoryRepository from "../interface/category.interface";
import AbstractRepository from "./abstract.implement";
import connection from '../../config/database/server.connection';
import { OkPacket, OkPacketParams } from "mysql2";

class CategoryRepository implements ICategoryRepository {
    save(category: Category): Promise<Category> {
        const query: string = "INSERT INTO category (name, slug) VALUE(?, ?)";
        const params = [category.name, category.slug];

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [...params], (err, res) => {
                if (err) reject(err);
                else {
                    this.retrieveById(res.insertId)
                        .then(category => resolve(category!))
                        .catch(err => reject(err));
                }
            })
        })
    }

    generateQuery(searchParams: { title: string }): string {
        let query: string = "SELECT * FROM category";
        if (searchParams?.title) {
            query += ` WHERE LOWER(category.name) LIKE '%${searchParams.title}%'`;
        }
        return query;
    }

    retrieveAll(searchParams: { title: string; }): Promise<Category[]> {
        const query = this.generateQuery(searchParams);
        return new AbstractRepository().query(query, new CategoryMapper());
    }

    retrieveById(id: number): Promise<Category> {
        let query = "SELECT * FROM category WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection.query<Category[]>(query, [id], (err, res) => {
                if (err) reject(err)
                else resolve(res?.[0])
            })
        })
    }

    retrieveBySlug(slug: string): Promise<Category> {
        let query = "SELECT * FROM category WHERE slug = ?";
        return new Promise((resolve, reject) => {
            connection.query<Category[]>(query, [slug], (err, res) => {
                if (err) reject(err)
                else resolve(res?.[0])
            })
        })
    }

    update(category: Category, slug: string): Promise<number> {
        let query = "UPDATE category SET name = ?, slug = ? WHERE slug = ?";
        const params = [category.name, category.slug, slug];

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [...params], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }

    delete(slug: string): Promise<number> {
        let query = "DELETE FROM category WHERE slug = ?";
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, [slug], (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }

    deleteAll(): Promise<number> {
        let query = "DELETE FROM category";

        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(query, (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            })
        })
    }
}

export default new CategoryRepository();