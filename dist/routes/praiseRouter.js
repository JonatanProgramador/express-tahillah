"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class PraiseRouter {
    static getRoutes() {
        const router = (0, express_1.Router)();
        router.get('/', (req, res) => { res.send("Recuperando todas las alabanzas"); });
        router.get('/:id', (req, res) => { res.send("Recuperando una alabanza"); });
        router.post('/', (req, res) => { res.send("Creando una alabanza"); });
        router.patch('/:id', (req, res) => { res.send("Actualizando parcialmente una alabanza"); });
        router.delete('/:id', (req, res) => { res.send("Eliminando una alabanza"); });
        return router;
    }
}
exports.default = PraiseRouter;
