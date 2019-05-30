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
    req.token = createToken(req.user.profileId);
    next();
};

export const sendToken = (req, res) => {
    res.setHeader("x-auth-token", req.token);
    res.status(200).send({ jwtoken: req.token });
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
