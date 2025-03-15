import { Request, Response } from "express";

class PraiseController {

    static getAll(req:Request, res:Response):void {
        res.send("Recuperando todas las alabanzas");
    }

    static getById(req:Request, res:Response):void {
        const id = req.params.id;
        res.send("Recuperando la alabanza con id "+id);
    }

    static create(req:Request, res:Response):void {
        res.send("Creando una alabanza");
    }

    static update(req:Request, res:Response):void {
        const id = req.params.id;
        res.send("Actualizando parcialmente la alabanza con id "+id);
    }

    static delete(req:Request, res:Response):void {
        const id = req.params.id;
        res.send("Eliminando la alabanza con la id ")+id;
    }

}

export default PraiseController;