"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _fbauth = require("./fbauth");

var _fbauth2 = _interopRequireDefault(_fbauth);

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

var _bucket = require("./bucket");

var _bucket2 = _interopRequireDefault(_bucket);

var _item = require("./item");

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use("/auth", _fbauth2.default);
router.use("/user", _user2.default);
router.use("/bucket", _bucket2.default);
router.use("/item", _item2.default);
exports.default = router;