import express from 'express';
import appRoutes from './routes';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', appRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
