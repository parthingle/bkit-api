"use strict";

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _ItemHandlers = require("../../src/handlers/ItemHandlers");

var _ItemHandlers2 = _interopRequireDefault(_ItemHandlers);

var _db = require("../../src/db");

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe("ItemHandlers", function () {
    var itemHandlers = void 0;
    var next = void 0;

    beforeEach(function () {
        itemHandlers = new _ItemHandlers2.default(_db2.default);
        next = _sinon2.default.spy();
    });

    describe("getItem()", function () {
        it("populates res.locals.item on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var itemStub, req, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            itemStub = _sinon2.default.stub(_db2.default.Items, "getItemFromId");

                            itemStub.resolves("test-response");

                            req = {
                                params: {
                                    id: "test-id"
                                }
                            };
                            res = { locals: {} };

                            // Actual test

                            _context.next = 6;
                            return itemHandlers.getItem(req, res, next);

                        case 6:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            _assert2.default.strictEqual(itemStub.args[0][0], req.params.id);
                            _assert2.default.strictEqual(res.locals.item, "test-response");

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it("responds with a 404 if no item exists", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var req, res, statusSpy;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Items, "getItemFromId").resolves(null);

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
                            return itemHandlers.getItem(req, res, next);

                        case 6:

                            (0, _assert2.default)(statusSpy.calledOnce);
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
            var req, res;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Items, "getItemFromId").throws();

                            req = {};
                            res = {};
                            _context3.next = 5;
                            return itemHandlers.getItem(req, res, next);

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

    describe("newItem()", function () {
        it("populates res.locals.newItem on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var createStub, req, res;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            createStub = _sinon2.default.stub(_db2.default.Items, "createNewItem").resolves("test-response");
                            req = {
                                body: {
                                    item: "item-id"
                                },
                                auth: {
                                    id: "fake-id"
                                }
                            };
                            res = {
                                locals: {
                                    newItem: {}
                                }
                            };
                            _context4.next = 5;
                            return itemHandlers.newItem(req, res, next);

                        case 5:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            (0, _assert2.default)(createStub.args[0], [req.body.item, req.auth.id]);
                            _assert2.default.strictEqual(res.locals.newItem, "test-response");

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
                            _sinon2.default.stub(_db2.default.Items, "createNewItem").throws();

                            req = {};
                            res = {};
                            _context5.next = 5;
                            return itemHandlers.newItem(req, res, next);

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

    describe("buckItem()", function () {
        it("does nothing on success", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var insertStub, updateStub, req, res;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            insertStub = _sinon2.default.stub(_db2.default.Items, "insertIntoArray");
                            updateStub = _sinon2.default.stub(_db2.default.Users, "setObject");
                            req = {
                                auth: {
                                    id: "fake-id"
                                },
                                params: {
                                    id: "test-id"
                                }
                            };
                            res = {};
                            _context6.next = 6;
                            return itemHandlers.buckItem(req, res, next);

                        case 6:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(!next.args[0][0]);
                            (0, _assert2.default)(insertStub.args[0], [req.auth.id, "usersWhoBucketed", req.params.id]);
                            (0, _assert2.default)(updateStub.args[0], [req.auth.id, req.params.id, "myBucketedItems"]);
                            (0, _assert2.default)(insertStub.calledOnce);
                            (0, _assert2.default)(updateStub.calledOnce);

                        case 12:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        })));

        it("calls next() once with the error on exception", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var req, res;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _sinon2.default.stub(_db2.default.Items, "insertIntoArray").throws();
                            _sinon2.default.stub(_db2.default.Users, "setObject").throws();

                            req = {};
                            res = {};
                            _context7.next = 6;
                            return itemHandlers.buckItem(req, res, next);

                        case 6:

                            (0, _assert2.default)(next.calledOnce);
                            (0, _assert2.default)(next.args[0][0]);

                        case 8:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined);
        })));
    });

    afterEach(function () {
        // Restore the default sandbox here
        _sinon2.default.restore();
    });
});