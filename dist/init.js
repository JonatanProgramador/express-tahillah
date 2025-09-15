"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./server"));
const MongoDB_1 = __importDefault(require("./libs/MongoDB"));
//Modulado la configuración del server
const app = http_1.default.createServer(server_1.default);
//Modulado la conexión y las escuchas de la base de datos
MongoDB_1.default.init();
if (process.env.DEVELOP === "true") {
    const serverMessage = `Servidor iniciado en ${process.env.HOST}:${process.env.PORT}`;
    app.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, (_a = process.env.HOST) !== null && _a !== void 0 ? _a : "", () => { console.log(serverMessage); });
}
else {
    app.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, () => { console.log("Modo producion"); });
}
exports.default = app;
