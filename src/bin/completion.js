// Computation of numbers and ratios in various screens

// Accepts user.myBucketedItems and allItems and returns
// an array of timestamps corresponding to if that user has
// bucketed that item (JS time for when bucketed) or not (0)
const isBucketed = (bucketedItems, allItems) => {
    let val,
        times = [];
    allItems.forEach((item, idx) => {
        item.itemId in bucketedItems
            ? (val = bucketedItems[item.itemId])
            : (val = 0);
        times.push(val);
    });

    return times;
};

// Accepts a user object and allItems
// Returns an object that contains % of completed items
// and an array of items stamped with a "done" timestamp for when
// the given user "bucketed" those items, 0 if the user didn't
export const prepHome = async (user, allItems) => {
    let times = isBucketed(user.myBucketedItems, allItems);
    let stampedItems = [];
    allItems.map((item, idx) => {
        item.done = times[idx];
        stampedItems.push(item);
    });
    let returnObject = {
        completionPercentage:
            Object.keys(user.myBucketedItems).length / allItems.length,
        items: stampedItems
    };
    return returnObject;
};
