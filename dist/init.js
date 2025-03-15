"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./env"));
const router_1 = __importDefault(require("./routes/router"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const app = (0, express_1.default)();
middleware_1.default.addMiddleware(app);
router_1.default.getRoutes(app);
const serverMessage = "Servidor iniciado...";
app.listen(env_1.default.port, env_1.default.host, () => { console.log(serverMessage); });
