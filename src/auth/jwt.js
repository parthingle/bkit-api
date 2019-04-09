import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import * as firebase from '../config/firebase.js';
import keys from '../config/keys'

export function createToken(auth) {
    console.log("Inside Create token");
    return jwt.sign({
        id: auth.id
    }, keys.JWT_SECRET,
        {
            expiresIn: 60 * 120
        });
};

export const  generateToken = (req, res, next) => {
    console.log(req.auth)
    req.token = createToken(req.auth);
    next();
};

export const sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send({ auth: req.auth, jwtoken: req.token })
};

export const authenticateUser = expressJwt({
    secret: keys.JWT_SECRET,
    requestProperty: 'auth',
    getToken: (req) => {
        if (req.headers['x-auth-token']) {
            return (req.headers['x-auth-token']);
        }
        return null;
    }
});
