"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class UserRequest {
    static validate(obj) {
        return this.userSchema.safeParse(obj);
    }
}
UserRequest.userSchema = zod_1.default.object({
    _id: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
    }).optional(),
    name: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    password: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    rol: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }).optional(),
});
exports.default = UserRequest;
