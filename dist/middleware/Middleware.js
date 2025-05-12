"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class Middleware {
    constructor(routes) {
        this.routes = [];
        this.routes = routes;
    }
    addMiddleware(app, callback) {
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
exports.default = Middleware;
