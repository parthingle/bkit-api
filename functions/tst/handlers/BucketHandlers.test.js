"use strict";

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _BucketHandlers = require("../../src/handlers/BucketHandlers");

var _BucketHandlers2 = _interopRequireDefault(_BucketHandlers);

var _db = require("../../src/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe("BucketHandlers", function () {
    var bucketHandlers = void 0;
    var next = void 0;

    beforeEach(function () {
        bucketHandlers = new _BucketHandlers2.default(_db2.default);
        next = _sinon2.default.spy();
    });

    describe("getBucket()", function () {
        it("populates res.locals.bucket on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var getStub, req, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            getStub = _sinon2.default.stub(_db2.default.Buckets, "getBucketFromId").resolves("test-response");
                            req = {
                                params: {
                                    id: "test-id"
                                }
                            };
                            res = { locals: {} };
                            _context.next = 5;
                            return bucketHandlers.getBucket(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            _assert2.default.strictEqual(getStub.args[0][0], req.params.id);
                            _assert2.default.strictEqual(res.locals.bucket, "test-response");

                        case 9:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it("responds with a 404 if no bucket exists", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var getStub, req, res, statusSpy;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            getStub = _sinon2.default.stub(_db2.default.Buckets, "getBucketFromId").resolves(null);
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
                            _context2.next = 6;
                            return bucketHandlers.getBucket(req, res, next);

                        case 6:

                            _assert2.default.strictEqual(getStub.args[0][0], req.params.id);
                            (0, _assert2.default)(statusSpy.calledWith(404));
                            (0, _assert2.default)(next.notCalled);

                        case 9:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var getStub, req, res;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            getStub = _sinon2.default.stub(_db2.default.Buckets, "getBucketFromId").throws();
                            req = {
                                params: {
                                    id: "test-id"
                                }
                            };
                            res = {
                                locals: {
                                    bucket: {
                                        items: "test-item"
                                    }
                                }
                            };
                            _context3.next = 5;
                            return bucketHandlers.getBucket(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);
                            (0, _assert2.default)(getStub.args[0][0], req.params.id);
                            (0, _assert2.default)(getStub.threw);

                        case 9:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));
    });

    describe("resolveItems()", function () {
        it("populates res.locals.bucket.items on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var resolveStub, req, res;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            resolveStub = _sinon2.default.stub(_db2.default.Items, "resolveItems").resolves("test-response");
                            req = {};
                            res = {
                                locals: {
                                    bucket: {
                                        items: "test-item"
                                    }
                                }
                            };
                            _context4.next = 5;
                            return bucketHandlers.resolveItems(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            (0, _assert2.default)(resolveStub.args[0][0], res.locals.bucket.items);
                            _assert2.default.strictEqual(res.locals.bucket.items, "test-response");

                        case 9:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Items, "resolveItems").throws();

                            req = {};
                            res = {};
                            _context5.next = 5;
                            return bucketHandlers.resolveItems(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 7:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        })));
    });

    afterEach(function () {
        // Restore the default sandbox here
        _sinon2.default.restore();
    });
});