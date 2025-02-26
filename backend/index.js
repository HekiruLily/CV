const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const clubRoutes = require('./src/routes/club.routes');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/clubs', clubRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
