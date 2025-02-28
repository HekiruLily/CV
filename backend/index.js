const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const clubRoutes = require('./src/routes/club.routes');
const profileRoutes = require('./src/routes/profile.routes');
const tournamentRoutes = require('./src/routes/tournament.routes');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Phục vụ file ảnh từ thư mục uploads
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/clubs', clubRoutes);
app.use('/profile', profileRoutes);
app.use('/tournaments', tournamentRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
