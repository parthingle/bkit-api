"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ITEMS = exports.BUCKETS = exports.USERS = exports.FieldValue = undefined;

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

var _keys = require("./keys");

var _keys2 = _interopRequireDefault(_keys);

var _serviceAccountKey = require("./serviceAccountKey.json");

var _serviceAccountKey2 = _interopRequireDefault(_serviceAccountKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: Use database from environment variables instead of being hardcoded
admin.initializeApp({
    credential: admin.credential.cert(_serviceAccountKey2.default),
    databaseURL: _keys2.default.DATABASE_URL
});

var FieldValue = exports.FieldValue = admin.firestore.FieldValue;

var db = admin.firestore();
var USERS = exports.USERS = db.collection("Users");
var BUCKETS = exports.BUCKETS = db.collection("Buckets");
var ITEMS = exports.ITEMS = db.collection("Items");

exports.default = db;