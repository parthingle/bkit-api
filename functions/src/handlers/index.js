"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BucketHandlers = require("./BucketHandlers");

var _BucketHandlers2 = _interopRequireDefault(_BucketHandlers);

var _ItemHandlers = require("./ItemHandlers");

var _ItemHandlers2 = _interopRequireDefault(_ItemHandlers);

var _UserHandlers = require("./UserHandlers");

var _UserHandlers2 = _interopRequireDefault(_UserHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    BucketHandlers: _BucketHandlers2.default,
    ItemHandlers: _ItemHandlers2.default,
    UserHandlers: _UserHandlers2.default
};