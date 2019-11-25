"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lookupUserByRefreshToken = exports.setObject = exports.createNewUser = exports.resolveUserItems = exports.resolveUserBuckets = exports.getPublicProfileFromId = exports.timestampProfile = exports.getProfileFromId = undefined;

var _firebase = require("../config/firebase");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getProfileFromId = exports.getProfileFromId = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var user, userSnapshot;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = void 0, userSnapshot = void 0;
                        _context.prev = 1;
                        _context.next = 4;
                        return _firebase.USERS.doc(id).get();

                    case 4:
                        userSnapshot = _context.sent;

                        user = userSnapshot.exists ? userSnapshot.data() : null;
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](1);
                        return _context.abrupt("return", Promise.reject(_context.t0));

                    case 11:
                        return _context.abrupt("return", Promise.resolve(user));

                    case 12:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 8]]);
    }));

    return function getProfileFromId(_x) {
        return _ref.apply(this, arguments);
    };
}();

var timestampProfile = exports.timestampProfile = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, field) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _firebase.USERS.doc(id).update(_defineProperty({}, field, Date.now()));

                    case 3:
                        _context2.next = 8;
                        break;

                    case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2["catch"](0);
                        return _context2.abrupt("return", Promise.reject(_context2.t0));

                    case 8:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 5]]);
    }));

    return function timestampProfile(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getPublicProfileFromId = exports.getPublicProfileFromId = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var user, fullUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        user = void 0, fullUser = void 0;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return getProfileFromId(id);

                    case 4:
                        fullUser = _context3.sent;

                        user = fullUser ? {
                            firstName: fullUser.firstName,
                            lastName: fullUser.lastName,
                            profilePic: fullUser.profilePic,
                            bio: fullUser.bio,
                            myBuckets: fullUser.myBuckets,
                            myItems: fullUser.myItems
                        } : null;
                        _context3.next = 11;
                        break;

                    case 8:
                        _context3.prev = 8;
                        _context3.t0 = _context3["catch"](1);
                        return _context3.abrupt("return", Promise.reject(_context3.t0));

                    case 11:
                        return _context3.abrupt("return", Promise.resolve(user));

                    case 12:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 8]]);
    }));

    return function getPublicProfileFromId(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var resolveUserBuckets = exports.resolveUserBuckets = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
        var buckets;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        buckets = void 0;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return Promise.all(user.buckets.map(function (b) {
                            return b.get();
                        }));

                    case 4:
                        _context4.t0 = function (b) {
                            return b.data();
                        };

                        buckets = _context4.sent.map(_context4.t0);
                        _context4.next = 11;
                        break;

                    case 8:
                        _context4.prev = 8;
                        _context4.t1 = _context4["catch"](1);
                        return _context4.abrupt("return", Promise.reject(_context4.t1));

                    case 11:
                        return _context4.abrupt("return", Promise.resolve(buckets));

                    case 12:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 8]]);
    }));

    return function resolveUserBuckets(_x5) {
        return _ref4.apply(this, arguments);
    };
}();

var resolveUserItems = exports.resolveUserItems = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(user) {
        var items;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        items = void 0;
                        _context5.prev = 1;
                        _context5.next = 4;
                        return Promise.all(user.items.map(function (bi) {
                            return bi.get();
                        }));

                    case 4:
                        _context5.t0 = function (bi) {
                            return bi.data();
                        };

                        items = _context5.sent.map(_context5.t0);
                        _context5.next = 12;
                        break;

                    case 8:
                        _context5.prev = 8;
                        _context5.t1 = _context5["catch"](1);

                        next(_context5.t1);
                        return _context5.abrupt("return", Promise.reject(_context5.t1));

                    case 12:
                        Promise.resolve(items);

                    case 13:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[1, 8]]);
    }));

    return function resolveUserItems(_x6) {
        return _ref5.apply(this, arguments);
    };
}();

var createNewUser = exports.createNewUser = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(user) {
        var newUser;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        newUser = void 0;
                        _context6.prev = 1;
                        _context6.next = 4;
                        return _firebase.USERS.doc(user.profileId).set(user);

                    case 4:
                        newUser = _context6.sent;
                        _context6.next = 10;
                        break;

                    case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6["catch"](1);
                        return _context6.abrupt("return", Promise.reject(_context6.t0));

                    case 10:
                        return _context6.abrupt("return", Promise.resolve(newUser));

                    case 11:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[1, 7]]);
    }));

    return function createNewUser(_x7) {
        return _ref6.apply(this, arguments);
    };
}();

var setObject = exports.setObject = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(uid, iid, field) {
        var user, userRef, key;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        user = void 0, userRef = void 0;
                        _context7.prev = 1;

                        userRef = _firebase.USERS.doc(uid);
                        _context7.next = 5;
                        return userRef.get();

                    case 5:
                        user = _context7.sent;

                        if (!user.exists) {
                            _context7.next = 13;
                            break;
                        }

                        key = field + "." + iid;
                        _context7.next = 10;
                        return userRef.update(_defineProperty({}, [key], new Date().getTime()));

                    case 10:
                        return _context7.abrupt("return", true);

                    case 13:
                        throw new Error("User does not exist");

                    case 14:
                        _context7.next = 19;
                        break;

                    case 16:
                        _context7.prev = 16;
                        _context7.t0 = _context7["catch"](1);
                        return _context7.abrupt("return", Promise.reject(_context7.t0));

                    case 19:
                    case "end":
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[1, 16]]);
    }));

    return function setObject(_x8, _x9, _x10) {
        return _ref7.apply(this, arguments);
    };
}();

var lookupUserByRefreshToken = exports.lookupUserByRefreshToken = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(rtoken) {
        var user, userSnapshot, e;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        user = void 0, userSnapshot = void 0;
                        _context8.prev = 1;
                        _context8.next = 4;
                        return _firebase.USERS.where("rtoken", "==", rtoken).get();

                    case 4:
                        userSnapshot = _context8.sent;

                        if (!userSnapshot.empty) {
                            _context8.next = 9;
                            break;
                        }

                        e = new Error("User does not exist");

                        e.name = "UserNotFoundError";
                        throw e;

                    case 9:
                        user = userSnapshot[0].data();
                        _context8.next = 15;
                        break;

                    case 12:
                        _context8.prev = 12;
                        _context8.t0 = _context8["catch"](1);
                        return _context8.abrupt("return", Promise.reject(_context8.t0));

                    case 15:
                        return _context8.abrupt("return", Promise.resolve(user));

                    case 16:
                    case "end":
                        return _context8.stop();
                }
            }
        }, _callee8, undefined, [[1, 12]]);
    }));

    return function lookupUserByRefreshToken(_x11) {
        return _ref8.apply(this, arguments);
    };
}();