import * as Buckets from "../db/bucketFunctions";
import * as Items from "../db/itemFunctions";

export const getBucket = async (req, res, next) => {
    let bucket;
    try {
        bucket = await Buckets.getBucketFromId(req.params.id);
        if (!bucket) {
            res.status(404).json({ message: "Bucket not found!" });
            return;
        }
    } catch (error) {
        next(error);
        return;
    }
    res.locals.bucket = bucket;
    next();
};

export const resolveItems = async (req, res, next) => {
    let items;
    try {
        items = Items.resolveItems(res.locals.bucket.items);
    } catch (error) {
        next(error);
        return;
    }
    res.locals.bucket.items = items;
    next();
};
