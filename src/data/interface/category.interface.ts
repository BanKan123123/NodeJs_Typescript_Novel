import Category from "../../models/category.model";

export default interface ICategoryRepository {
    save(category: Category): Promise<Category>;
    retrieveAll(searchParams: { title: string }): Promise<Category[]>;
    retrieveById(id: number): Promise<Category>;
    retrieveBySlug(slug: string): Promise<Category>;
    update(category: Category, slug: string): Promise<number>;
    delete(slug: string): Promise<number>;
    deleteAll(): Promise<number>;
}