import mongoose, { Schema } from "mongoose";
import PraiseInterface from "../../interfaces/PraiseInterface";


class PraiseModel {


    private static readonly letterSchema = new Schema({
        id:Number,
        type:String,
        summary:String,
        letter:String
    });

    private static readonly praiseSchema = new Schema({
        title:String,
        type:String,
        tone:String,
        author:String,
        track:String,
        letters:[this.letterSchema]
    });

    private static readonly collection = 'praises';

    static async createRow(praise:PraiseInterface):Promise<boolean> {
        try{
        await mongoose.connect(process.env.CLUSTER??"");
        const model = mongoose.model(this.collection, this.praiseSchema);
        const result = await model.create(praise);
        mongoose.disconnect();
        return result._id.toString() !== '';
        } catch(error) {
            return false;
        }
    }

    static async getAll():Promise<PraiseInterface[]> {
        try{
            await mongoose.connect(process.env.CLUSTER??"");
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result:PraiseInterface[] = await model.find();
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(process.env.CLUSTER);
                console.log(error);
                return [];
            }
    }

    static async getById(id:string):Promise<PraiseInterface|null> {
        try{
            await mongoose.connect(process.env.CLUSTER??"");
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result:PraiseInterface|null = await model.findById(id);
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(error);
                return null;
            }
    }

    static async deleteRow(id:string) {
        try{
            await mongoose.connect(process.env.CLUSTER??"");
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result = await model.findByIdAndDelete(id);
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(error);
                return [];
            }
    }

    static async updateRow(praise:PraiseInterface, id:string) {
        try{
            await mongoose.connect(process.env.CLUSTER??"");
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result = await model.findByIdAndUpdate(id, praise);
            mongoose.disconnect();
            return result;
            } catch(error) {
                console.log(error);
                return [];
            }
    }


    //TODO. puedo eliminar esta funcion ya que en getAll usa el mismo codigo.
    static async find(key:string, value:string, precise:boolean): Promise<PraiseInterface[]> {
        try {
            await mongoose.connect(process.env.CLUSTER??"");
            const model = mongoose.model(this.collection, this.praiseSchema);
            const result:PraiseInterface[] = await model.find({[key]:precise?value:{$regex:value, $options: "i"}});
            mongoose.disconnect();
            return  result;
        } catch(error) {
            return [];
        }
    }

}

export default PraiseModel;