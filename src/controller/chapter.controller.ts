import {Response, Request} from 'express';
import chapterRepository from '../data/implements/chapter.implement';
import paginationAPI from '../utils/pagination.utils';


export default class ChapterController {

    async findAll(req: Request, res: Response) {
        const title = typeof req.query.title === "string" ? req.query.title : "";
        const page: string = typeof req.query.page === 'string' ? req.query.page : "";
        const limit: string = typeof req.query.limit === 'string' ? req.query.limit : "";
        try {
            const chapters = await chapterRepository.retrieveAll({title});
            const dataPagination = paginationAPI(Number.parseInt(page), Number.parseInt(limit), chapters);

            res.status(200).send({
                status: 200,
                message: "Retrieving all data chapter successfully",
                data: dataPagination,
            })
        } catch (err) {
            res.status(500).send({status: 500, message: "Error: " + err});
        }
    }
}