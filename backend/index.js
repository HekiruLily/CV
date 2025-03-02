const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes')
const clubRoutes = require('./src/routes/club.routes');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes)
app.use('/clubs', clubRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
