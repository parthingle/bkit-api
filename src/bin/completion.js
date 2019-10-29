// Computation of numbers and ratios in various screens

// Accepts user.myBucketedItems and allItems and returns
// an array of timestamps corresponding to if that user has
// bucketed that item (JS time for when bucketed) or not (0)
const isBucketed = (bucketedItems, allItems) => {
    return allItems.map(item =>
        bucketedItems.hasOwnProperty(item.itemId)
            ? bucketedItems[item.itemId]
            : 0
    );
};

// Accepts a user object and allItems
// Returns an object that contains % of completed items
// and an array of items stamped with a "done" timestamp for when
// the given user "bucketed" those items, 0 if the user didn't
export const prepHome = async (user, allItems) => {
    const times = isBucketed(user.myBucketedItems, allItems);
    const stampedItems = allItems.map((item, idx) => {
        item.done = times[idx];
        return item;
    });

    return {
        completionPercentage:
            Object.keys(user.myBucketedItems).length / allItems.length,
        items: stampedItems
    };
};
