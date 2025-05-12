"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProtectedMiddle_1 = __importDefault(require("./ProtectedMiddle"));
const RolMiddle_1 = __importDefault(require("./RolMiddle"));
class AddMiddleware {
    static add(app) {
        //new CheckIdMiddle(app);
        new ProtectedMiddle_1.default(app);
        new RolMiddle_1.default(app);
    }
}
exports.default = AddMiddleware;
