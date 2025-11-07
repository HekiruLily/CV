const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',  
    password: '1234', 
    database: 'todolist_app' 
});

db.connect((err) => {
    if (err) {
        console.error('Kết nối cơ sở dữ liệu thất bại', err.stack);
        return;
    }
    console.log('Đã kết nối với cơ sở dữ liệu MySQL');
});

module.exports = db;
