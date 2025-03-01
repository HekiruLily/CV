const express = require('express');
const app = express();
const cors = require('cors');
const clubRoutes = require('./src/routes/club.routes');
const tournamentRoute = require('./src/routes/tournament.routes');

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/clubs', clubRoutes);
app.use('/tournament', tournamentRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
