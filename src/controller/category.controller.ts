import { Request, Response } from "express";
import categoryRepositoty from "../data/implements/category.implement";
import Category from "../models/category.model";
import categoryRepository from '../data/implements/category.implement';
import paginationAPI from "../utils/pagination.utils";

export default class CategoryController {

    async findAll(req: Request, res: Response) {

        const title = typeof req.query.title === "string" ? req.query.title : "";
        const page: string = typeof req.query.page === 'string' ? req.query.page : "";
        const limit: string = typeof req.query.limit === 'string' ? req.query.limit : "";

        try {
            const categories = await categoryRepositoty.retrieveAll({ title: title });
            const dataPagination = paginationAPI(Number.parseInt(page), Number.parseInt(limit), categories);

            res.status(200).send({
                status: 200,
                message: "Retrieveing all categories success.",
                data: dataPagination
            })

        } catch (err) {
            res.status(500).send({
                status: 500,
                message: "Some error occurred while retrieving categories"
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
            const category: Category = req.body;
            const savedCategory = await categoryRepository.save(category);
            res.status(201).send({
                status: 201,
                message: "Created category successfully.",
                data: savedCategory
            })
        } catch (err) {
            res.status(500).send({ status: 500, message: "Some error occurred while creating category." });
        }
    }

    async update(req: Request, res: Response) {
        let category: Category = req.body;
        let slug = req.params.slug;

        try {
            const num = await categoryRepository.update(category, slug);

            if (num === 1) {
                res.status(200).send({ status: 200, message: "Category updated successfully." });
            } else {
                res.status(400).send({
                    status: 400,
                    message: `Can't update category with slug = ${slug}. May be was not found of req.body is empty`
                });
            }
        } catch (err) {
            res.status(500).send({ status: 500, message: "Error updating category" });
        }
    }

    async delete(req: Request, res: Response) {
        let slug = req.params.slug;
        try {
            const num = await categoryRepository.delete(slug);

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
            const num = await categoryRepository.deleteAll();
            res.status(200).send({ status: 200, message: ` ${num} All categories was deleted successfully.` });
        } catch (err) {
            res.status(500).send({ status: 500, message: err });
        }
    }
}