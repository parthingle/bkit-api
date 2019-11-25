"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticateUser = exports.sendToken = exports.generateToken = exports.createToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _expressUnless = require("express-unless");

var _expressUnless2 = _interopRequireDefault(_expressUnless);

var _keys = require("../config/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createToken = exports.createToken = function createToken(userID) {
    return _jsonwebtoken2.default.sign({
        id: userID
    }, _keys2.default.JWT_SECRET, {
        expiresIn: "120m"
    });
};

var generateToken = exports.generateToken = function generateToken(req, res, next) {
    var profileId;
    profileId = req.user ? req.user.profileId : res.locals.user.profileId;
    req.token = createToken(profileId);
    next();
};

var sendToken = exports.sendToken = function sendToken(req, res) {
    res.setHeader("x-auth-token", req.token);
    var rtoken = req.user ? req.user.rtoken : res.locals.user.rtoken;
    res.status(200).send({
        jwtoken: req.token,
        rtoken: rtoken
    });
};

// This implicitly puts the user id into req.auth
var authenticateUser = exports.authenticateUser = (0, _expressJwt2.default)({
    secret: _keys2.default.JWT_SECRET,
    requestProperty: "auth",
    getToken: function getToken(req) {
        if (req.headers["x-auth-token"]) {
            return req.headers["x-auth-token"];
        }
        console.log("Not authorized!");
        return null;
    }
});
authenticateUser.unless = _expressUnless2.default;