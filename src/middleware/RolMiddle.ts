import { Application, NextFunction, Request, Response } from "express";
import Middleware from "./Middleware";
import jwt from "jsonwebtoken";


class RolMiddle extends Middleware {

    constructor(app: Application) {
        super([
            { url: '/register', method: 'post' },
        ]);

        this.addMiddleware(app, this.checkRol);
    }

    private checkRol(req: Request, res: Response, next: NextFunction) {
        const cookie = req.cookies.token;
        if (cookie) {
            try {
                const data = jwt.verify(cookie, process.env.KEY_JWT??"") as { _doc: { rol: string } };
                if (data._doc.rol === "admin") {
                    next();
                } else {
                    res.status(401).send("No tienes permisos");
                }
            } catch (error) {
                res.status(401).send("error el token ");
            }
        } else {
            res.status(401).send("no hay token");
        }

    }

}

export default RolMiddle;