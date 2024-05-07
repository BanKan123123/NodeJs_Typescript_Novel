import { Request, Response } from "express";
import booksRepository from "../data/implements/book.implement";
import Book from "../models/book.model";
import paginationAPI from "../utils/pagination.utils";

export default class BookController {

    //[GET /book]

    async findAll(req: Request, res: Response) {
        const title = typeof req.query.title === "string" ? req.query.title : "";
        const page: string = typeof req.query.page === 'string' ? req.query.page : "";
        const limit: string = typeof req.query.limit === 'string' ? req.query.limit : "";

        try {
            const books = await booksRepository.retrieveAll({ title: title });
            const dataPagination = paginationAPI(Number.parseInt(page), Number.parseInt(limit), books);

            res.status(200).send({
                status: "200",
                message: "Retrieving all books success.",
                data: dataPagination
            })
        } catch (err) {
            res.status(500).send({
                status: 500,
                message: "Some error occurred while retrieving books."
            })
        }
    }

    async create(req: Request, res: Response) {
        if (!req.body.title || !req.body.description || !req.body.authorId || !req.body.imageThumbnail || !req.body.rate || !req.body.liked || !req.body.view) {
            res.status(400).send({
                status: 400,
                message: "Content can not be empty!"
            });
            return;
        }
        try {
            const book: Book = req.body;
            const savedBook = await booksRepository.save(book);
            // res.status(200).send({
            //     idinserted: savedBook,
            // })
            booksRepository.saveCategory(book.categories, savedBook.id!);

            res.status(201).send({
                status: 201,
                message: "Created book successfully.",
                data: savedBook
            })
        } catch (err) {
            res.send({ status: 500, message: "Some error occurred while creating book." });
        }
    }

    async update(req: Request, res: Response) {
        let book: Book = req.body;
        let slug = req.params.slug;
        try {
            const num = await booksRepository.updateBook(book, slug);
            if (num) {
                res.status(200).send({ status: 200, message: "Book was updated successfully.", data: num });
            } else {
                res.status(400).send({
                    status: 400,
                    message: `Can't update book with slug = ${slug}. May be was not found of req.body is empty!`
                });
            }
        } catch (err) {
            res.status(500).send({ status: 500, message: `Error updating book with slug = ${slug}` });
        }
    }

    async delete(req: Request, res: Response) {
        let slug = req.params.slug;
        try {
            const num = await booksRepository.delete(slug);

            if (num === 1) {
                res.status(200).send({ status: 200, message: "Book was deleted successfully.", data: num });
            } else {
                res.status(400).send({
                    status: 400,
                    message: `Can't delete book with slug = ${slug}. May be was not found!`
                });
            }

        } catch (err) {
            res.status(500).send({ status: 500, message: `Error deleting book with slug = ${slug}.` });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await booksRepository.deleteAll();
            res.status(200).send({ status: 200, message: ` ${num} All Books was deleted successfully.` });

        } catch (err) {
            res.status(500).send({ status: 500, message: "Some error occurred while removing all books." });
        }
    }
}