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

routes.get('/update', (request, response) => {
    const User = mongoose.model('User');
    User.updateOne({ _id: '5fbb1596fbd39625ad32657c' }, {
        $set: {
            surveys: [],
        },
    }).then((data) => {
        if (data.nModified === 1) {
            return response.json({ message: 'updated' });
        }
        return response.status(400).json({ message: 'can\'t update' });
    }).catch(() => response.status(400).json({ message: 'can\'t update' }));
});

export default routes;
