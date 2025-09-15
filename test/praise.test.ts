
import request from 'supertest';
import server from '../src/server';
import mongoose from 'mongoose';

beforeAll(()=>{
    mongoose.connect(process.env.CLUSTER ?? "");
})

afterAll(()=>{
    mongoose.disconnect();
})

describe("Endpoint de praise", ()=>{
    it("obteniendo todo los praises",async ()=>{
        const res = await request(server).get('/praise');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        
    })
})