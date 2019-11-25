"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Computation of numbers and ratios in various screens

// Accepts user.myBucketedItems and allItems and returns
// an array of timestamps corresponding to if that user has
// bucketed that item (JS time for when bucketed) or not (0)
var isBucketed = function isBucketed(bucketedItems, allItems) {
    return allItems.map(function (item) {
        return bucketedItems.hasOwnProperty(item.itemId) ? bucketedItems[item.itemId] : 0;
    });
};

// Accepts a user object and allItems
// Returns an object that contains % of completed items
// and an array of items stamped with a "done" timestamp for when
// the given user "bucketed" those items, 0 if the user didn't
var prepHome = exports.prepHome = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, allItems) {
        var times, stampedItems;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        times = isBucketed(user.myBucketedItems, allItems);
                        stampedItems = allItems.map(function (item, idx) {
                            item.done = times[idx];
                            return item;
                        });
                        return _context.abrupt("return", {
                            completionPercentage: Object.keys(user.myBucketedItems).length / allItems.length,
                            items: stampedItems
                        });

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function prepHome(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();