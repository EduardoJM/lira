import express from 'express';

import { Sample, ProportionConservator } from '@lira/survey';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({
        message: ProportionConservator.getSampleSize(0.95, 0.02)
    });
});

export default routes;
