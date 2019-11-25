"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verify_callback = exports.setStrategy = undefined;

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _jwt = require("../auth/jwt");

var JWT = _interopRequireWildcard(_jwt);

var _keys = require("../config/keys");

var _keys2 = _interopRequireDefault(_keys);

var _expressUnless = require("express-unless");

var _expressUnless2 = _interopRequireDefault(_expressUnless);

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var FacebookTokenStrategy = require("passport-facebook-token");

JWT.authenticateUser.unless = _expressUnless2.default;

var setStrategy = exports.setStrategy = function setStrategy() {
    _passport2.default.use(new FacebookTokenStrategy({
        clientID: _keys2.default.FB_APP_ID,
        clientSecret: _keys2.default.FB_APP_SECRET
    }, verify_callback));
};

var verify_callback = exports.verify_callback = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessToken, refreshToken, profile, next) {
        var user, err, rtoken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // Use `profile` to get facebook data (profile.id, profile.givenName, etc.)
                        user = void 0, err = void 0, rtoken = void 0;

                        rtoken = require("crypto").createHash("md5").update(profile.id + new Date().toString()).digest("hex");
                        _context.next = 4;
                        return _db2.default.Users.getProfileFromId(profile.id);

                    case 4:
                        user = _context.sent;

                        if (user) {
                            _context.next = 15;
                            break;
                        }

                        // If User exists in database, set to `user`, otherwise set user to:
                        user = {
                            profileId: profile.id,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            profilePic: profile.photos[0].value,
                            bio: "I'm a chump",
                            dateCreated: Date.now(),
                            signupComplete: true,
                            lastLogin: Date.now(),
                            myBucketedItems: {},
                            friends: [],
                            rtoken: rtoken
                        };
                        _context.prev = 7;
                        _context.next = 10;
                        return _db2.default.Users.createNewUser(user);

                    case 10:
                        _context.next = 15;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](7);

                        err = new Error("Database error!");

                    case 15:
                        _db2.default.Users.timestampProfile(user.profileId, "lastLogin");
                        return _context.abrupt("return", next(err, user));

                    case 17:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[7, 12]]);
    }));

    return function verify_callback(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();