"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = __importDefault(require("./Middleware"));
class CheckIdMiddle extends Middleware_1.default {
    constructor(app) {
        super([
            { url: '/praise/:id', method: 'get' },
            { url: '/praise/:id', method: 'patch' },
            { url: '/praise/:id', method: 'delete' },
        ]);
        this.addMiddleware(app, this.checkId);
    }
    checkId(req, res, next) {
        const isNumber = Number.isInteger(Number.parseInt(req.params.id));
        if (isNumber) {
            next();
        }
        else {
            res.status(400).send("Se ha pasado un ID erroneo"); //TODO. Cambiar por un view
        }
    }
}
exports.default = CheckIdMiddle;
