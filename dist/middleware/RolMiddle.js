"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = __importDefault(require("./Middleware"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class RolMiddle extends Middleware_1.default {
    constructor(app) {
        super([
            { url: '/register', method: 'post' },
        ]);
        this.addMiddleware(app, this.checkRol);
    }
    checkRol(req, res, next) {
        var _a;
        const cookie = req.cookies.token;
        if (cookie) {
            try {
                const data = jsonwebtoken_1.default.verify(cookie, (_a = process.env.KEY_JWT) !== null && _a !== void 0 ? _a : "");
                if (data._doc.rol === "admin") {
                    next();
                }
                else {
                    res.status(401).send("No tienes permisos");
                }
            }
            catch (error) {
                res.status(401).send("error el token ");
            }
        }
        else {
            res.status(401).send("no hay token");
        }
    }
}
exports.default = RolMiddle;
