const pg = require('pg');

const db = new pg.Client("postgres://postgres:P@ulo445@localhost:5432/pets_db");

db.connect();

module.exports = db;