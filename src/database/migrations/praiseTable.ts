import ColumnSql from "../../libs/columnSql";
import PraiseModel from "../../models/praiseModel";

class PraiseTable {

    static async create(): Promise<void> {
        let columns: ColumnSql[] = [];

        columns.push(new ColumnSql('id', ColumnSql.typeColumn.int));
        columns[0].isNotNull();
        columns[0].isPrimaryKey();
        columns[0].isAutoIncrement();

        columns.push(new ColumnSql('title', ColumnSql.typeColumn.string));
        columns[1].isNotNull();

        columns.push(new ColumnSql('tone', ColumnSql.typeColumn.string));
        columns[2].isNotNull();

        columns.push(new ColumnSql('letter', ColumnSql.typeColumn.string));
        columns[3].isNotNull();

        const isOk = await PraiseModel.createTable(columns);
        console.log('Praise', isOk?"OK":"ERROR");
    }

    static async drop():Promise<void>  {
        const isOk = await PraiseModel.dropTable();
        console.log('Praise', isOk?"OK":"ERROR");
    }
}

export default PraiseTable;