import { Router } from "express";
import PraiseController from "../controllers/praiseController";

class PraiseRouter {

    static getRoutes():Router {
        const router = Router();
    
        router.get('/', PraiseController.getAll);
        router.get('/:id', PraiseController.getById);
        router.post('/', PraiseController.create);
        router.patch('/:id', PraiseController.update);
        router.delete('/:id',PraiseController.delete);
    
        return router;
    }

}

export default PraiseRouter;