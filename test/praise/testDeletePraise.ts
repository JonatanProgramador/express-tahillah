import { createPraise } from "./testCreatePraise";
import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';

async function deletePraise(id: string, auth: boolean) {
    const del = await request(server).delete('/praise/' + id).set('cookie', auth ? cookie : '');
    return del.statusCode;
}

function testDeletePraise() {
    it("Eliminación del elemento exitoso(200)", async () => {
        const res = await createPraise();
        expect(res.statusCode).toBe(201);
        expect(await deletePraise(res.body, true)).toBe(200);
    });

    it("Elemento no encontrado(404)", async () => {
        expect(await deletePraise('6815fa2c4at1af18b2f57a78', true)).toBe(404);
    });

    it("Error de autentificación(401)", async () => {
        expect(await deletePraise('asd', false)).toBe(401);
    });
}

export { testDeletePraise, deletePraise };