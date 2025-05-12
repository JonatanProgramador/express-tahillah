"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class SearchRequest {
    static validate(obj) {
        return this.userSchema.safeParse(obj);
    }
}
SearchRequest.userSchema = zod_1.default.object({
    key: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    value: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    precise: zod_1.default.boolean({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
});
exports.default = SearchRequest;
