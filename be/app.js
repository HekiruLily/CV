const express = require('express');
const bodyParser = require('body-parser'); 
const userRoutes = require('./src/routes/userRoutes'); 
const cartRoutes = require('./src/routes/cartRoutes'); 
const paymentRoutes = require('./src/routes/paymentRoutes'); 
const db = require('./src/configs/database'); 
const cors = require('cors');
const app = express();
const port = 3001;

// Sử dụng cors
app.use(cors({
    origin: 'http://localhost:3000', // Thay đổi nếu cần
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức cho phép
    credentials: true 
}));

// Middleware để xử lý JSON
app.use(bodyParser.json()); 

// Sử dụng các route
app.use('/api', userRoutes); // Tất cả các route người dùng sẽ bắt đầu bằng /api
app.use('/api', productRoutes); 
app.use('/api', cartRoutes);
app.use('/api', paymentRoutes); 

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});