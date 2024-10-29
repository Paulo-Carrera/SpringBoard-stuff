const db = require("../db");
const ExpressError = require("../expressError");

class Cat{
    static async getAll(){
        let result = await db.query(
            `SELECT id, name, age FROM cats`
        )
        return result.rows;
    }

    static async getById(id){
        let result = await db.query(
            `SELECT id, name, age FROM cats WHERE id = $1`, [id]
        )
        if(result.rows.length === 0){
            throw new ExpressError("Cat not found", 404);
        }
        return result.rows[0];
    }

    static async create(name, age){
        if(!name || !age){                                          // logic for missing age or name . 
            throw new ExpressError("Missing required data!", 404);
        }
        let result = await db.query(
            `INSERT INTO cats (name, age) 
            VALUES ($1, $2) 
            RETURNING id, name, age`,
            [name, age]
        )
        return result.rows[0];
    }

    static async delete(id){
        let result = await db.query(
            `DELETE FROM cats WHERE id = $1 RETURNING id`, [id]
        )
        if(result.rows.length === 0){
            throw new ExpressError("Cat not found", 404);   // Logic for cat id non existent .
        }
    }

}


module.exports = Cat ;