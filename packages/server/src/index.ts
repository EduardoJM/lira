import express from 'express';
import cors from 'cors';
import requireDir from 'require-dir';
import mongoose from 'mongoose';

import routes from './routes';

import 'dotenv/config';

import createServerConfigurations from './utils/createServerConfigurations';

createServerConfigurations();

const app = express();

mongoose.connect('mongodb://localhost:27017/lira-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
requireDir('./models');

app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {});
