import { object } from "zod";
import PraiseInterface from "../interfaces/praiseInterface";
import ColumnSql from "../libs/columnSql";
import MySql from "../libs/mySql";
import PraiseRequest from "../request/praiseRequest";


class PraiseModel {

    static readonly table:string = "praises";

    static async createTable(colums:ColumnSql[]):Promise<boolean> {
        return MySql.createTable(this.table, colums);
    }

    static async dropTable(): Promise<boolean> {
        return await MySql.dropTable(this.table);
    }

    static async getAll(columns:string[]|null):Promise<PraiseInterface[]> {
        const rows:PraiseInterface[] = await MySql.getAll(this.table, columns) as PraiseInterface[];
        return rows;
    }

    static async getById(columns:string[]|null, id:number):Promise<PraiseInterface[]> {
        const row:PraiseInterface[] = await MySql.getById(id, columns, this.table) as PraiseInterface[];
        return row;
    }

    static async createRow(input:PraiseInterface):Promise<boolean> {
        const row = await MySql.createRow(input, this.table);
        if(row) {
            return row.affectedRows > 0;
        } else {
            return false;
        }
    }

    static async deleteRow(id:number):Promise<boolean> {
        const row = await MySql.deleteRow(id, this.table);
        if(row) {
            return row.affectedRows > 0;
        } else {
            return false;
        }
    }

    static async updateRow(input:PraiseInterface, id:number):Promise<boolean> {
        const row = await MySql.updateRow(input, id, this.table);
        if(row) {
            return row.affectedRows > 0;
        } else {
            return false;
        }
    }
}

export default PraiseModel;