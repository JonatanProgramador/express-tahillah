import { Application, Request, Response } from "express";
import PraiseRouter from "./PraiseRouter";
import UserRouter from "./UserRouter";

class Router {

    static getRoutes(app: Application): void {
        app.use("/", UserRouter.getRoutes());
        app.use('/praise', PraiseRouter.getRoutes());
        app.use('**', (req: Request, res: Response) => { res.status(404).send("Pagina no encontrada") });
    }
    
}

export default Router;