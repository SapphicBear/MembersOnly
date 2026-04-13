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

async function newMessage(id, title, body) {
    const query = `
    INSERT INTO messages (user_id, title, body, date) 
        VALUES (
            $1, $2, $3, $4
        );
    `;
    await pool.query(query, [id, title, body, new Date()]);
}

async function getMessages() {
    const query = `
    SELECT title, body, date, users.username FROM messages 
        JOIN users ON (users.id = user_id);
    `;
    const { rows } = await pool.query(query);
    return rows;
}
export { getUsers, newUser, getSelectedUser, getUserId, newMessage, getMessages };