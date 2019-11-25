"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBucketFromId = exports.resolveBuckets = undefined;

var _firebase = require("../config/firebase");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * Used as an internal function to resolve references
 */
var resolveBuckets = exports.resolveBuckets = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(buckets) {
        var resolvedBuckets;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        resolvedBuckets = void 0;

                        if (buckets) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt("return", Promise.resolve(null));

                    case 3:
                        _context.prev = 3;
                        _context.next = 6;
                        return Promise.all(buckets.map(function (bucket) {
                            return bucket.get().then(function (bucketSnapshot) {
                                return bucketSnapshot.data();
                            });
                        }));

                    case 6:
                        resolvedBuckets = _context.sent;
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](3);
                        return _context.abrupt("return", Promise.reject(_context.t0));

                    case 12:
                        return _context.abrupt("return", Promise.resolve(resolvedBuckets));

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[3, 9]]);
    }));

    return function resolveBuckets(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getBucketFromId = exports.getBucketFromId = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var bucket;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        bucket = void 0;
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _firebase.BUCKETS.doc(id).get();

                    case 4:
                        bucket = _context2.sent;

                        bucket = bucket.exists ? bucket.data() : null;
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2["catch"](1);
                        return _context2.abrupt("return", Promise.reject(_context2.t0));

                    case 11:
                        return _context2.abrupt("return", Promise.resolve(bucket));

                    case 12:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 8]]);
    }));

    return function getBucketFromId(_x2) {
        return _ref2.apply(this, arguments);
    };
}();