process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testUser;

beforeEach(async ()=>{
    const result = await db.query(
        `INSERT INTO users (name, type)
        VALUES ('Peanut', 'admin')
        RETURNING *`
    );

    testUser = result.rows[0];
});

afterEach(async ()=>{
    await db.query(`DELETE FROM users`);
});

afterAll(async ()=>{
    await db.end();
});

//  test GET
describe("GET /users", ()=>{
    test("Get a list of 1 user", async ()=>{
        const res = await request(app).get("/users");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            users : [testUser]
        });
    });
});

// test GET/:id
describe('GET /users/:id', ()=>{
    test('Get a single user', async ()=>{
        const response = await request(app).get(`/users/${testUser.id}`)

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            user : testUser
        });
    });

    test('Responds with 404 for invalid id', async ()=>{
        const response = await request(app).get(`/users/0`);

        expect(response.statusCode).toEqual(404);
        
    });
});

// test POST
describe('POST /users', ()=>{
    test('Create a single user', async ()=>{
        const response = await request(app).post('/users').send({
            name : 'BillyBob',
            type : 'staff'
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            user : {id: expect.any(Number), name : 'BillyBob', type : 'staff'} // expect any number for id
        });
    });
});

// test PATCH
describe('PATCH /users/:id', ()=>{
    test('Updates a single user', async ()=>{
        const response = await request(app).patch(`/users/${testUser.id}`).send({
            name : 'BillyBob',
            type : 'admin'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            user : {id: testUser.id, name : 'BillyBob', type : 'admin'} 
        });
    });
    test('Responds with 404 for invalid id', async ()=>{
        const response = await request(app).patch(`/users/0`);

        expect(response.statusCode).toEqual(404);
    });
});

// test DELETE
describe('DELETE /users/:id', ()=>{
    test('Deletes a single user', async ()=>{
        const response = await request(app).delete(`/users/${testUser.id}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            message : 'Deleted'
        });
    });
});

