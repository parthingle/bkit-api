"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _completion = require("../bin/completion");

var Bin = _interopRequireWildcard(_completion);

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserHandlers = function UserHandlers(db) {
    var _this = this;

    _classCallCheck(this, UserHandlers);

    this.getMyProfile = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            var user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            user = void 0;
                            _context.prev = 1;
                            _context.next = 4;
                            return db.Users.getProfileFromId(req.auth.id);

                        case 4:
                            user = _context.sent;

                            if (user) {
                                _context.next = 8;
                                break;
                            }

                            res.status(404).json({ message: "User not found!" });
                            return _context.abrupt("return");

                        case 8:
                            _context.next = 14;
                            break;

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context["catch"](1);

                            next(_context.t0);
                            return _context.abrupt("return");

                        case 14:
                            res.locals.user = user;
                            next();

                        case 16:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 10]]);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();

    this.refreshUser = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var user;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            user = void 0;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return db.Users.lookupUserByRefreshToken(req.body.rtoken);

                        case 4:
                            user = _context2.sent;
                            _context2.next = 11;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](1);

                            next(_context2.t0);
                            return _context2.abrupt("return");

                        case 11:
                            res.locals.user = user;
                            next();

                        case 13:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[1, 7]]);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }();

    this.getPublicProfile = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
            var user;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            user = void 0;
                            _context3.prev = 1;
                            _context3.next = 4;
                            return db.Users.getPublicProfileFromId(req.params.id);

                        case 4:
                            user = _context3.sent;

                            if (user) {
                                _context3.next = 8;
                                break;
                            }

                            res.status(404).json({ message: "User not found!" });
                            return _context3.abrupt("return");

                        case 8:
                            _context3.next = 14;
                            break;

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3["catch"](1);

                            next(_context3.t0);
                            return _context3.abrupt("return");

                        case 14:
                            res.locals.user = user;
                            next();

                        case 16:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[1, 10]]);
        }));

        return function (_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }();

    this.resolveUserBuckets = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
            var myBuckets;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            myBuckets = void 0;
                            _context4.prev = 1;
                            _context4.next = 4;
                            return db.Buckets.resolveBuckets(res.locals.user.myBuckets);

                        case 4:
                            myBuckets = _context4.sent;
                            _context4.next = 11;
                            break;

                        case 7:
                            _context4.prev = 7;
                            _context4.t0 = _context4["catch"](1);

                            next(_context4.t0);
                            return _context4.abrupt("return");

                        case 11:
                            res.locals.user.myBuckets = myBuckets;
                            next();

                        case 13:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[1, 7]]);
        }));

        return function (_x10, _x11, _x12) {
            return _ref4.apply(this, arguments);
        };
    }();

    this.resolveUserItems = function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
            var myBucketItems;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            myBucketItems = void 0;
                            _context5.prev = 1;
                            _context5.next = 4;
                            return db.Items.resolveItems(res.locals.user.myBucketItems);

                        case 4:
                            myBucketItems = _context5.sent;
                            _context5.next = 11;
                            break;

                        case 7:
                            _context5.prev = 7;
                            _context5.t0 = _context5["catch"](1);

                            next(_context5.t0);
                            return _context5.abrupt("return");

                        case 11:
                            res.locals.user.myBucketItems = myBucketItems;
                            next();

                        case 13:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this, [[1, 7]]);
        }));

        return function (_x13, _x14, _x15) {
            return _ref5.apply(this, arguments);
        };
    }();

    this.newUser = function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
            var newUser;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            newUser = void 0;
                            _context6.prev = 1;
                            _context6.next = 4;
                            return db.Users.createNewUser(req.body.user);

                        case 4:
                            newUser = _context6.sent;
                            _context6.next = 11;
                            break;

                        case 7:
                            _context6.prev = 7;
                            _context6.t0 = _context6["catch"](1);

                            next(_context6.t0);
                            return _context6.abrupt("return");

                        case 11:
                            res.locals.newUser = newUser;
                            next();

                        case 13:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this, [[1, 7]]);
        }));

        return function (_x16, _x17, _x18) {
            return _ref6.apply(this, arguments);
        };
    }();

    this.getHomePage = function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
            var thisUser, allItems, home;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            thisUser = void 0, allItems = void 0, home = void 0;
                            _context7.prev = 1;
                            _context7.next = 4;
                            return db.Users.getProfileFromId(req.auth.id);

                        case 4:
                            thisUser = _context7.sent;
                            _context7.next = 7;
                            return db.Items.getAll();

                        case 7:
                            allItems = _context7.sent;
                            _context7.next = 14;
                            break;

                        case 10:
                            _context7.prev = 10;
                            _context7.t0 = _context7["catch"](1);

                            next(_context7.t0);
                            return _context7.abrupt("return");

                        case 14:
                            _context7.next = 16;
                            return Bin.prepHome(thisUser, allItems);

                        case 16:
                            home = _context7.sent;

                            res.locals.home = home;
                            next();

                        case 19:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this, [[1, 10]]);
        }));

        return function (_x19, _x20, _x21) {
            return _ref7.apply(this, arguments);
        };
    }();
};

exports.default = new UserHandlers(_db2.default);