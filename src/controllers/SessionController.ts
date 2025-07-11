import { Request, Response } from "express";
import SessionRequest from "../request/SessionRequest";
import SessionInterface from "../interfaces/SessionInterface";
import SessionModel from "../models/mongoDB/SessionModel";


class SessionController {

    static async create(req: Request, res: Response): Promise<void> {
        const sessionValidate = SessionRequest.validate(req.body);
        if (sessionValidate.success) {
            const newSession = sessionValidate.data as SessionInterface;
            if(await SessionModel.exists(newSession.idUser)) {
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

}

export default SessionController;