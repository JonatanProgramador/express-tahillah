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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const MongoDB_1 = __importDefault(require("../../libs/MongoDB"));
class PraiseModel {
    static createRow(praise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.praiseSchema);
                const result = yield model.create(praise);
                return result._id.toString();
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerSelectionError) {
                    console.log("No hay conexión");
                    if (MongoDB_1.default.reconnectDB === null)
                        MongoDB_1.default.init();
                }
                return null;
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.praiseSchema);
                const result = yield model.find();
                return result;
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerSelectionError) {
                    console.log("No hay conexión");
                    if (MongoDB_1.default.reconnectDB === null)
                        MongoDB_1.default.init();
                }
                return null;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.praiseSchema);
                const result = yield model.findById(id);
                return result;
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerSelectionError) {
                    console.log("No hay conexión");
                    if (MongoDB_1.default.reconnectDB === null)
                        MongoDB_1.default.init();
                }
                if (error instanceof mongoose_1.default.Error.CastError)
                    return 404;
                return 500;
            }
        });
    }
    static deleteRow(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.praiseSchema);
                const result = yield model.findByIdAndDelete(id);
                return 200;
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerSelectionError) {
                    console.log("No hay conexión");
                    if (MongoDB_1.default.reconnectDB === null)
                        MongoDB_1.default.init();
                }
                if (error instanceof mongoose_1.default.Error.CastError)
                    return 404;
                return 500;
            }
        });
    }
    static updateRow(praise, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.praiseSchema);
                const result = yield model.findByIdAndUpdate(id, praise);
                return 200;
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerSelectionError) {
                    console.log("No hay conexión");
                    if (MongoDB_1.default.reconnectDB === null)
                        MongoDB_1.default.init();
                }
                if (error instanceof mongoose_1.default.Error.CastError)
                    return 404;
                return 500;
            }
        });
    }
    //TODO. puedo eliminar esta funcion ya que en getAll usa el mismo codigo.
    static find(key, value, precise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.praiseSchema);
                const result = yield model.find({ [key]: precise ? value : { $regex: value, $options: "i" } });
                return result;
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerSelectionError) {
                    console.log("No hay conexión");
                    if (MongoDB_1.default.reconnectDB === null)
                        MongoDB_1.default.init();
                }
                return null;
            }
        });
    }
}
_a = PraiseModel;
PraiseModel.letterSchema = new mongoose_1.Schema({
    id: Number,
    type: String,
    summary: String,
    letter: String
});
PraiseModel.praiseSchema = new mongoose_1.Schema({
    title: String,
    type: String,
    tone: String,
    author: String,
    track: String,
    letters: [_a.letterSchema]
});
PraiseModel.collection = 'praises';
exports.default = PraiseModel;
