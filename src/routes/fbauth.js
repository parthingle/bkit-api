import passport from 'passport';
import * as JWT from '../auth/jwt';
const ignoreAuthCheckPaths = ['/auth/facebook', '/user/my/:id', '/user/public/:id', '/bucket/get/:id'];


// Route
const fbRouter = require('express').Router()
fbRouter.use(JWT.authenticateUser.unless({ path: ignoreAuthCheckPaths }));

// Login endpoint
fbRouter.post('/facebook',
    // First verify if accessToken is valid (verify_callback: src/auth/fb.js:18)
    passport.authenticate('facebook-token', { session: false }),

    (req, res, next) => {
        
        //if req.user.signupComplete === false: res.status(201).send(...req.user)
        // else: next()

        next();
    }, JWT.generateToken, JWT.sendToken)

module.exports = fbRouter