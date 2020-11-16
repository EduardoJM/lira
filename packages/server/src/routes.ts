import express from 'express';

import { Sample, ProportionConservator } from '@lira/survey';

const routes = express.Router();

routes.get('/', (request, response) => {
    const s = new Sample();
    for (let i = 0; i < 2400; i += 1) {
        s.append({});
    }
    const p = new ProportionConservator();

    return response.json({
        message: p.getError(s, 0.95)
    });
});

export default routes;
