import { Application, NextFunction, Request, Response } from "express";
import Middleware from "./Middleware";


class CheckIdMiddle extends Middleware {


    constructor(app: Application) {
        super([
            { url: '/praise/:id', method: 'get' },
            { url: '/praise/:id', method: 'patch' },
            { url: '/praise/:id', method: 'delete' },
        ]);

        this.addMiddleware(app, this.checkId);
    }

    private checkId(req: Request, res: Response, next: NextFunction): void {
        const isNumber: boolean = Number.isInteger(Number.parseInt(req.params.id));
        if (isNumber) {
            next();
        } else {
            res.status(400).send("Se ha pasado un ID erroneo");  //TODO. Cambiar por un view
        }
    }


}

export default CheckIdMiddle