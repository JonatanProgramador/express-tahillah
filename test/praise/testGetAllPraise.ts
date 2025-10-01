import request from 'supertest';
import server from '../../src/server';

function testGetAllPraise() {

    it("Consulta exitosa(200)", async () => {
        const res = await request(server).get('/praise');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
}

export default testGetAllPraise;