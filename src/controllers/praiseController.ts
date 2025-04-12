import { Request, Response } from "express";
import PraiseRequest from "../request/praiseRequest";
import PraiseInterface from "../interfaces/praiseInterface";
import PraiseModel from "../models/mongoDB/praiseModel";

class PraiseController {

    static async  getAll(req: Request, res: Response): Promise<void> {
        const rows = await PraiseModel.getAll();
        res.json(rows);
    }

     static async getById(req: Request, res: Response): Promise<void> {
        const row = await PraiseModel.getById(req.params.id);
        res.json(row);
    }

    static async create(req: Request, res: Response): Promise<void> {
        const praiseValidate = PraiseRequest.validate(req.body);
        if (praiseValidate.success) {
            const praise = await PraiseModel.createRow(praiseValidate.data as PraiseInterface);
            res.send(praise ? "Alabanza creada" : "No se a podido crear la alabanza");
        } else {
            res.status(400).send("datos invalidos");
        }

    }

    static async delete(req: Request, res: Response): Promise<void> {
        const rowDelete = await PraiseModel.deleteRow(req.params.id);
        if (rowDelete) {
            res.send("Se ha eliminado la alabanza");
        } else {
            res.status(400).send("No se a podido eliminar la alabanza");
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        const validateRow = PraiseRequest.validatePartial(req.body);
        if(validateRow.success) {
            const updateRow = await PraiseModel.updateRow(validateRow.data as PraiseInterface, req.params.id);
            res.send(updateRow ? "Alabanza se ha actualizado" : "No se ha podido actualizar");
        } else {
            res.status(400).send("datos invalidos");
        }
    }

     

}

export default PraiseController;