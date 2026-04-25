import { pool } from "./pool.js";

async function getUsers() {
    const query = `
    SELECT username, id FROM users;
    `;
    const { rows } = await pool.query(query);
    return rows;
}

async function newUser(name, username, email, password, isadmin, ismember) {
    const query = `
    INSERT INTO users (name, username, email, password, isadmin, ismember) VALUES ($1, $2, $3, $4, $5, $6);
    `;
    await pool.query(query, [name, username, email, password, isadmin, ismember]);
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

async function getUserMessages(id) {
    const query = `
    SELECT title, date, id FROM messages
        WHERE user_id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows;
}

async function makeUserAdmin(id) {
    const query = `
    UPDATE users 
        SET isadmin = true
        WHERE id = $1
    `;
    await pool.query(query, [id]);
}

async function deleteMessage(id) {
    const query = `
    DELETE FROM messages 
        WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows;
}
async function makeUserMember(id) {
    const query = `
    UPDATE users 
        SET ismember = true
        WHERE id = $1;
    `;
    await pool.query(query, [id]);
}

export { getUsers, newUser, getSelectedUser, getUserId, newMessage, getMessages, makeUserAdmin, getUserMessages, deleteMessage, makeUserMember };