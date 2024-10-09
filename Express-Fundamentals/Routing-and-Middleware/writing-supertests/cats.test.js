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
        expect(res.body).toEqual({cats : [pickles]});
    });
});

// TEST POST /cats
describe('POST /cats', function(){
    test('Creates a new cat', async function(){
        const res = await request(app)
        .post('/cats')
        .send({
            name : 'Loki'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            cat : { name : 'Loki' }
        });
    });
});


