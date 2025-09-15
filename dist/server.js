"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AddMiddleware_1 = __importDefault(require("./middleware/AddMiddleware"));
const Router_1 = __importDefault(require("./routes/Router"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: process.env.ORIGIN_CORS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.json());
AddMiddleware_1.default.add(server);
Router_1.default.getRoutes(server);
exports.default = server;
