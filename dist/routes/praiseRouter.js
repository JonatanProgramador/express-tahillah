"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const praiseController_1 = __importDefault(require("../controllers/praiseController"));
class PraiseRouter {
    static getRoutes() {
        const router = (0, express_1.Router)();
        router.get('/', praiseController_1.default.getAll);
        router.get('/:id', praiseController_1.default.getById);
        router.post('/', praiseController_1.default.create);
        router.patch('/:id', praiseController_1.default.update);
        router.delete('/:id', praiseController_1.default.delete);
        return router;
    }
}
exports.default = PraiseRouter;
