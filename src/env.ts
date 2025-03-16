interface env {
    host:string,
    port:number,
    configDB:object
};

const ENV:env = {
    host: 'localhost',
    port: 3000,
    configDB: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '',
        database: 'pruebas'
    }
};

export default ENV;