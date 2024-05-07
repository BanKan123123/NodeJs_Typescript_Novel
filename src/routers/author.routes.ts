import { Router } from "express";
import AuthorController from "../controller/author.controller";

class AuthorRouter {

    router = Router();
    controller = new AuthorController();

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

export default new AuthorRouter().router;