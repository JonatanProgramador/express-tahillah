import { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Middleware from "./Middleware";


class ProtectedMiddle extends Middleware {

    constructor(app: Application) {
        super([
            { url: '/praise', method: 'post' },
            { url: '/prueba', method: 'get' },
            { url: '/praise/:id', method: 'delete' },
            { url: '/praise/:id', method: 'patch' },
        ]);

        this.addMiddleware(app, this.checkToken);
    }


    private  checkToken(req: Request, res: Response, next: NextFunction): void {
        const cookie = req.cookies.token;
        if (cookie) {
            try {
                const data = jwt.verify(cookie, process.env.KEY_JWT??"");
                next();
            } catch (error) {
                res.status(401).send("error el token");
            }
        } else {
            res.status(401).send("no hay token");
        }

    }
}

export default ProtectedMiddle;