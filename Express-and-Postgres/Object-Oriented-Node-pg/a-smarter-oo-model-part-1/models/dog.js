const { resourceLimits } = require('worker_threads');
const db = require('../db');
const ExpressError = require('../expressError');

class Dog{
    constructor(id, name, age){
        this.id = id;
        this.name = name;
        this.age = age;
    }

    static async getAll(){
        const result = await db.query(`SELECT id, name, age FROM dogs`);

        const dogs = result.rows.map(row => new Dog(row.id, row.name, row.age));
        return dogs;
    }

    static async getById(id){
        const result = await db.query(`
            SELECT id, name, age FROM dogs 
            WHERE id = $1`, [id]);
        const dog = result.rows[0];
        if (!dog){
            throw new ExpressError("Dog not found", 404);
        }
        return new Dog(dog.id, dog.name, dog.age);
    }

    speak(){
        console.log(`${this.name} says woof!!!!`);
    }
}

module.exports = Dog;