import { Router } from "express";
import UserController from "../controllers/UserController";


class UserRouter {

    static getRoutes():Router {
        const router = Router();
    
        router.post('/register', UserController.create);
        router.get('/login', UserController.login);
        router.get('/isLogin', UserController.isLogin);
        router.get('/logout', UserController.logout);
    
        return router;
    }

}

export default UserRouter;