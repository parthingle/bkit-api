import passport from 'passport';
import * as JWT from '../auth/jwt';

var unless = require('expree-unless')
var ignoreAuthCheckPaths = ['/auth'];

JWT.authenticateUser.unless = unless;
JWT.getCurrentUser.unless = unless;

// Route
const fbRouter = require('express').Router()
fbRouter.use(JWT.authenticateUser.unless({ path: ignoreAuthCheckPaths }));
fbRouter.post('/auth',
    passport.authenticate('facebook-token', { session: false }),
    (req, res, next) => {
        if (!req.user['signUpComplete']) {
            res.status(401).send({ user: req.user })
            return
        }
        req.auth = {
            id: req.user.profileId
        };
        next();
    }, JWT.generateToken, JWT.sendToken)