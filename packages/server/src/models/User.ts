import mongoose from 'mongoose';

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
