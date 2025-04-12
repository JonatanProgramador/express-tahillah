import { Request, Response } from "express";
import PraiseModel from "../models/mongoDB/praiseModel";


class PruebaController {

    static async getAll(req: Request, res: Response): Promise<void> {
        const praises = await PraiseModel.getAll();
        res.json(praises);
    }
}

export default PruebaController;