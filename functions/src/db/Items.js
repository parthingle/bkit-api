"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAll = exports.removeFromArray = exports.insertIntoArray = exports.createNewItem = exports.getItemFromId = exports.resolveItems = undefined;

var _firebase = require("../config/firebase");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * Used as an internal function to resolve references
 */
var resolveItems = exports.resolveItems = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(items) {
        var resolvedItems;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        resolvedItems = void 0;

                        if (items) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt("return", Promise.resolve(null));

                    case 3:
                        _context.prev = 3;
                        _context.next = 6;
                        return Promise.all(items.map(function (item) {
                            return item.get().then(function (itemSnapshot) {
                                return itemSnapshot.data();
                            });
                        }));

                    case 6:
                        resolvedItems = _context.sent;
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](3);
                        return _context.abrupt("return", Promise.reject(_context.t0));

                    case 12:
                        return _context.abrupt("return", Promise.resolve(resolvedItems));

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[3, 9]]);
    }));

    return function resolveItems(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getItemFromId = exports.getItemFromId = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var item, itemSnapshot;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        item = void 0, itemSnapshot = void 0;
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _firebase.ITEMS.doc(id).get();

                    case 4:
                        itemSnapshot = _context2.sent;

                        item = itemSnapshot.exists ? itemSnapshot.data() : null;
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2["catch"](1);
                        return _context2.abrupt("return", Promise.reject(_context2.t0));

                    case 11:
                        return _context2.abrupt("return", Promise.resolve(item));

                    case 12:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 8]]);
    }));

    return function getItemFromId(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var createNewItem = exports.createNewItem = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item, id) {
        var newItem;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        newItem = void 0;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return _firebase.ITEMS.add(Object.assign({
                            timeCreated: moment.now(),
                            creator: id,
                            userWhoBucketed: [],
                            bucketsReferencedIn: [],
                            upvotes: 0,
                            downvotes: 0
                        }, item));

                    case 4:
                        newItem = _context3.sent;
                        _context3.next = 10;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3["catch"](1);
                        return _context3.abrupt("return", Promise.reject(_context3.t0));

                    case 10:
                        return _context3.abrupt("return", Promise.resolve(newItem));

                    case 11:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 7]]);
    }));

    return function createNewItem(_x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}();

var insertIntoArray = exports.insertIntoArray = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, field, iid) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return _firebase.ITEMS.doc(iid).update(_defineProperty({}, field, _firebase.FieldValue.arrayUnion(id)));

                    case 3:
                        _context4.next = 8;
                        break;

                    case 5:
                        _context4.prev = 5;
                        _context4.t0 = _context4["catch"](0);
                        return _context4.abrupt("return", Promise.reject(_context4.t0));

                    case 8:
                        return _context4.abrupt("return", Promise.resolve(true));

                    case 9:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 5]]);
    }));

    return function insertIntoArray(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

var removeFromArray = exports.removeFromArray = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(xid, field, id) {
        var itemRef;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        itemRef = void 0;
                        _context5.prev = 1;
                        _context5.next = 4;
                        return _firebase.ITEMS.doc(id).get();

                    case 4:
                        itemRef = _context5.sent;

                        if (itemRef.exists) {
                            _context5.next = 7;
                            break;
                        }

                        return _context5.abrupt("return", Promise.reject(new Error("Item not found!")));

                    case 7:
                        _context5.next = 9;
                        return itemRef.update({
                            field: _firebase.FieldValue.arrayRemove(xid)
                        });

                    case 9:
                        _context5.next = 14;
                        break;

                    case 11:
                        _context5.prev = 11;
                        _context5.t0 = _context5["catch"](1);
                        return _context5.abrupt("return", Promise.reject(_context5.t0));

                    case 14:
                        return _context5.abrupt("return", Promise.resolve(true));

                    case 15:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[1, 11]]);
    }));

    return function removeFromArray(_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

var getAll = exports.getAll = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var allItems, allItemsRef;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        allItems = [];
                        _context6.next = 3;
                        return _firebase.ITEMS.get();

                    case 3:
                        allItemsRef = _context6.sent;

                        allItemsRef.docs.forEach(function (doc) {
                            return allItems.push(doc.data());
                        });
                        return _context6.abrupt("return", allItems);

                    case 6:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function getAll() {
        return _ref6.apply(this, arguments);
    };
}();