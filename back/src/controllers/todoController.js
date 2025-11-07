const moment = require('moment-timezone');
const Todo = require('../models/todo');
const { getSocket } = require('../../src/socket');
const db = require('../config/database');

exports.getAllTodos = (req, res) => {
    Todo.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        
        results = results.map(todo => {
            todo.due_date = moment(todo.due_date).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
            return todo;
        });

        res.status(200).json(results);
    });
};

exports.createTodo = (req, res) => {
    const { title, description, due_date, category } = req.body;
    if (!title || !description || !due_date || !category) {
        return res.status(400).json({ error: "Tất cả các trường đều là bắt buộc!" });
    }

    const formattedDueDate = moment.tz(due_date, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    Todo.create(title, description, formattedDueDate, category, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        const newTodo = {
            id: result.insertId,
            title,
            description,
            due_date: formattedDueDate,
            completed: false,
            category
        };

        const io = getSocket();
        io.emit('newTodo', newTodo);

        res.status(201).json(newTodo);
    });
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, completed, category } = req.body;

    const formattedDueDate = moment.tz(due_date, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');

    Todo.update(id, title, description, completed, formattedDueDate, category, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Cập nhật nhiệm vụ thành công' });
    });
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    Todo.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Xóa nhiệm vụ thành công' });
    });
};

exports.deleteAllTodos = (req, res) => {
    db.query('DELETE FROM todos', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Đã xóa tất cả nhiệm vụ' });
    });
};

