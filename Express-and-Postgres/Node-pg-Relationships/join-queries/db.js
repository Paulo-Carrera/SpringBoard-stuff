const { Client } = require('pg');

const client = new Client({
    connectionString : 'postgres://paulo:P@ulo445@localhost:5432/pg_relationships',
});

client.connect();

module.exports = client;