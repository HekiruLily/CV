const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
