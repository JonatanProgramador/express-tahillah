import { Application, Request, Response } from "express";
import PraiseRouter from "./praiseRouter";

class Router {

    static getRoutes(app: Application): void {
        app.use('/praise', PraiseRouter.getRoutes());
        app.use('**', (req: Request, res: Response) => { res.status(404).send("Pagina no encontrada") });
    }
    
}

export default Router;