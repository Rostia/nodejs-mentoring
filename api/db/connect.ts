require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';

const {
    DB_NAME,
    DB_HOST,
    DB_USER,
    DB_PASS
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'postgres'
});

export default sequelize;
