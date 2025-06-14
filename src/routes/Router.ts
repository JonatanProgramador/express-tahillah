import { Application, Request, Response } from "express";
import PraiseRouter from "./PraiseRouter";
import UserRouter from "./UserRouter";
import SessionRouter from "./SessionRouter";

class Router {

    static getRoutes(app: Application): void {
        app.use("/", UserRouter.getRoutes());
        app.use('/praise', PraiseRouter.getRoutes());
        app.use('/session', SessionRouter.getRoutes());
        app.use('**', (req: Request, res: Response) => { res.status(404).send("Pagina no encontrada") });
    }
    
}

export default Router;