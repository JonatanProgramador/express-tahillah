import ColumnSql from "../libs/columnSql";
import MySql from "../libs/mySql";


class PraiseModel {

    static readonly table:string = "praises";

    static async createTable(colums:ColumnSql[]):Promise<boolean> {
        return MySql.createTable(this.table, colums);
    }

    static async dropTable(): Promise<boolean> {
        return await MySql.dropTable(this.table);
    }
}

export default PraiseModel;