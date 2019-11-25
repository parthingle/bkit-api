"use strict";

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _UserHandlers = require("../../src/handlers/UserHandlers");

var _UserHandlers2 = _interopRequireDefault(_UserHandlers);

var _db = require("../../src/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe("UserHandlers", function () {
    var userHandlers = void 0;
    var next = void 0;

    beforeEach(function () {
        userHandlers = _UserHandlers2.default;
        next = _sinon2.default.spy();
    });

    describe("getMyProfile()", function () {
        it("populates res.locals.user on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var getStub, req, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            getStub = _sinon2.default.stub(_db2.default.Users, "getProfileFromId");

                            getStub.resolves("test-response");

                            req = {
                                auth: {
                                    id: "test-id"
                                }
                            };
                            res = { locals: {} };

                            // Actual test

                            _context.next = 6;
                            return userHandlers.getMyProfile(req, res, next);

                        case 6:

                            (0, _assert2.default)(!next.args[0][0]);
                            _assert2.default.strictEqual(getStub.args[0][0], req.auth.id);
                            _assert2.default.strictEqual(res.locals.user, "test-response");

                        case 9:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it("responds with a 404 if no user exists and returns", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var req, res, statusSpy;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Users, "getProfileFromId").resolves(null);

                            req = {
                                auth: {
                                    id: "test-id"
                                }
                            };
                            res = {
                                status: function status() {
                                    return { json: function json() {} };
                                }
                            };
                            statusSpy = _sinon2.default.spy(res, "status");
                            _context2.next = 6;
                            return userHandlers.getMyProfile(req, res, next);

                        case 6:

                            (0, _assert2.default)(statusSpy.calledOnce);
                            (0, _assert2.default)(statusSpy.calledWith(404));

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Users, "getProfileFromId").throws();

                            req = {};
                            res = {};
                            _context3.next = 5;
                            return userHandlers.getMyProfile(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 7:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));
    });

    describe("getPublicProfile()", function () {
        it("populates res.locals.user on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var getStub, req, res;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            getStub = _sinon2.default.stub(_db2.default.Users, "getPublicProfileFromId");

                            getStub.resolves("test-response");

                            req = {
                                params: {
                                    id: "test-id"
                                }
                            };
                            res = { locals: {} };

                            // Actual test

                            _context4.next = 6;
                            return userHandlers.getPublicProfile(req, res, next);

                        case 6:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            _assert2.default.strictEqual(getStub.args[0][0], req.params.id);
                            _assert2.default.strictEqual(res.locals.user, "test-response");

                        case 10:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        })));

        it("responds with a 404 if no user exists and returns", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var req, res, statusSpy;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Users, "getPublicProfileFromId").resolves(null);

                            req = {
                                params: {
                                    id: "test-id"
                                }
                            };
                            res = {
                                status: function status() {
                                    return { json: function json() {} };
                                }
                            };
                            statusSpy = _sinon2.default.spy(res, "status");
                            _context5.next = 6;
                            return userHandlers.getPublicProfile(req, res, next);

                        case 6:

                            (0, _assert2.default)(statusSpy.calledOnce);
                            (0, _assert2.default)(statusSpy.calledWith(404));
                            (0, _assert2.default)(next.notCalled);

                        case 9:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Users, "getPublicProfileFromId").throws();

                            req = {};
                            res = {};
                            _context6.next = 5;
                            return userHandlers.getPublicProfile(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 7:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        })));
    });

    describe("resolveUserBuckets()", function () {
        it("updates res.locals.users.myBuckets on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var resolveStub, req, res;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            resolveStub = _sinon2.default.stub(_db2.default.Buckets, "resolveBuckets").resolves("test-response");
                            req = {};
                            res = {
                                locals: {
                                    user: {
                                        myBuckets: "test-bucket"
                                    }
                                }
                            };
                            _context7.next = 5;
                            return userHandlers.resolveUserBuckets(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            (0, _assert2.default)(resolveStub.args[0][0], "test-bucket");
                            _assert2.default.strictEqual(res.locals.user.myBuckets, "test-response");

                        case 9:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Buckets, "resolveBuckets").throws();

                            req = {};
                            res = {};
                            _context8.next = 5;
                            return userHandlers.resolveUserBuckets(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 7:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, undefined);
        })));
    });

    describe("resolveUserItems()", function () {
        it("updates res.locals.users.myBucketItems on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var resolveStub, req, res;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            resolveStub = _sinon2.default.stub(_db2.default.Items, "resolveItems").resolves("test-response");
                            req = {};
                            res = {
                                locals: {
                                    user: {
                                        myBucketItems: "test-bucket-item"
                                    }
                                }
                            };
                            _context9.next = 5;
                            return userHandlers.resolveUserItems(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            (0, _assert2.default)(resolveStub.args[0][0], "test-bucket-item");
                            _assert2.default.strictEqual(res.locals.user.myBucketItems, "test-response");

                        case 9:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Items, "resolveItems").throws();

                            req = {};
                            res = {};
                            _context10.next = 5;
                            return userHandlers.resolveUserItems(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 7:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, undefined);
        })));
    });

    describe("newUser()", function () {
        it("updates res.locals.newUser on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
            var createStub, req, res;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            createStub = _sinon2.default.stub(_db2.default.Users, "createNewUser").resolves("test-response");
                            req = {
                                body: {
                                    user: "test-user"
                                }
                            };
                            res = {
                                locals: {}
                            };
                            _context11.next = 5;
                            return userHandlers.newUser(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            (0, _assert2.default)(createStub.args[0][0], "test-user");
                            (0, _assert2.default)(createStub.calledOnce);
                            _assert2.default.strictEqual(res.locals.newUser, "test-response");

                        case 10:
                        case "end":
                            return _context11.stop();
                    }
                }
            }, _callee11, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Users, "createNewUser").throws();

                            req = {};
                            res = {};
                            _context12.next = 5;
                            return userHandlers.newUser(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 7:
                        case "end":
                            return _context12.stop();
                    }
                }
            }, _callee12, undefined);
        })));
    });

    describe("getHomePage()", function () {
        it("updates res.locals.home on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
            var profileStub, itemStub, req, res;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            profileStub = _sinon2.default.stub(_db2.default.Users, "getProfileFromId").resolves({
                                myBucketedItems: {
                                    itemId: 1234
                                }
                            });
                            itemStub = _sinon2.default.stub(_db2.default.Items, "getAll").resolves([{
                                itemId: 1234
                            }]);
                            req = {
                                auth: {
                                    id: "test-id"
                                }
                            };
                            res = {
                                locals: {}
                            };
                            _context13.next = 6;
                            return userHandlers.getHomePage(req, res, next);

                        case 6:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            (0, _assert2.default)(profileStub.args[0][0], "test-profile");
                            (0, _assert2.default)(itemStub.calledOnce);
                            (0, _assert2.default)(res.locals.home);

                        case 11:
                        case "end":
                            return _context13.stop();
                    }
                }
            }, _callee13, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Users, "createNewUser").throws();

                            req = {};
                            res = {};
                            _context14.next = 5;
                            return userHandlers.getHomePage(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 7:
                        case "end":
                            return _context14.stop();
                    }
                }
            }, _callee14, undefined);
        })));
    });

    afterEach(function () {
        // Restore the default sandbox here
        _sinon2.default.restore();
    });
});