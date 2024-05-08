import { Response, Request } from 'express';
import paginationAPI from '../utils/pagination.utils';
import Chapter from '../models/chapter.model';
import chapterRepository from '../data/implements/chapter.implement';


export default class ChapterController {

    async findAll(req: Request, res: Response) {
        const title = typeof req.query.title === "string" ? req.query.title : "";
        const page: string = typeof req.query.page === 'string' ? req.query.page : "";
        const limit: string = typeof req.query.limit === 'string' ? req.query.limit : "";
        try {
            const chapters = await chapterRepository.retrieveAll({ title });

            if (!page || !limit) {
                res.status(200).send({
                    status: 200,
                    message: "Retrieving all data chapter successfully",
                    total: chapters.length,
                    data: chapters
                })
            } else {
                const dataPagination = paginationAPI(Number.parseInt(page), Number.parseInt(limit), chapters);

                res.status(200).send({
                    status: 200,
                    message: "Retrieving all data chapter successfully",
                    data: dataPagination,
                })
            }


        } catch (err) {
            res.status(500).send({ status: 500, message: "Error: " + err });
        }
    }

    async create(req: Request, res: Response) {
        if (!req.body.title || !req.body.slug || !req.body.data || !req.body.bookId || !req.body.chapterIndex || !req.body.audioUrl) {
            res.status(400).send({
                status: 400,
                message: "Content can not be empty!"
            });
            return;
        }

        try {
            const chapter: Chapter = req.body;
            const savedChapter = await chapterRepository.save(chapter);
            res.status(201).send({
                status: 201,
                message: "Created category successfully.",
                data: savedChapter
            })
        } catch (err) {
            res.status(500).send({ status: 500, message: "Some error occurred while creating chapter." });
        }
    }

    async update(req: Request, res: Response) {

        const chapter: Chapter = req.body;
        const slug = req.params.slug;

        try {
            const num = await chapterRepository.update(chapter, slug);

            if (num === 1) {
                res.status(200).send({ status: 200, message: "Chapter updated successfully." });
            } else {
                res.status(400).send({
                    status: 400,
                    message: `Can't update chapter with slug = ${slug}. May be was not found of req.body is empty`
                });
            }
        } catch (err) {
            res.status(500).send({ status: 500, message: "Error updating chapter" });
        }

    }

    async delete(req: Request, res: Response) {
        let slug = req.params.slug;
        try {
            const num = await chapterRepository.delete(slug);

            if (num === 1) {
                res.status(200).send({ status: 200, message: "Category was deleted successfully" });
            } else {
                res.status(400).send({
                    status: 400,
                    message: `Can't delete category with slug = ${slug}. May be slug was not found`,
                })
            }
        } catch (err) {
            res.status(500).send({ status: 500, message: err });
        }

    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await chapterRepository.deleteAll();
            res.status(200).send({ status: 200, message: ` ${num} All categories was deleted successfully.` });
        } catch (err) {
            res.status(500).send({ status: 500, message: err });
        }
    }
}