import express from 'express';
import mongoose from 'mongoose';

import {
    ProportionConservator,
    SurveyInteger,
    SurveyItem,
    Survey
} from '@lira/survey';

const routes = express.Router();

routes.get('/running', (request, response) => response.json({ running: true }));

routes.get('/new', (request, response) => {
    const User = mongoose.model('User');
    const c = new Survey();
    c.items.push(new SurveyItem<SurveyInteger>(new SurveyInteger({
        minimun: 16,
        maximun: 120,
    }), 'Qual é a sua idade?'));
    User.create({
        completeName: 'Eduardo José de Oliveira',
        displayName: 'Eduardo Oliveira',
        userLevel: 0,
        password: '123456',
        surveys: [c],
    });
    return response.json({
        message: ProportionConservator.getSampleSize(0.95, 0.02),
    });
});

export default routes;
