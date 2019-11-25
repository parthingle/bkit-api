"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.api = undefined;

require("babel-polyfill");

var app = require("./src/index.js");
var httpServer = require("http").Server(app);
var functions = require("firebase-functions");

httpServer.listen(app.get("port"), function () {
    console.log("Listening on port: ", app.get("port"));
});

var api = exports.api = functions.https.onRequest(app);