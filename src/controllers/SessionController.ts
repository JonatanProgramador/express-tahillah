import { Request, Response } from "express";
import SessionRequest from "../request/SessionRequest";
import SessionInterface from "../interfaces/SessionInterface";
import SessionModel from "../models/mongoDB/SessionModel";


class SessionController {

    static async create(req: Request, res: Response): Promise<void> {
        const sessionValidate = SessionRequest.validate(req.body);
        if (sessionValidate.success) {
            const newSession = sessionValidate.data as SessionInterface;
            if (!await SessionModel.exists(newSession.idUser)) {
                const result = await SessionModel.createRow(newSession);
                result ? res.status(201).send("Se ha creado la sesión") : res.status(500).send("Error al crear el usuario");
            } else {
                res.status(400).send("El usuario ya tiene una sesión creada");
            }
        } else {
            res.status(400).send("Error al pasar los datos");
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        const row = await SessionModel.getById(req.params.id);
        res.json(row);
    }

    static async searchByUser(req: Request, res: Response): Promise<void> {
        const row = await SessionModel.find("idUser", req.body.idUser, true);
        row.length > 0 ? res.json(row[0]) : res.status(404).send();
    }

    static async update(req: Request, res: Response): Promise<void> {
        const validateRow = SessionRequest.validate(req.body);
        if (validateRow.success) {
            if (await SessionModel.exists(validateRow.data.idUser)) {
                const idSession = await SessionModel.find("idUser", validateRow.data.idUser, true);
                const updateRow = await SessionModel.updateRow(validateRow.data as SessionInterface, idSession[0]._id);
                res.send(updateRow ? "Se ha actualizado" : "No se ha podido actualizar");
            } else {
                res.status(404).send("No se ha encontrado la sesión");
            }
        } else {
            res.status(400).send("datos invalidos");
        }
    }

}

export default SessionController;