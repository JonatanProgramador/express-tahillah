import path from "node:path";

interface env {
    host:string,
    port:number,
    path:string
    configDB:object
};

const ENV:env = {
    host: '192.168.1.99',
    port: 3000,
    path: path.resolve(__dirname),
    configDB: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '',
        database: 'pruebas'
    }
};

export default ENV;