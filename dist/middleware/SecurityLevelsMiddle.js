"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = __importDefault(require("./Middleware"));
const Routers_1 = __importDefault(require("../routes/Routers"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SecurityLevelsMiddle extends Middleware_1.default {
    constructor(app) {
        super([
            { url: '**', method: 'get' },
            { url: '**', method: 'patch' },
            { url: '**', method: 'delete' },
            { url: '**', method: 'post' },
        ]);
        this.addMiddleware(app, this.checkLevels);
    }
    checkLevels(req, res, next) {
        var _a;
        //recuperamos el rol del token y la id del usuario
        const cookie = req.cookies.token;
        let token = "";
        let idUser = "";
        if (cookie) {
            try {
                const data = jsonwebtoken_1.default.verify(cookie, (_a = process.env.KEY_JWT) !== null && _a !== void 0 ? _a : "");
                token = data._doc.rol;
                idUser = data._doc._id;
            }
            catch (error) { }
        }
        // recuperamos el nivel de seguridad de ese rol
        let levelUser = 0;
        switch (token) {
            case "admin":
                levelUser = 3;
                break;
            case "leader":
                levelUser = 2;
                break;
            case "user":
                levelUser = 1;
                break;
            default:
                levelUser = 0;
                break;
        }
        //recuperamos el nivel de seguridad de la ruta
        let route = Routers_1.default.find((value) => req.path.toLocaleLowerCase() === value.url.toLocaleLowerCase());
        if (route === undefined) {
            const id = req.path.split("/").pop();
            Routers_1.default.forEach((value) => {
                route = value.url.replace(":id", "" + id).toLocaleLowerCase() === req.path.toLocaleLowerCase() && req.method.toLocaleLowerCase() === value.method.toLocaleLowerCase() ? value : route;
            });
        }
        const levelRoute = route ? route.securityLevel : 0;
        //comprobamos si tiene suficiente nivel para poder acceder a la ruta
        req.body.levelUser = levelUser;
        req.body.idUser = idUser;
        levelUser >= levelRoute ? next() : res.status(401).send("No tienes permisos");
    }
}
exports.default = SecurityLevelsMiddle;
