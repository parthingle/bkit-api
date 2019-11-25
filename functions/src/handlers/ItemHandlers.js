"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemHandlers = function ItemHandlers(db) {
    var _this = this;

    _classCallCheck(this, ItemHandlers);

    this.getItem = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            var item;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            item = void 0;
                            _context.prev = 1;
                            _context.next = 4;
                            return db.Items.getItemFromId(req.params.id);

                        case 4:
                            item = _context.sent;

                            if (item) {
                                _context.next = 8;
                                break;
                            }

                            res.status(404).json({ message: "Item not found!" });
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
                            res.locals.item = item;
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

    this.newItem = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var newItem;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            newItem = void 0;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return db.Items.createNewItem(req.body.item, req.auth.id);

                        case 4:
                            newItem = _context2.sent;
                            _context2.next = 11;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](1);

                            next(_context2.t0);
                            return _context2.abrupt("return");

                        case 11:
                            res.locals.newItem = newItem;
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

    this.buckItem = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return db.Items.insertIntoArray(req.auth.id, "usersWhoBucketed", req.params.id);

                        case 3:
                            _context3.next = 5;
                            return db.Users.setObject(req.auth.id, req.params.id, "myBucketedItems");

                        case 5:
                            _context3.next = 11;
                            break;

                        case 7:
                            _context3.prev = 7;
                            _context3.t0 = _context3["catch"](0);

                            next(_context3.t0);
                            return _context3.abrupt("return");

                        case 11:
                            next();

                        case 12:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[0, 7]]);
        }));

        return function (_x7, _x8, _x9) {
            return _ref3.apply(this, arguments);
        };
    }();
};

exports.default = ItemHandlers;