import request from 'supertest';
import server from '../../src/server';

const correctId = "6815f72c4ad1af18bbf57a78";
const incorrectId = "6815f72c4ad1af18bbf57a7r";

async function getPraiseById(id: string) {
    const res = await request(server).get('/praise/' + id);
    return { statusCode: res.statusCode, body: res.body };
}

function testGetPraiseById() {
    it("Consulta exitosa(200)", async () => {
        const res = await getPraiseById(correctId);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('title');
    });

    it("No existe el elemento(404)", async () => {
        const res = await getPraiseById(incorrectId);
        expect(res.statusCode).toBe(404);
    });
}

export { testGetPraiseById, getPraiseById }