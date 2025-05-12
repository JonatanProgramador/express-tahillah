"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRouter {
    static getRoutes() {
        const router = (0, express_1.Router)();
        router.post('/register', UserController_1.default.create);
        router.get('/login', UserController_1.default.login);
        router.get('/isLogin', UserController_1.default.isLogin);
        router.get('/logout', UserController_1.default.logout);
        return router;
    }
}
exports.default = UserRouter;
