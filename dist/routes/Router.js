"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routers_1 = __importDefault(require("./Routers"));
class Router {
    static getRoutes(app) {
        Routers_1.default.forEach((value) => {
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
exports.default = Router;
