import express from 'express';
import cors from 'cors';
import routes from './routes';

import 'dotenv/config';

import createServerConfigurations from './utils/createServerConfigurations';

createServerConfigurations();

const app = express();

app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {});
