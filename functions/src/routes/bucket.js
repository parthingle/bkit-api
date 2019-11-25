"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

var _BucketHandlers = require("../handlers/BucketHandlers");

var _BucketHandlers2 = _interopRequireDefault(_BucketHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bucketRouter = _express2.default.Router();
var bucketHandlers = new _BucketHandlers2.default(_db2.default);

bucketRouter.get("/:id", bucketHandlers.getBucket, bucketHandlers.resolveItems, function (req, res) {
    res.status(200).send(res.locals.bucket);
    return;
});

exports.default = bucketRouter;