import { Router } from "express";
import PruebaController from "../controllers/pruebaController";

class PruebaRouter {

    static getRoutes():Router {
        const router = Router();
    
        router.get('/', PruebaController.getAll);
    
        return router;
    }

}

export default PruebaRouter;