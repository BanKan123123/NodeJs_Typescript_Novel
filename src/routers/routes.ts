import { Application } from 'express';
import booksRoutes from './books.routes';
import authorRouters from './author.routes';
import categoryRoutes from './category.routes';
import chapterRoutes from './chapter.routes';

export default class Routes {
    constructor(app: Application) {
        app.use("/api/books", booksRoutes);
        app.use("/api/category", categoryRoutes);
        app.use("/api/author", authorRouters);
        app.use("/api/chapter", chapterRoutes);
    }
}