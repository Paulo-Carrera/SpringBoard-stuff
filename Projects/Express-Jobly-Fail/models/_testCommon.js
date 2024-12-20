const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/tokens");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  // Clear existing data
  await db.query("DELETE FROM companies");
  await db.query("DELETE FROM users");

  // Insert companies
  await db.query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES ('c1', 'C1', 1, 'Desc1', 'http://c1.img'),
           ('c2', 'C2', 2, 'Desc2', 'http://c2.img'),
           ('c3', 'C3', 3, 'Desc3', 'http://c3.img')`);

  // Insert regular users and an admin user
  const result = await db.query(`
    INSERT INTO users(username, password, first_name, last_name, email, is_admin)
    VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com', false),
           ('u2', $2, 'U2F', 'U2L', 'u2@email.com', false),
           ('adminUser', $3, 'Admin', 'User', 'admin@email.com', true)
    RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("adminPassword", BCRYPT_WORK_FACTOR),  // Admin password
    ]);

  // Generate tokens for test users
  const u1Token = createToken({ username: 'u1', isAdmin: false });
  const u2Token = createToken({ username: 'u2', isAdmin: false });
  const adminToken = createToken({ username: 'adminUser', isAdmin: true });

  console.log(`Inserted users: ${result.rows.map(row => row.username).join(", ")}`);
  console.log(`Generated tokens: u1Token = ${u1Token}, u2Token = ${u2Token}, adminToken = ${adminToken}`);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};