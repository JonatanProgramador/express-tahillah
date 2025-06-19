import { Application, NextFunction, Request, Response } from "express";
import Middleware from "./Middleware";
import Routers from "../routes/Routers";
import jwt from "jsonwebtoken";


class SecurityLevelsMiddle extends Middleware {

    constructor(app: Application) {
        super([
            { url: '**', method: 'get' },
            { url: '**', method: 'patch' },
            { url: '**', method: 'delete' },
            { url: '**', method: 'post' },
        ]);

        this.addMiddleware(app, this.checkLevels);

    }

    private checkLevels(req: Request, res: Response, next: NextFunction): void {
 
        //recuperamos el rol del token
        const cookie = req.cookies.token;

        let token = "";
        if (cookie) {
            try {
                const data = jwt.verify(cookie, process.env.KEY_JWT ?? "") as { _doc: { rol: string } };
                token = data._doc.rol;
            } catch (error) { }
        }


        // recuperamos el nivel de seguridad de ese rol
         let levelUser = 0;
        switch (token) {
            case "admin":
                levelUser = 3;
                break;
            case "leader":
                levelUser = 2;
                break;
            case "user":
                levelUser = 1;
                break;
            default:
                levelUser = 0;
                break;

        }

        //recuperamos el nivel de seguridad de la ruta
          let route = Routers.find((value) => req.path.toLocaleLowerCase() === value.url.toLocaleLowerCase());
        if (route === undefined) {
            const id = req.path.split("/").pop();
            Routers.forEach((value) => {
                route = value.url.replace(":id", "" + id).toLocaleLowerCase() === req.path.toLocaleLowerCase() && req.method.toLocaleLowerCase() === value.method.toLocaleLowerCase() ? value : route;
            });
        }
        const levelRoute = route?route.securityLevel:0;

        //comprobamos si tiene suficiente nivel para poder acceder a la ruta
        levelUser >= levelRoute?next():res.status(401).send("No tienes permisos");
    }

}

export default SecurityLevelsMiddle;