// Computation of numbers and ratios in various screens

const computeCompletion = (lenBucketed, lenTotal) => {
    return Math.ceil(lenBucketed / lenTotal);
};

// Accepts user.myBucketedItems and allItems and returns
// an array of bools corresponding to if that user has
// bucketed that item or not
const isBucketed = (bucketedItems, allItems) => {
    let exists = [];
    allItems.forEach(i => {
        i in bucketedItems ? exists.push(true) : exists.push(false);
    });
    return exists;
};

export const prepHome = (user, allItems) => {
    let exists = isBucketed(user.myBucketedItems);
    let returnObject = {
        completionPercentage: computeCompletion(
            user.myBucketedItems.length,
            allItems.length
        ),
        items: []
    };
};
