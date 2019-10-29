import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import unless from "express-unless";
import keys from "../config/keys";

export const createToken = userID => {
    return jwt.sign(
        {
            id: userID
        },
        keys.JWT_SECRET,
        {
            expiresIn: "120m"
        }
    );
};

export const generateToken = (req, res, next) => {
    var profileId;
    profileId = req.user ? req.user.profileId : res.locals.user.profileId;
    req.token = createToken(profileId);
    next();
};

export const sendToken = (req, res) => {
    res.setHeader("x-auth-token", req.token);
    var rtoken = req.user ? req.user.rtoken : res.locals.user.rtoken;
    res.status(200).send({
        jwtoken: req.token,
        rtoken: rtoken
    });
};

// This implicitly puts the user id into req.auth
export const authenticateUser = expressJwt({
    secret: keys.JWT_SECRET,
    requestProperty: "auth",
    getToken: req => {
        if (req.headers["x-auth-token"]) {
            return req.headers["x-auth-token"];
        }
        console.log("Not authorized!");
        return null;
    }
});
authenticateUser.unless = unless;
