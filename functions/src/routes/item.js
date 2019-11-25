"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

var _ItemHandlers = require("../handlers/ItemHandlers");

var _ItemHandlers2 = _interopRequireDefault(_ItemHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var itemRouter = _express2.default.Router();
var itemHandlers = new _ItemHandlers2.default(_db2.default);

itemRouter.get("/:id", itemHandlers.getItem, function (req, res) {
    res.status(200).send(res.locals.item);
    return;
});

// We are no longer using this feature
// itemRouter.post("/", itemHandlers.newItem, (req, res) => {
//     res.status(200).send(res.locals.newItem.id);
//     return;
// });

itemRouter.post("/buck/:id", itemHandlers.buckItem, function (req, res) {
    res.status(200).send({ message: "item bucked!" });
});
exports.default = itemRouter;