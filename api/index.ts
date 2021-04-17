require('dotenv').config();
import express from 'express';
import appRoutes from './routes';
import sequelize from './db/connect';

const {
    APP_PORT
} = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', appRoutes);

app.listen(APP_PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log(`Example app listening at http://localhost:${APP_PORT}`);
});
