"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PraiseRouter_1 = __importDefault(require("./PraiseRouter"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
class Router {
    static getRoutes(app) {
        app.use("/", UserRouter_1.default.getRoutes());
        app.use('/praise', PraiseRouter_1.default.getRoutes());
        app.use('**', (req, res) => { res.status(404).send("Pagina no encontrada"); });
    }
}
exports.default = Router;
