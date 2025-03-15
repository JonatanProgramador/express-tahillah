import { Router, Request, Response } from "express";

class PraiseRouter {

    static getRoutes():Router {
        const router = Router();
    
        router.get('/',(req:Request, res:Response)=>{res.send("Recuperando todas las alabanzas")});
        router.get('/:id',(req:Request, res:Response)=>{res.send("Recuperando una alabanza")});
        router.post('/',(req:Request, res:Response)=>{res.send("Creando una alabanza")});
        router.patch('/:id',(req:Request, res:Response)=>{res.send("Actualizando parcialmente una alabanza")});
        router.delete('/:id',(req:Request, res:Response)=>{res.send("Eliminando una alabanza")});
    
        return router;
    }

}

export default PraiseRouter;