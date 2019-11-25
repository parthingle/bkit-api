"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BucketHandlers = function BucketHandlers(db) {
    var _this = this;

    _classCallCheck(this, BucketHandlers);

    this.getBucket = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            var bucket;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            bucket = void 0;
                            _context.prev = 1;
                            _context.next = 4;
                            return db.Buckets.getBucketFromId(req.params.id);

                        case 4:
                            bucket = _context.sent;

                            if (bucket) {
                                _context.next = 8;
                                break;
                            }

                            res.status(404).json({ message: "Bucket not found!" });
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
                            res.locals.bucket = bucket;
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

    this.resolveItems = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var items;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            items = void 0;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return db.Items.resolveItems(res.locals.bucket.items);

                        case 4:
                            items = _context2.sent;
                            _context2.next = 11;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](1);

                            next(_context2.t0);
                            return _context2.abrupt("return");

                        case 11:
                            res.locals.bucket.items = items;
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
};

exports.default = BucketHandlers;