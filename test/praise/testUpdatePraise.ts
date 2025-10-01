import { createPraise } from "./testCreatePraise";
import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';
import { getPraiseById } from "./testGetPraiseById";
import { deletePraise } from "./testDeletePraise";

const updateData = {
    "title": "asd",
    "tone": "Do Mayor bemol",
    "type": "ssss",
    "author": "ddddi",
    "track": "www.yooutube.esddds",
    "letters": [
        {
            "id": 1,
            "type": "estrofa",
            "summary": "vino",
            "letter": "Vino a esta tierra andubo por ella…"
        }
    ]
};

async function updatePraise(id: String, body: object, auth: boolean) {
    const res = await request(server).patch('/praise/' + id).send(body).set('cookie', auth ? cookie : '');
    return { statusCode: res.statusCode, body: res.body };
}


function testUpdatePraise() {
    it("Actualización completa exitosa(200)", async () => {
        const idPraise = (await createPraise()).body;
        const res = await updatePraise(idPraise, updateData, true);
        expect(res.statusCode).toBe(200);
        const praise = await getPraiseById(idPraise);
        expect(praise.statusCode).toBe(200);
        expect(praise.body).toHaveProperty("title");
        expect(praise.body.title).toBe("asd");
        expect(await deletePraise(idPraise, true)).toBe(200);
    });

    it("Actualización parcial exitosa(200)", async () => {
        const idPraise = (await createPraise()).body;
        const res = await updatePraise(idPraise, { title: updateData.title }, true);
        const praise = await getPraiseById(idPraise);
        expect(await deletePraise(idPraise, true)).toBe(200);
        expect(res.statusCode).toBe(200);
        expect(praise.statusCode).toBe(200);
        expect(praise.body).toHaveProperty("title");
        expect(praise.body.title).toBe("asd");
    });

    it("Actualización exitosa con elementos de mas(200)", async () => {
        const idPraise = (await createPraise()).body;
        const res = await updatePraise(idPraise, { ...updateData, cosa: "asd" }, true);
        const praise = await getPraiseById(idPraise);
        expect(await deletePraise(idPraise, true)).toBe(200);
        expect(res.statusCode).toBe(200);
        expect(praise.statusCode).toBe(200);
        expect(praise.body).toHaveProperty("title");
        expect(praise.body.title).toBe("asd");
        expect(praise.body).not.toHaveProperty("cosa");
    });

    it("Elementos del body erroneos(400)", async () => {
        const idPraise = (await createPraise()).body;
        const res = await updatePraise(idPraise, { cosa: "asd" }, true);
        expect(await deletePraise(idPraise, true)).toBe(200);
        expect(res.statusCode).toBe(400);
    });

    it("Error de autentificación(401)", async () => {
        const idPraise = (await createPraise()).body;
        const res = await updatePraise(idPraise, { cosa: "asd" }, false);
        expect(await deletePraise(idPraise, true)).toBe(200);
        expect(res.statusCode).toBe(401);
    });

    it("No exite el elemento(404)", async () => {
        const idPraise = (await createPraise()).body;
        const res = await updatePraise("asd", updateData, true);
        expect(await deletePraise(idPraise, true)).toBe(200);
        expect(res.statusCode).toBe(404);
    });
}

export { testUpdatePraise };