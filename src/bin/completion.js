// Computation of numbers and ratios in various screens

// Imports

// Accepts the lengths of total and completed items
// Returns the percentage done
const computeCompletion = (lenBucketed, lenTotal) => {
    return lenBucketed / lenTotal;
};

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
// bucketed that item (JS time for when bucketed) or not (-1)
const isBucketed = (bucketedItems, allItems) => {
    let times = [];
    let { ids, timestamps } = splitItems(bucketedItems);
    allItems.map((i, idx) => {
        i in ids ? times.push(timestamps[idx]) : times.push(-1);
    });
    return times;
};

// Accepts a user object and allItems
// Returns an object that contains % of completed items
// and an array of items stamped with a "done" timestamp for when
// the given user "bucketed" those items, -1 if the user didn't
export const prepHome = async (user, allItems) => {
    let times = isBucketed(user.myBucketedItems, allItems);
    let stampedItems = [];
    allItems.map(async (item, idx) => {
        try {
            item["done"] = times[idx];
            stampedItems.push(item);
        } catch (error) {
            return Promise.reject(error);
        }
    });
    let returnObject = {
        completionPercentage: computeCompletion(
            user.myBucketedItems.length,
            allItems.length
        ),
        items: stampedItems
    };
    return returnObject;
};
