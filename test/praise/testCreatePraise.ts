import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';
import { deletePraise } from './testDeletePraise';
import { getPraiseById } from './testGetPraiseById';

const completeData = {
    "title": "El mesias",
    "tone": "Do Mayor",
    "type": "Adoración",
    "author": "Maki",
    "track": "www.yooutube.es",
    "letters": [
        {
            "id": 1,
            "type": "estrofa",
            "summary": "vino",
            "letter": "Vino a esta tierra andubo por ella…"
        },
        {
            "id": 2,
            "type": "estribillo",
            "summary": "el es el mesias",
            "letter": "El es el mesias cristo prometido"
        }
    ]
};

async function createPraise(data?: object, auth?: boolean) {
    data = data ?? completeData;
    auth = auth ?? true;
    const res = await request(server).post('/praise').send(data).set('cookie', auth ? cookie : '');
    return { statusCode: res.statusCode, body: res.body };
}

function testCreatePraise() {
    it("Creación del elemento exitosa(201)", async () => {
        const res = await createPraise(completeData, true)
        expect(res.statusCode).toBe(201);
        expect(await deletePraise(res.body, true)).toBe(200);
    });

    it("Creación del elemento exitosa pasandole elementos de mas(201)", async () => {
        const res = await createPraise({ ...completeData, cosa: "cosa" }, true);
        expect(res.statusCode).toBe(201);
        const praise = await getPraiseById(res.body);
        expect(praise.statusCode).toBe(200);
        expect(praise.body).not.toHaveProperty("cosa");
        expect(await deletePraise(res.body, true)).toBe(200);
    });

    it("Creación del elemento exitosa pasandole solo los elementos obligatorios(201)", async () => {
        const res = await createPraise({ title: completeData.title, type: completeData.type, letters: completeData.letters }, true);
        expect(res.statusCode).toBe(201);
        expect(await deletePraise(res.body, true)).toBe(200);
    });

    it("Elementos del body erroneos(400)", async () => {
        const res = await createPraise({ title: completeData.title, letters: completeData.letters, cosa: "asd" }, true);
        if (res.statusCode === 201) expect(await deletePraise(res.body, true)).toBe(200);
        expect(res.statusCode).toBe(400);

    });

    it("Error de autentificación(401)", async () => {
        const res = await createPraise(completeData, false);
        if (res.statusCode === 201) expect(await deletePraise(res.body, true)).toBe(200);
        expect(res.statusCode).toBe(401);
    });
}

export { testCreatePraise, createPraise };