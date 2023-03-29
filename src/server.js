import express, { json } from 'express';
import cors from 'cors';
import routes from './routes/indexRoutes.js';

const app = express();
app.use(json());
app.use(cors());
app.use(routes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))