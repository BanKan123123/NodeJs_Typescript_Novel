import { Router } from "express";
import BookController from "../controller/book.controller";

class BooksRoutes {
    router = Router();
    controller = new BookController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        this.router.post("/", this.controller.create);

        this.router.get("/", this.controller.findAll);

        this.router.put("/:slug", this.controller.update);

        this.router.delete("/:slug", this.controller.delete);

        this.router.delete("/", this.controller.deleteAll);
    }
}

export default new BooksRoutes().router;