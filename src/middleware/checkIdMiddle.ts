import { Application, NextFunction, Request, Response } from "express";

interface RouteMiddlInterface {url:string, method:string};

class CheckIdMiddle {

    private static readonly routes:RouteMiddlInterface[] = [
        {url:'/praise/:id', method:'get'},
        {url:'/praise/:id', method:'patch'},
        {url:'/praise/:id', method:'delete'},
    ];

    static addMiddleware(app:Application):void {
        for(let i = 0; i<this.routes.length; ++i) {
          switch(this.routes[i].method) {
            case 'get':
                app.get(this.routes[i].url, this.checkId);
                break;
            case 'post':
                app.post(this.routes[i].url, this.checkId);
                break;
            case 'patch':
                app.patch(this.routes[i].url, this.checkId);
                break;
            case 'delete':
                app.delete(this.routes[i].url, this.checkId);
                break;
          }
        }
    }

    private static checkId(req:Request, res:Response, next:NextFunction):void {
        const isNumber:boolean = Number.isInteger(Number.parseInt(req.params.id));
        if(isNumber) {
            next();
        } else {
            res.status(400).send("Se ha pasado un ID erroneo");  //TODO. Cambiar por un view
        }
    }

}

export default CheckIdMiddle