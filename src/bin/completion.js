// Computation of numbers and ratios in various screens

// Imports
<<<<<<< HEAD
=======

// Accepts the lengths of total and completed items
// Returns the percentage done
const computeCompletion = (lenBucketed, lenTotal) => {
    return lenBucketed / lenTotal;
};
>>>>>>> 1abf22c222d3a214c0a7ec47db48495cfb1398c9

// Accepts an array: [{itemId, timestamp}]
// Returns two arrays [itemId], [timestamp]
const splitItems = bucketedItems => {
    let ids = [];
    let timestamps = [];
    bucketedItems.forEach(item => {
        ids.push(item.id);
        timestamps.push(item.timestamp);
    });
    return { ids, timestamps };
};

// Accepts user.myBucketedItems and allItems and returns
// an array of timestamps corresponding to if that user has
// bucketed that item (JS time for when bucketed) or not (null)
const isBucketed = (bucketedItems, allItems) => {
    let { ids, timestamps } = splitItems(bucketedItems);
    const times = allItems.map((item, idx) => {
        item in ids ? timestamps[idx] : null;
    });
    return times;
};

// Accepts a user object and allItems
// Returns an object that contains % of completed items
// and an array of items stamped with a "done" timestamp for when
// the given user "bucketed" those items, null if the user didn't
export const prepHome = async (user, allItems) => {
    let times = isBucketed(user.myBucketedItems, allItems);
    let stampedItems = [];
<<<<<<< HEAD
    allItems.map((item, idx) => {
        item["done"] = times[idx];
        stampedItems.push(item);
=======
    allItems.map(async (item, idx) => {
        try {
            item["done"] = times[idx];
            stampedItems.push(item);
        } catch (error) {
            return Promise.reject(error);
        }
>>>>>>> 1abf22c222d3a214c0a7ec47db48495cfb1398c9
    });
    let returnObject = {
        completionPercentage: user.myBucketedItems.length / allItems.length,
        items: stampedItems
    };
    return returnObject;
};
