var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

const data = [
    {
        model: 'User',
        documents: [
            {
                email: 'eduardo_y05@outlook.com',
                completeName: 'Eduardo José de Oliveira',
                displayName: 'Eduardo Oliveira',
                userLevel: 0,
                password: '$2a$10$.sWUADxILlv/10gEuWQPZ.3wmMppWckcLs4BTx3lkPIXE2TmPhIXS',
                surveys: []
            }
        ]
    }
];

seeder.connect('mongodb://localhost:27018/lira-db', function() {
    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
        },
        completeName: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        userLevel: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        surveys: {
            type: mongoose.SchemaTypes.Mixed,
            required: false,
        },
    });
    
    mongoose.model('User', UserSchema);

    seeder.clearModels(['User'], function(){
        seeder.populateModels(data, function(){
            seeder.disconnect();
        });
    });
});
