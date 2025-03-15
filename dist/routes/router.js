"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const praiseRouter_1 = __importDefault(require("./praiseRouter"));
class Router {
    static getRoutes(app) {
        app.use('/praise', praiseRouter_1.default.getRoutes());
        app.use('**', (req, res) => { res.status(404).send("Pagina no encontrada"); });
        return app;
    }
}
exports.default = Router;
