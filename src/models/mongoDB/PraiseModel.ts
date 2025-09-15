import mongoose, { mongo, Schema } from "mongoose";
import PraiseInterface from "../../interfaces/PraiseInterface";
import MongoDB from "../../libs/MongoDB";


class PraiseModel {


    private static readonly letterSchema = new Schema({
        id: Number,
        type: String,
        summary: String,
        letter: String
    });

    private static readonly praiseSchema = new Schema({
        title: String,
        type: String,
        tone: String,
        author: String,
        track: String,
        letters: [this.letterSchema]
    });

    private static readonly collection = 'praises';

    static async createRow(praise: PraiseInterface): Promise<boolean> {
        try {
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result = await model.create(praise);
            return result._id.toString() !== '';
        } catch (error) { 
             if(error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if(MongoDB.reconnectDB === null)MongoDB.init();
            }
            return false;
        }
    }

    static async getAll(): Promise<PraiseInterface[]|null> {
        try {
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result: PraiseInterface[] = await model.find();
            return result;
        } catch (error) {
            if(error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if(MongoDB.reconnectDB === null)MongoDB.init();
            }
            return null;
        }
    }

    static async getById(id: string): Promise<PraiseInterface | number | null> {
        try {
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result: PraiseInterface | null = await model.findById(id);
            return result;
        } catch (error) {
             if(error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if(MongoDB.reconnectDB === null)MongoDB.init();
            }
            if(error instanceof mongoose.Error.CastError) return 404;
            return 500;
        }
    }

    static async deleteRow(id: string):Promise<Number> {
        try {
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result = await model.findByIdAndDelete(id);
            return 200;
        } catch (error) {
             if(error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if(MongoDB.reconnectDB === null)MongoDB.init();
            }
             if(error instanceof mongoose.Error.CastError) return 404;
            return 500;
        }
    }

    static async updateRow(praise: PraiseInterface, id: string) {
        try {
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result = await model.findByIdAndUpdate(id, praise);
            return 200;
        } catch (error) {
             if(error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if(MongoDB.reconnectDB === null)MongoDB.init();
            }
              if(error instanceof mongoose.Error.CastError) return 404;
            return 500;
        }
    }


    //TODO. puedo eliminar esta funcion ya que en getAll usa el mismo codigo.
    static async find(key: string, value: string, precise: boolean): Promise<PraiseInterface[]|null> {
        try {
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result: PraiseInterface[] = await model.find({ [key]: precise ? value : { $regex: value, $options: "i" } });
            return result;
        } catch (error) {
             if(error instanceof mongo.MongoServerSelectionError) {
                console.log("No hay conexión");
                if(MongoDB.reconnectDB === null)MongoDB.init();
            }
            return null;
        }
    }

}

export default PraiseModel;