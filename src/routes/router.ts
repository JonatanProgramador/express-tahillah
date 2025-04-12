import { Application, Request, Response } from "express";
import PraiseRouter from "./praiseRouter";
import PruebaRouter from "./pruebaRouter";

class Router {

    static getRoutes(app: Application): void {
        app.use('/prueba', PruebaRouter.getRoutes());
        app.use('/praise', PraiseRouter.getRoutes());
        app.use('**', (req: Request, res: Response) => { res.status(404).send("Pagina no encontrada") });
    }
    
}

export default Router;