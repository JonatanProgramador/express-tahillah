"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecurityLevelsMiddle_1 = __importDefault(require("./SecurityLevelsMiddle"));
class AddMiddleware {
    static add(app) {
        new SecurityLevelsMiddle_1.default(app);
    }
}
exports.default = AddMiddleware;
