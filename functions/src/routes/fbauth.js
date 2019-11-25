"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _jwt = require("../auth/jwt");

var JWT = _interopRequireWildcard(_jwt);

var _UserHandlers = require("../handlers/UserHandlers");

var _UserHandlers2 = _interopRequireDefault(_UserHandlers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignoreAuthCheckPaths = ["/auth/facebook", "/auth/signup"];

// Route
var authRouter = require("express").Router();
authRouter.use(JWT.authenticateUser.unless({ path: ignoreAuthCheckPaths }));

// Login endpoint
authRouter.post("/facebook",
// First verify if accessToken is valid (verify_callback: src/auth/fb.js:18)
_passport2.default.authenticate("facebook-token", { session: false }), JWT.generateToken, JWT.sendToken);

// Expects a user object in `req.params.user`
authRouter.post("/signup", _UserHandlers2.default.newUser, function (req, res, next) {
    // jws.js expects there to be something in req.user so we have to update that field
    req.user = res.locals.newUser;
    next();
}, JWT.generateToken, function (req, res, next) {
    // generateToken populates req.token
    res.status(201).end(req.token);
});

authRouter.get("/status", function (req, res, next) {
    res.send(req.user ? 200 : 401);
});

authRouter.post("/refresh", _UserHandlers2.default.refreshUser, function (req, res, next) {
    if (req.error.name == "UserNotFoundError") {
        res.status(401).send({ message: "Refresh Token not valid" });
    } else {
        next();
    }
}, JWT.generateToken, JWT.sendToken);
module.exports = authRouter;