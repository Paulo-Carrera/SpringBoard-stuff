process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
let cats = require('./fakeDB');
let pickles = { name : 'Pickles' }

beforeEach(function(){
    cats.push(pickles);
});

afterEach(function(){
    // make sure this *mutates*, not redifines 'cats'
    cats.length = 0;
});


// TEST GET /cats
describe('GET /cats', ()=>{
    test('Get all cats', async ()=>{
        const res = await request(app).get('/cats');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cats : [pickles] });
    });
});


// TEST GET /cats/[name]
describe('GET /cats/:name', ()=>{
    test('Get cat by name', async ()=>{
        const res = await request(app).get(`/cats/${pickles.name}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cat: pickles });
    });

    test('Responds with 404 if id invalid', async ()=>{
        const res = await request(app).get(`/cats/icecube`);
        expect(res.statusCode).toBe(404);
    });
});


// TEST POST /cats
describe('POST /cats', function(){
    test('Creates a new cat', async function(){
        const res = await request(app).post('/cats').send({name : 'Loki'});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({cat : { name : 'Loki' }});
    });

    test('Responds with 400 if name empty or invalid', async ()=>{
        const res = await request(app).post('/cats').send({});
        expect(res.statusCode).toBe(400);
        expect
    });
});


// TEST PATCH /cats/[name]
describe('PATCH /cats/[name]', function(){
    test('Updates a single cat', async function(){
        const res = await request(app).patch(`/cats/${pickles.name}`).send({
            name : "Loki"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            cat : {name : 'Loki'}
        });
    });

    test('Responds with 404 if id invalid', async ()=>{
        const res = await request(app).patch('/cats/0');
        expect(res.statusCode).toBe(404);
    });

    test('Responds with 404 for invalid name', async ()=>{
        const res = await request(app).patch(`/cats/Piggles`).send({name : 'Loki'});
        expect(res.statusCode).toBe(404);
    })
});


// TEST DELETE /cats/[name]
describe('DELETE /cats/:name', function(){
    test('Deletes a single cat', async ()=>{
        const res = await request(app).delete(`/cats/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message : 'Deleted' });
    });

    test('Responds with 404 if id invalid', async ()=>{
        const res = await request(app).delete('/cats/hamface');
        expect(res.statusCode).toBe(404);
    });
});

