"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./routes/Router"));
const AddMiddleware_1 = __importDefault(require("./middleware/AddMiddleware"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const SessionModel_1 = __importDefault(require("./models/mongoDB/SessionModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN_CORS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
AddMiddleware_1.default.add(app);
Router_1.default.getRoutes(app);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.ORIGIN_CORS,
    }
});
if (process.env.DEVELOP === "true") {
    const serverMessage = `Servidor iniciado en ${process.env.HOST}:${process.env.PORT}`;
    server.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, (_a = process.env.HOST) !== null && _a !== void 0 ? _a : "", () => { console.log(serverMessage); });
}
else {
    server.listen(process.env.PORT ? Number.parseInt(process.env.PORT) : 3000, () => { console.log("Modo producion"); });
}
mongoose_1.default.connect((_b = process.env.CLUSTER) !== null && _b !== void 0 ? _b : "");
SessionModel_1.default.listenSession(io);
