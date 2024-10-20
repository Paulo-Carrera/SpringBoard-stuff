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
describe("HOPE THIS WORKS", ()=>{
    test("blah", ()=>{
        console.log(testUser);
        expect(1).toBe(1);
    });
});

