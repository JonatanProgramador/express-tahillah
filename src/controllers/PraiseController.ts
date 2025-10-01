import { Request, Response } from "express";
import PraiseRequest from "../request/PraiseRequest";
import PraiseInterface from "../interfaces/PraiseInterface";
import PraiseModel from "../models/mongoDB/PraiseModel";
import SearchRequest from "../request/SearchRequest";

class PraiseController {

    static async getAll(req: Request, res: Response): Promise<void> {
        const rows = await PraiseModel.getAll();
        rows ? res.json(rows) : res.status(500).send("Error en el servidor");
    }

    static async getById(req: Request, res: Response): Promise<void> {
        const row = await PraiseModel.getById(req.params.id);
        switch (row) {
            case 404:
                res.status(404).send("No se ha encontrado resultados");
                break;
            case 500:
                res.status(500).send("Error en el servidor");
                break;
            default:
                res.json(row);
        };
    }

    static async create(req: Request, res: Response): Promise<void> {
        const praiseValidate = PraiseRequest.validate(req.body);
        if (praiseValidate.success) {
            const praise = await PraiseModel.createRow(praiseValidate.data as PraiseInterface);
            praise ? res.status(201).json(praise) : res.status(500).send("Error en el servidor");
        } else {
            res.status(400).send("datos invalidos");
        }

    }

    static async delete(req: Request, res: Response): Promise<void> {
        const rowDelete = await PraiseModel.deleteRow(req.params.id);
        switch (rowDelete) {
            case 200:
                res.send("Se ha eliminado la albanza");
                break;
            case 404:
                res.status(404).send("No se ha encontrado resultados");
                break;
            default:
                res.status(500).send("Error del servidor");
                break;
        }
    }

    static async update(req: Request, res: Response): Promise<void> {
        const validateRow = PraiseRequest.validatePartial(req.body);
        if (validateRow.success && Object.keys(validateRow.data).length !== 0) {
            const updateRow = await PraiseModel.updateRow(validateRow.data as PraiseInterface, req.params.id);
            switch (updateRow) {
                case 200:
                    res.send("Se ha actualizado la albanza");
                    break;
                case 404:
                    res.status(404).send("No se ha encontrado resultados");
                    break;
                default:
                    res.status(500).send("Error del servidor");
                    break;
            }
        } else {
            res.status(400).send("datos invalidos");
        }
    }

    static async search(req: Request, res: Response): Promise<void> {
        const validate = SearchRequest.validate(req.body);
        if (validate.success) {
            const praises = await PraiseModel.find(validate.data.key, validate.data.value, validate.data.precise);
            praises===null?res.status(500).send("Error en el servidor"):res.json(praises);
        } else {
            res.status(400).send("datos invalidos");
        }

    }



}

export default PraiseController;