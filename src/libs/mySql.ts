import mysql, { ResultSetHeader } from 'mysql2/promise';
import ENV from '../env';
import ColumnSql from './columnSql';

class MySql {

    private static async connection(): Promise<mysql.Connection | null> {
        try {
            return await mysql.createConnection(ENV.configDB);
        } catch (error) {
            return null;
        }
    }

    private static async close(conn: mysql.Connection): Promise<void> {
        await conn.end();
    }

    static async createTable(table: string, colums: ColumnSql[]): Promise<boolean> {
        const conn: mysql.Connection | null = await this.connection();
        if (conn) {
            let columnsToString: string[] = [];
            for (let i = 0; i < colums.length; ++i) {
                columnsToString.push(colums[i].columnToString());
            }
            try {
                await conn.query(`CREATE TABLE ${table} (${columnsToString.join(", ")});`);
                this.close(conn);
                return true;
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    }

    static async dropTable(table: string): Promise<boolean> {
        const conn: mysql.Connection | null = await this.connection();
        if (conn) {
            try {
                await conn.query(`DROP TABLE ${table};`);
                this.close(conn);
                return true;
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    }

    static async getAll(table: string, columns: string[] | null): Promise<mysql.QueryResult | null> {
        const conn: mysql.Connection | null = await this.connection();
        let result: [mysql.QueryResult, mysql.FieldPacket[]] | null = null;
        if (conn) {
            if (!columns) {
                result = await conn.query(`SELECT * FROM ${table}`);
                return result[0];
            } else {
                result = await conn.query(`SELECT ${columns.join(", ")} FROM ${table}`);
                return result[0];
            }
        }
        return result;
    }

    static async getById(id: number, columns: string[] | null, table: string): Promise<mysql.QueryResult | null> {
        let result: [mysql.QueryResult, mysql.FieldPacket[]] | null = null;
        const conn: mysql.Connection | null = await this.connection();
        if (conn) {
            if (columns) {
                result = await conn.query(`SELECT ${columns.join(", ")} FROM ${table} WHERE id=?`, [id]);
            } else {
                result = await conn.query(`SELECT * FROM ${table} WHERE id=?`, [id]);
            }
            return result[0];
        }
        return result;
    }

    static async find(key: string, value: string, table: string): Promise<mysql.QueryResult | null> {
        const conn: mysql.Connection | null = await this.connection();
        let result: [mysql.QueryResult, mysql.FieldPacket[]] | null = null;
        if (conn) {
            result = await conn.query(`SELECT * FROM ${table} WHERE ${key}=?`, [value]);
            return result[0];
        }
        return result;
    }

    static async existsRow(id: number, table: string): Promise<boolean> {
        const row: mysql.QueryResult | null = await this.getById(id, null, table);
        if (row) {
            const rowToArrayObj: Object[] = row as Object[];
            return rowToArrayObj.length > 0;
        }
        return false;
    }

    static async createRow(input: Object, table: string): Promise<mysql.ResultSetHeader| null> {
        const keys: string[] = Object.keys(input);
        const values: string[] = Object.values(input);

        let signs: string = "";

        for (let i = 0; i < keys.length; ++i) {
            signs += "?,";
        }

        signs = signs.slice(0, -1);

        let query = `INSERT INTO ${table} (${keys.join(", ")} ) VALUES ( ${signs} );`;
        const conn: mysql.Connection | null = await this.connection();
        if (conn) {
            const result: [mysql.QueryResult, mysql.FieldPacket[]] | null = await conn.query(query, [...values]);
            console.log(result);
            return result[0] as ResultSetHeader;
        }
        return null;
    }

    static async deleteRow(id: number, table:string):Promise<mysql.ResultSetHeader | null> {
        const conn: mysql.Connection | null = await this.connection();
        if (conn) {
            const result: [mysql.QueryResult, mysql.FieldPacket[]] | null = await conn.query(`DELETE FROM ${table} WHERE id=?`, [id]);
            return result[0] as ResultSetHeader;
        }
        return null;
    }

    static async updateRow(input:Object, id:number, table:string):Promise<mysql.ResultSetHeader | null> {
        const keys:string = Object.keys(input).join('=?, ') + "=?";
        const conn: mysql.Connection | null = await this.connection();
        if(conn){
        const result = await conn.query(`UPDATE ${table} SET ${keys} WHERE id=?`, [...Object.values(input), id])
        return result[0] as ResultSetHeader;
        }
        return null;
    }
}



export default MySql;