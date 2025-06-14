"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class SessionRequest {
    static validate(obj) {
        return this.sessionSchema.safeParse(obj);
    }
}
SessionRequest.sessionSchema = zod_1.default.object({
    idUser: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    idPraise: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
});
exports.default = SessionRequest;
