"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class PraiseRequest {
    static validate(obj) {
        return this.praiseSchema.safeParse(obj);
    }
    static validatePartial(obj) {
        return this.praiseSchema.partial().safeParse(obj);
    }
}
_a = PraiseRequest;
PraiseRequest.letterSchema = zod_1.default.object({
    id: zod_1.default.number({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    type: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    summary: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    letter: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
});
PraiseRequest.praiseSchema = zod_1.default.object({
    title: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    type: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
    }),
    tone: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
    }).optional(),
    author: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
    }).optional(),
    track: zod_1.default.string({
        invalid_type_error: "Tipo invalido",
    }).optional(),
    letters: zod_1.default.array(_a.letterSchema),
});
exports.default = PraiseRequest;
