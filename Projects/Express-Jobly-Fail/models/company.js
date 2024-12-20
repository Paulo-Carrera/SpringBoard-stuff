"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Company {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ handle, name, description = null, numEmployees = null, logoUrl = null }) {
    console.log("Creating company:", { handle, name, description, numEmployees, logoUrl });
  
    const duplicateCheck = await db.query(
      `SELECT handle
       FROM companies
       WHERE handle = $1`,
      [handle]
    );
  
    if (duplicateCheck.rows[0]) {
      console.error("Duplicate company found:", handle);
      throw new BadRequestError(`Duplicate company: ${handle}`);
    }
  
    const result = await db.query(
      `INSERT INTO companies
       (handle, name, description, num_employees, logo_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
      [handle, name, description, numEmployees, logoUrl]
    );
  
    console.log("Company created successfully:", result.rows[0]);
    return result.rows[0];
  }
  
  

  /** Find all companies.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll() {
    const companiesRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           ORDER BY name`);
    return companiesRes.rows;
  }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const companyRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           WHERE handle = $1`,
        [handle]);

    const company = companyRes.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

   /** GET /companies/filter 
   * { minEmployees, maxEmployees, nameLike }
   * { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
   * Authorization required: none
   */

  static async filter({ minEmployees, maxEmployees, nameLike }) {
    // Validate that minEmployees is not greater than maxEmployees
    if (minEmployees !== undefined && maxEmployees !== undefined && minEmployees > maxEmployees) {
      throw new BadRequestError("minEmployees cannot be greater than maxEmployees");
    }

    // Initialize the base query and parameters array
    let query = `SELECT handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl" FROM companies`;
    let whereClauses = [];
    let queryValues = [];

    // Add filters based on provided query parameters
    if (minEmployees !== undefined) {
      whereClauses.push(`num_employees >= $${queryValues.length + 1}`);
      queryValues.push(minEmployees);
    }

    if (maxEmployees !== undefined) {
      whereClauses.push(`num_employees <= $${queryValues.length + 1}`);
      queryValues.push(maxEmployees);
    }

    if (nameLike !== undefined) {
      whereClauses.push(`name ILIKE $${queryValues.length + 1}`);
      queryValues.push(`%${nameLike}%`);
    }

    // Combine the where clauses into the query if any filters were added
    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    // Execute the query with the assembled parameters
    const result = await db.query(query, queryValues);
    return result.rows; // Return the filtered companies
  }


  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          numEmployees: "num_employees",
          logoUrl: "logo_url",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE companies 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING handle, 
                                name, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
    const result = await db.query(querySql, [...values, handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(handle) {
    const result = await db.query(
          `DELETE
           FROM companies
           WHERE handle = $1
           RETURNING handle`,
        [handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);
  }
}


module.exports = Company;
