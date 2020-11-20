import express from 'express';

import { ProportionConservator } from '@lira/survey';

const routes = express.Router();

routes.get('/running', (request, response) => response.json({ running: true }));

routes.get('/', (request, response) => {
    return response.json({
        message: ProportionConservator.getSampleSize(0.95, 0.02)
    });
});

export default routes;
