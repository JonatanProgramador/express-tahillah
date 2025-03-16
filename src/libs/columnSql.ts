interface COLUMNSQL {
    name:string,
    type:string,
    table:string|null,
    isUnique:boolean,
    isNotNull:boolean,
    isPrimaryKey:boolean,
    isAutoIncrement:boolean,
    isDefault:string|null,
    isCheck:string[]|null,
    foreignKey:string|null,
}


class ColumnSql {

    static readonly  typeColumn = {
        string: "varchar(255)",
        int: "INT"
    }

    constructor(name:string, type:string) {
        this.column.name = name;
        this.column.type = type;
    }

    private column:COLUMNSQL = {
        name:'',
        type:'',
        table:null,
        isUnique:false,
        isNotNull:false,
        isPrimaryKey:false,
        isAutoIncrement:false,
        isDefault:null,
        isCheck:null,
        foreignKey:null,
    };

    isUnique() {
        this.column.isUnique = true;
    }

    isNotNull() {
        this.column.isNotNull = true;
    }

    isPrimaryKey() {
        this.column.isPrimaryKey = true;
    }

    isAutoIncrement() {
        this.column.isAutoIncrement = true;
    }

    isDefault(value:string) {
        this.column.isDefault = value;
    }

    isCheck(value:string[]) {
        this.column.isCheck = value;
    }

    foreignKey(table:string, column:string) {
        this.column.foreignKey = column;
        this.column.table = table;
    }

    columnToString():string {
        let result:string = `${this.column.name} ${this.column.type}`;
        result += this.column.isUnique?' UNIQUE':'';
        result += this.column.isNotNull?' NOT NULL':'';
        result += this.column.isAutoIncrement?' AUTO_INCREMENT':'';
        result += this.column.isCheck?` CHECK (${this.column.name} IN (${this.column.isCheck.join(", ")}))`:'';
        result += this.column.isDefault?` DEFAULT '${this.column.isDefault}'`:'';
        result += this.column.isPrimaryKey?`, PRIMARY KEY(${this.column.name})`:'';
        result += this.column.foreignKey && this.column.table?`, FOREIGN KEY (${this.column.name}) REFERENCES ${this.column.table}(${this.column.foreignKey})`:'';
        return result
    }
}

export default ColumnSql;