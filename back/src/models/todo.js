const db = require('../config/database');

const Todo = {
    getAll: (callback) => {
        db.query('SELECT * FROM todos', callback);
    },
    create: (title, description, due_date, category, callback) => {
        db.query('INSERT INTO todos (title, description, due_date, category) VALUES (?, ?, ?, ?)', [title, description, due_date, category], callback);
    },
    update: (id, title, description, completed, due_date, category, callback) => {
        db.query('UPDATE todos SET title = ?, description = ?, due_date = ?, completed = ?, category = ? WHERE id = ?', [title, description, due_date, completed, category, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM todos WHERE id = ?', [id], callback);
    }
};

module.exports = Todo;

// link BA: http://localhost:3001/api/todos