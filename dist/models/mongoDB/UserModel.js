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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const MongoDB_1 = __importDefault(require("../../libs/MongoDB"));
class UserModel {
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.userSchema);
                const result = yield model.findByIdAndDelete(id);
                console.log(result);
                return result ? 200 : 404;
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
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.userSchema);
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
    static createRow(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user.rol) {
                    console.log("rol vacio asignandole un valor por defecto");
                    user.rol = "user";
                }
                const model = mongoose_1.default.model(this.collection, this.userSchema);
                const result = yield model.create(user);
                return result._id && result._id.toString() ? true : false;
            }
            catch (error) {
                if (error instanceof mongoose_1.mongo.MongoServerSelectionError) {
                    console.log("No hay conexión");
                    if (MongoDB_1.default.reconnectDB === null)
                        MongoDB_1.default.init();
                }
                return false;
            }
        });
    }
    static exists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.userSchema);
                const result = yield model.find({ name: name });
                return result.length > 0;
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
    static findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = mongoose_1.default.model(this.collection, this.userSchema);
                const result = yield model.find({ name: name });
                return result[0];
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
UserModel.userSchema = new mongoose_1.Schema({
    name: String,
    password: String,
    rol: String
});
UserModel.collection = 'users';
exports.default = UserModel;
