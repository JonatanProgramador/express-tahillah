"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PraiseController_1 = __importDefault(require("../controllers/PraiseController"));
class PraiseRouter {
    static getRoutes() {
        const router = (0, express_1.Router)();
        router.get('/', PraiseController_1.default.getAll);
        router.get('/:id', PraiseController_1.default.getById);
        router.post('/', PraiseController_1.default.create);
        router.post('/search', PraiseController_1.default.search);
        router.patch('/:id', PraiseController_1.default.update);
        router.delete('/:id', PraiseController_1.default.delete);
        return router;
    }
}
exports.default = PraiseRouter;
