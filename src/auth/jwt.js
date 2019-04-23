import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import keys from "../config/keys";

export const createToken = userID => {
    return jwt.sign(
        {
            id: userID.id
        },
        keys.JWT_SECRET,
        {
            expiresIn: 60 * 120
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
