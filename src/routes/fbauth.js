import passport from "passport";
import * as JWT from "../auth/jwt";
import * as Users from "../db/userFunctions";
const ignoreAuthCheckPaths = ["/auth/facebook", "/auth/signup"];

// Route
const authRouter = require("express").Router();
authRouter.use(JWT.authenticateUser.unless({ path: ignoreAuthCheckPaths }));

// Login endpoint
authRouter.get(
    "/facebook",
    // First verify if accessToken is valid (verify_callback: src/auth/fb.js:18)
    passport.authenticate("facebook-token", { session: false }),

    (req, res, next) => {
        if (!req.user.signupComplete) {
            res.status(202).send(...req.user);
        } else next();
    },
    JWT.generateToken,
    JWT.sendToken
);

// Expects a user object in `req.params.user`
authRouter.post(
    "/signup",
    Users.newUser,
    (req, res, next) => {
        // jws.js expects there to be something in req.user so we have to update that field
        req.user = res.locals.newUser;
        next();
    },
    JWT.generateToken,
    (req, res, next) => {
        // generateToken populates req.token
        res.status(201).end(req.token);
    }
);

authRouter.get("/status", (req, res, next) => {
    res.send(req.user ? 200 : 401);
});

module.exports = authRouter;
