"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PraiseController_1 = __importDefault(require("../controllers/PraiseController"));
const SessionController_1 = __importDefault(require("../controllers/SessionController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const Routers = [
    //Rutas de alabanzas
    { url: '/praise', method: 'get', callBack: PraiseController_1.default.getAll, securityLevel: 0 },
    { url: '/praise/:id', method: 'get', callBack: PraiseController_1.default.getById, securityLevel: 0 },
    { url: '/praise', method: 'post', callBack: PraiseController_1.default.create, securityLevel: 1 },
    { url: '/praise/:id', method: 'delete', callBack: PraiseController_1.default.delete, securityLevel: 1 },
    { url: '/praise/:id', method: 'patch', callBack: PraiseController_1.default.update, securityLevel: 1 },
    { url: '/praise/search', method: 'post', callBack: PraiseController_1.default.search, securityLevel: 0 },
    //Rutas de sesiones.
    { url: '/session', method: 'post', callBack: SessionController_1.default.create, securityLevel: 2 },
    { url: '/session', method: 'patch', callBack: SessionController_1.default.update, securityLevel: 2 },
    { url: '/session/searchByUser', method: 'get', callBack: SessionController_1.default.searchByUser, securityLevel: 2 },
    { url: '/session/:id', method: 'get', callBack: SessionController_1.default.getById, securityLevel: 0 },
    //Rutas de usuario
    { url: '/register', method: 'post', callBack: UserController_1.default.create, securityLevel: 3 },
    { url: '/login', method: 'get', callBack: UserController_1.default.login, securityLevel: 0 },
    { url: '/islogin', method: 'get', callBack: UserController_1.default.isLogin, securityLevel: 0 },
    { url: '/logout', method: 'get', callBack: UserController_1.default.logout, securityLevel: 1 },
];
exports.default = Routers;
