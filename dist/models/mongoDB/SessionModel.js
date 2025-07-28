"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
class SessionModel {
    static createRow(session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.sessionSchema);
                const result = yield model.create(session);
                return result._id && result._id.toString() ? true : false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.sessionSchema);
                const result = yield model.findById(id);
                return result;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    static exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.find("idUser", id, true)).length > 0 ? true : false;
        });
    }
    //TODO. puedo eliminar esta funcion ya que en getAll usa el mismo codigo.
    static find(key, value, precise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.sessionSchema);
                const result = yield model.find({ [key]: precise ? value : { $regex: value, $options: "i" } });
                return result;
            }
            catch (error) {
                return [];
            }
        });
    }
    static updateRow(session, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.sessionSchema);
                const result = yield model.findByIdAndUpdate(id, session);
                return result;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    static listenSession(io) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Ejecutado");
                const model = mongoose_1.default.model(this.collection, this.sessionSchema);
                const event = model.watch();
                event.on("change", (change) => {
                    const idSession = change.documentKey._id.toString();
                    const idPraise = change.updateDescription.updatedFields.idPraise;
                    io.emit(idSession, idPraise);
                });
                event.on('error', (err) => {
                    console.error("Error en el Change Stream:", err);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
SessionModel.sessionSchema = new mongoose_1.Schema({
    idUser: String,
    idPraise: String,
});
SessionModel.collection = 'sessions';
exports.default = SessionModel;
