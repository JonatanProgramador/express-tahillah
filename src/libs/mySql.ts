import mysql from 'mysql2/promise';
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
        const conn = await this.connection();
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
        const conn = await this.connection();
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
}



export default MySql;