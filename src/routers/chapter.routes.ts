import { Router } from "express";
import ChapterController from "../controller/chapter.controller";

class ChapterRouter {

    router = Router();
    chapterController = new ChapterController();

    constructor() {
        this.initialize();
    }

    initialize() {

        this.router.post("/", this.chapterController.create);

        this.router.get("/", this.chapterController.findAll);

        this.router.put("/:slug", this.chapterController.update);

        this.router.delete("/:slug", this.chapterController.delete);

        this.router.delete("/", this.chapterController.deleteAll);
    }
}

export default new ChapterRouter().router;