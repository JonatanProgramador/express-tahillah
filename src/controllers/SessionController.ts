import { Request, Response } from "express";
import SessionRequest from "../request/SessionRequest";
import SessionInterface from "../interfaces/SessionInterface";
import SessionModel from "../models/mongoDB/SessionModel";


class SessionController {
    static async create(req: Request, res: Response): Promise<void> {
        const sessionValidate = SessionRequest.validate(req.body);
        if (sessionValidate.success) {
            const newSession = sessionValidate.data as SessionInterface;
                const result = await SessionModel.createRow(newSession);
                result ? res.status(201).send("Se ha creado la sesión") : res.status(500).send("Error al crear el usuario");
        } else {
            res.status(400).send("Error al pasar los datos");
        }
    }

}

export default SessionController;