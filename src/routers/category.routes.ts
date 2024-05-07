import { Router } from "express";
import CategoryController from "../controller/category.controller";

class CategoryRouter {

    router = Router();
    controller = new CategoryController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {

        this.router.post("/", this.controller.create);

        this.router.get("/", this.controller.findAll);

        this.router.put("/:slug", this.controller.update);

        this.router.delete("/:slug", this.controller.delete);

        this.router.delete("/", this.controller.deleteAll);
    }

}

export default new CategoryRouter().router;