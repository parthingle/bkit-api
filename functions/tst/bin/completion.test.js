"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _completion = require("../../src/bin/completion");

var Bin = _interopRequireWildcard(_completion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var allItems = [{ itemId: 1 }, { itemId: 2 }, { itemId: 3 }, { itemId: 4 }];

describe("completion", function () {
    describe("prepHome()", function () {
        it("returns 2 completed items", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var user, output;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            // Item 2 was completed at time 10, 3 was completed at 3
                            user = {
                                myBucketedItems: { 2: 10, 3: 3 }
                            };
                            _context.next = 3;
                            return Bin.prepHome(user, allItems);

                        case 3:
                            output = _context.sent;


                            _assert2.default.strictEqual(output.completionPercentage, 0.5);
                            _assert2.default.deepStrictEqual(output.items, [{
                                itemId: 1,
                                done: 0
                            }, {
                                itemId: 2,
                                done: 10
                            }, {
                                itemId: 3,
                                done: 3
                            }, {
                                itemId: 4,
                                done: 0
                            }]);

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        })));

        it("returns no completed items", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var user, output;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            // Item 2 was bucketed at time 10
                            user = {
                                myBucketedItems: {}
                            };
                            _context2.next = 3;
                            return Bin.prepHome(user, allItems);

                        case 3:
                            output = _context2.sent;


                            _assert2.default.strictEqual(output.completionPercentage, 0);
                            _assert2.default.deepStrictEqual(output.items, [{
                                itemId: 1,
                                done: 0
                            }, {
                                itemId: 2,
                                done: 0
                            }, {
                                itemId: 3,
                                done: 0
                            }, {
                                itemId: 4,
                                done: 0
                            }]);

                        case 6:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        it("return all completed items", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var user, output;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            // Item 2 was bucketed at time 10
                            user = {
                                myBucketedItems: { 1: 4, 2: 7, 3: 5, 4: 8 }
                            };
                            _context3.next = 3;
                            return Bin.prepHome(user, allItems);

                        case 3:
                            output = _context3.sent;

                            _assert2.default.strictEqual(output.completionPercentage, 1);
                            _assert2.default.deepStrictEqual(output.items, [{
                                itemId: 1,
                                done: 4
                            }, {
                                itemId: 2,
                                done: 7
                            }, {
                                itemId: 3,
                                done: 5
                            }, {
                                itemId: 4,
                                done: 8
                            }]);

                        case 6:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));
    });
});