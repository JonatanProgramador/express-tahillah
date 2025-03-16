import PraiseTable from "./praiseTable"

async function  start () {
    console.log('Eliminando las tablas...');
    await PraiseTable.drop();
    console.log('Creando las tablas...');
    await PraiseTable.create();
 }

 start();