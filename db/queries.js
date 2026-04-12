import { pool } from "./pool.js";

async function getUsers() {
    const query = `
    SELECT * FROM users;
    `;
    const { rows } = await pool.query(query);
    return rows;
}

async function newUser(name, username, email, password) {
    const query = `
    INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4);
    `;
    await pool.query(query, [name, username, email, password]);
}
async function getSelectedUser(username) {
    const query = `
    SELECT * FROM users WHERE username = $1;
    `;
    return await pool.query(query, [username]); 
}
async function getUserId(id) {
    const query = `
    SELECT * FROM users WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows;
}
export { getUsers, newUser, getSelectedUser, getUserId };