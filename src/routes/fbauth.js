import passport from "passport";
import * as JWT from "../auth/jwt";

import db from "../db";
import UserHandlers from "../handlers/UserHandlers";

const ignoreAuthCheckPaths = ["/auth/facebook", "/auth/signup"];
const userHandlers = new UserHandlers(db);

// Route
const authRouter = require("express").Router();
authRouter.use(JWT.authenticateUser.unless({ path: ignoreAuthCheckPaths }));

// Login endpoint
authRouter.post(
    "/facebook",
    // First verify if accessToken is valid (verify_callback: src/auth/fb.js:18)
    passport.authenticate("facebook-token", { session: false }),
    JWT.generateToken,
    JWT.sendToken
);

// Expects a user object in `req.params.user`
authRouter.post(
    "/signup",
    userHandlers.newUser,
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
