import { Application, NextFunction, Request, Response } from "express";


interface RouteMiddlInterface { url: string, method: string };

class Middleware {

    private routes: RouteMiddlInterface[] = [];

    constructor(routes: RouteMiddlInterface[]) {
        this.routes = routes;
    }

    addMiddleware(app: Application, callback: (req: Request, res: Response, next: NextFunction) => void): void {
        for (let i = 0; i < this.routes.length; ++i) {
            switch (this.routes[i].method) {
                case 'get':
                    app.get(this.routes[i].url, callback);
                    break;
                case 'post':
                    app.post(this.routes[i].url, callback);
                    break;
                case 'patch':
                    app.patch(this.routes[i].url, callback);
                    break;
                case 'delete':
                    app.delete(this.routes[i].url, callback);
                    break;
            }
        }
    }
}

export default Middleware;