import path from "node:path";

interface env {
    host: string,
    port: number,
    path: string
    configDB: {
        host: string,
        user: string,
        port: number,
        password: string,
        database: string
    }
};

const ENV: env = {
    host: 'localhost',
    port: 3000,
    path: path.resolve(__dirname),
    configDB: {
        host: '127.0.0.1',
        user: 'root',
        port: 27017,
        password: '',
        database: 'tahillah'
    }
};

export default ENV;