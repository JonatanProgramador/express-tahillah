import { Router } from "express";
import SessionController from "../controllers/SessionController";


class SessionRouter {

     static getRoutes():Router {
        const router = Router();
    
        router.post('/', SessionController.create);
      
        return router;
    }

}

export default SessionRouter;