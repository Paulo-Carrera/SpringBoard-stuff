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

//  TESTS
describe("GET /users", ()=>{
    test("Get a list of 1 user", async ()=>{
        const res = await request(app).get("/users");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            users : [testUser]
        });
    });
});


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