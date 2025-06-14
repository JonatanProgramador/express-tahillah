"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SessionController_1 = __importDefault(require("../controllers/SessionController"));
class SessionRouter {
    static getRoutes() {
        const router = (0, express_1.Router)();
        router.post('/', SessionController_1.default.create);
        return router;
    }
}
exports.default = SessionRouter;
