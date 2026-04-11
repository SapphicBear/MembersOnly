import { pool } from "./pool.js";

async function getUsers() {
    const query = `
    SELECT * FROM users;
    `;
    const { rows } = await pool.query(query);
    return rows;
}

export { getUsers };