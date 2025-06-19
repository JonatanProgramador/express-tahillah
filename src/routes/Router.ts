import { Application, Request, Response } from "express";
import Routers from "./Routers";

class Router {

    static getRoutes(app: Application): void {
        Routers.forEach((value) =>{
            switch (value.method) {
                case 'get':
                    app.get(value.url, value.callBack);
                    break;
                case 'post':
                    app.post(value.url, value.callBack);
                    break;
                case 'patch':
                    app.patch(value.url, value.callBack);
                    break;
                case 'delete':
                    app.delete(value.url, value.callBack);
                    break;
            }
        });
    }
    
}

export default Router;