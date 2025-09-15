"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PraiseRequest_1 = __importDefault(require("../request/PraiseRequest"));
const PraiseModel_1 = __importDefault(require("../models/mongoDB/PraiseModel"));
const SearchRequest_1 = __importDefault(require("../request/SearchRequest"));
class PraiseController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield PraiseModel_1.default.getAll();
            rows ? res.json(rows) : res.status(500).send("Error en el servidor");
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield PraiseModel_1.default.getById(req.params.id);
            switch (row) {
                case 404:
                    res.status(404).send("No se ha encontrado resultados");
                    break;
                case 500:
                    res.status(500).send("Error en el servidor");
                    break;
                default:
                    res.json(row);
            }
            ;
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const praiseValidate = PraiseRequest_1.default.validate(req.body);
            if (praiseValidate.success) {
                const praise = yield PraiseModel_1.default.createRow(praiseValidate.data);
                praise ? res.send("Se ha creado una alabanza") : res.status(500).send("Error en el servidor");
            }
            else {
                res.status(400).send("datos invalidos");
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rowDelete = yield PraiseModel_1.default.deleteRow(req.params.id);
            switch (rowDelete) {
                case 200:
                    res.send("Se ha eliminado la albanza");
                    break;
                case 404:
                    res.status(404).send("No se ha encontrado resultados");
                    break;
                default:
                    res.status(500).send("Error del servidor");
                    break;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateRow = PraiseRequest_1.default.validatePartial(req.body);
            if (validateRow.success) {
                const updateRow = yield PraiseModel_1.default.updateRow(validateRow.data, req.params.id);
                switch (updateRow) {
                    case 200:
                        res.send("Se ha actualizado la albanza");
                        break;
                    case 404:
                        res.status(404).send("No se ha encontrado resultados");
                        break;
                    default:
                        res.status(500).send("Error del servidor");
                        break;
                }
            }
            else {
                res.status(400).send("datos invalidos");
            }
        });
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const validate = SearchRequest_1.default.validate(req.body);
            if (validate.success) {
                const praises = yield PraiseModel_1.default.find(validate.data.key, validate.data.value, validate.data.precise);
                praises === null ? res.status(500).send("Error en el servidor") : res.json(praises);
            }
            else {
                res.status(400).send("datos invalidos");
            }
        });
    }
}
exports.default = PraiseController;
