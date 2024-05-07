import { Router } from "express";
import ChapterController from "../controller/chapter.controller";

class ChapterRouter {

    router = Router();
    chapterController = new ChapterController();

    constructor() {
        this.initialize();
    }

    initialize() {

        this.router.get("/", this.chapterController.findAll);

        // this.router.post("/", this.controller.create);

        // this.router.get("/", this.controller.findAll);

        // this.router.put("/:slug", this.controller.update);

        // this.router.delete("/:slug", this.controller.delete);

        // this.router.delete("/", this.controller.deleteAll);
    }
}

export default new ChapterRouter().router;