import Category from "../models/category.model";
import RowMapper from "./Row.interface";

export default class CategoryMapper implements RowMapper<Category> {
    async mapRow(rows: Category[]): Promise<Category[]> {
        const categories: any[] = [];

        for (let row of rows) {
            const category = {
                id: row.id,
                name: row.name,
                slug: row.slug,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
            }

            categories.push(category);
        }
        return categories;
    }
}