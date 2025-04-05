import { Request, Response } from "express";
import PraiseModelJson from "../models/praiseModelJson";
import PraiseRequest from "../request/praiseRequest";
import PraiseInterface from "../interfaces/praiseInterface";

class PraiseController {

    static async  getAll(req: Request, res: Response): Promise<void> {
        const rows = await PraiseModelJson.getAll();
        res.json(rows);
    }

     static async getById(req: Request, res: Response): Promise<void> {
        const id = Number.parseInt(req.params.id);
        const row = await PraiseModelJson.getById(id);
        res.json(row);
    }

    static async create(req: Request, res: Response): Promise<void> {
        const praiseValidate = PraiseRequest.validate(req.body);
        if (praiseValidate.success) {
            const praise = await PraiseModelJson.createRow(praiseValidate.data as PraiseInterface);
            res.send(praise ? "Alabanza creada" : "No se a podido crear la alabanza");
        } else {
            res.status(400).send("datos invalidos");
        }

    }

    static async delete(req: Request, res: Response): Promise<void> {
        const id = Number.parseInt(req.params.id);
        const rowDelete = await PraiseModelJson.deleteRow(id);
        if (rowDelete) {
            res.send("Se ha eliminado la alabanza");
        } else {
            res.status(400).send("No se a podido eliminar la alabanza");
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        const id = Number.parseInt(req.params.id);
        const validateRow = PraiseRequest.validatePartial(req.body);
        if(validateRow.success) {
            const updateRow = await PraiseModelJson.updateRow(validateRow.data as PraiseInterface, id);
            res.send(updateRow ? "Alabanza se ha actualizado" : "No se ha podido actualizar");
        } else {
            res.status(400).send("datos invalidos");
        }
    }

     

}

export default PraiseController;