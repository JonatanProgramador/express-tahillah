"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Middleware_1 = __importDefault(require("./Middleware"));
class ProtectedMiddle extends Middleware_1.default {
    constructor(app) {
        super([
            { url: '/praise', method: 'post' },
            { url: '/prueba', method: 'get' },
            { url: '/praise/:id', method: 'delete' },
            { url: '/praise/:id', method: 'patch' },
        ]);
        this.addMiddleware(app, this.checkToken);
    }
    checkToken(req, res, next) {
        var _a;
        const cookie = req.cookies.token;
        if (cookie) {
            try {
                const data = jsonwebtoken_1.default.verify(cookie, (_a = process.env.KEY_JWT) !== null && _a !== void 0 ? _a : "");
                next();
            }
            catch (error) {
                res.status(401).send("error el token");
            }
        }
        else {
            res.status(401).send("no hay token");
        }
    }
}
exports.default = ProtectedMiddle;
