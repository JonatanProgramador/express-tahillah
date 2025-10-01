import request from 'supertest';
import server from '../../src/server';

async function searchPraise(body: object) {
    const res = await request(server).post('/praise/search').send(body);
    return { statusCode: res.statusCode, body: res.body };
}

function testSearchPraise() {
    it("Busqueda precisa exitosa(200)", async () => {
        const res = await searchPraise({ key: "type", value: "Adoración", precise: true })
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("Busqueda imprecisa exitosa(200)", async () => {
        const res = await searchPraise({ key: "title", value: "no", precise: false })
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("Busqueda exitosa pasandole elementos al body de mas(200)", async () => {
        const res = await searchPraise({ key: "title", value: "no", precise: false, cosa: "asd" })
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("Elementos del body erroneos(400)", async () => {
        const res = await searchPraise({ key: "title", value: "no", cosa: "asd" });
        expect(res.statusCode).toBe(400);
    });
}

export { testSearchPraise };