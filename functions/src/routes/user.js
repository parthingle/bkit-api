"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _UserHandlers = require("../handlers/UserHandlers");

var _UserHandlers2 = _interopRequireDefault(_UserHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();

userRouter.get("/my", _UserHandlers2.default.getMyProfile, _UserHandlers2.default.resolveUserBuckets, _UserHandlers2.default.resolveUserItems, function (req, res) {
    res.status(200).send(res.locals.user);
    return;
});
userRouter.get("/public/:id", _UserHandlers2.default.getPublicProfile, _UserHandlers2.default.resolveUserBuckets, _UserHandlers2.default.resolveUserItems, function (req, res) {
    res.status(200).send(res.locals.user);
    return;
});

userRouter.get("/home", _UserHandlers2.default.getHomePage, function (req, res) {
    res.status(200).send(res.locals.home);
    return;
});

exports.default = userRouter;