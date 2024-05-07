import Author from "../models/author.model";
import RowMapper from "./Row.interface";

export default class AuthorMapper implements RowMapper<Author> {
    async mapRow(rows: Author[]): Promise<Author[]> {
        const authors: any[] = [];

        for (let row of rows) {
            const author = {
                id: row.id,
                name: row.name,
                slug: row.slug,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
            }

            authors.push(author);
        }

        return authors;
    }
} 