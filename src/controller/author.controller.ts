import { Request, Response } from 'express';
import authorRepositoty from '../data/implements/author.implement';
import Author from '../models/author.model';
import authorRepository from '../data/implements/author.implement';
import paginationAPI from '../utils/pagination.utils';


export default class AuthorController {

    async findAll(req: Request, res: Response) {
        const title: string = typeof req.query.title === 'string' ? req.query.title : "";
        const page: string = typeof req.query.page === 'string' ? req.query.page : "";
        const limit: string = typeof req.query.limit === 'string' ? req.query.limit : "";

        try {
            const authors = await authorRepositoty.retrieveAll({ title: title });

            const dataPagination = paginationAPI(Number.parseInt(page), Number.parseInt(limit), authors);
            
            res.status(200).send({
                status: 200,
                message: "Retrieving all author sussessfully",
                datas: dataPagination
            });
        } catch (err) {
            res.status(500).send({
                status: 500,
                message: "Some error occurred while retrieving all authors"
            })
        }
    }

    async create(req: Request, res: Response) {
        if (!req.body.name || !req.body.slug) {
            res.status(400).send({
                status: 400,
                message: "Content can not be empty!"
            });
            return;
        }

        try {
            const author: Author = req.body;
            const savedCategory = await authorRepository.save(author);
            res.status(201).send({
                status: 201,
                message: "Created author successfully.",
                data: savedCategory
            })
        } catch (err) {
            res.status(500).send({ status: 500, message: "Some error occurred while creating author." });
        }
    }

    async update(req: Request, res: Response) {
        let author: Author = req.body;
        let slug = req.params.slug;

        try {
            const num = await authorRepository.update(author, slug);

            if (num === 1) {
                res.status(200).send({ status: 200, message: "Author updated successfully" })
            } else {
                res.status(400).send({
                    status: 400,
                    message: `Can't update author with slug = ${slug}. May be was not found of req.body is empty`
                })
            }
        } catch (err) {
            res.status(500).send({ status: 500, message: err });
        }
    }

    async delete(req: Request, res: Response) {
        let slug = req.params.slug;
        try {
            const num = await authorRepository.delete(slug);

            if (num === 1) {
                res.status(200).send({ status: 200, message: "Author was deleted successfully" });
            } else {
                res.status(400).send({
                    status: 400,
                    message: `Can't delete author with slug = ${slug}. May be slug was not found`,
                })
            }
        } catch (err) {
            res.status(500).send({ status: 500, message: err });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await authorRepository.deleteAll();
            res.status(200).send({ status: 200, message: ` ${num} All authors was deleted successfully.` });
        } catch (err) {
            res.status(500).send({ status: 500, message: err });
        }
    }
}