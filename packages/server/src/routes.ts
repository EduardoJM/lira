import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import {
    ProportionConservator,
    SurveyInteger,
    SurveyItem,
    Survey,
} from '@lira/survey';

import generateToken from './utils/token';

const routes = express.Router();

routes.get('/running', (request, response) => response.json({ running: true }));

routes.get('/new', async (request, response) => {
    /*const User = mongoose.model('User');
    const c = new Survey();
    c.items.push(new SurveyItem<SurveyInteger>(new SurveyInteger({
        minimun: 16,
        maximun: 120,
    }), 'Qual é a sua idade?'));
    User.create({
        email: 'eduardo_y05@outlook.com',
        completeName: 'Eduardo José de Oliveira',
        displayName: 'Eduardo Oliveira',
        userLevel: 0,
        password: '123456',
        surveys: [c],
    });
    return response.json({
        message: ProportionConservator.getSampleSize(0.95, 0.02),
    });*/
   return response.json({ p: await bcrypt.hash('00e11$22334455', 10) })
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

routes.post('/auth', async (request, response) => {
    const { email, password } = request.body;
    const User = mongoose.model('User');

    const userData = await User.where('email', email);

    if (!userData || userData.length === 0) {
        return response.status(400)
            .json({
                error: true,
                information: 'EMAIL_NOT_REGISTERED',
            });
    }

    if (!await bcrypt.compare(password, userData[0].password)) {
        return response.status(400)
            .json({
                error: true,
                information: 'WRONG_PASSWORD',
            });
    }

    const token = generateToken({ id: userData.id });

    const serializedUser = {
        ...userData,
        password: undefined,
    };

    return response.json({
        user: serializedUser,
        token,
    });
});

export default routes;
