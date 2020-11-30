import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const generateToken = (params = {}) => jwt.sign(
    params,
    authConfig.appHash,
    {
        expiresIn: 86400,
    },
);

export default generateToken;
