
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const todoRoutes = require('./src/routes/todoRoutes');
const http = require('http');
const { initSocket } = require('./src/socket'); // Nhập initSocket từ file socket.js

const app = express();
const server = http.createServer(app);

// Khởi tạo socket.io
initSocket(server);

const port = 3001;

app.use(cors()); 
app.use(bodyParser.json());
app.use('/api', todoRoutes); 

server.listen(port, () => {
    console.log(`Server đang chạy tại địa chỉ http://localhost:${port}`);
});

// http://localhost:3001/api/todos
// reset id: TRUNCATE TABLE todos;