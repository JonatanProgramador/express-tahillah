import request from 'supertest';
import server from '../../src/server';
import { cookie } from '../user/testLoginUser';

async function searchByUser(auth?:boolean) {
    const res = await request(server).get('/session/searchByUser').set('cookie', auth ?? true ? cookie : '');
    return { statusCode: res.statusCode, body: res.body };
}

function testSearchSessionByUser() {

}

export {searchByUser};

