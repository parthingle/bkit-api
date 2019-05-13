import { BUCKETS, ITEMS } from "../config/firebase";

export const getBucket = async (req, res, next) => {
    let bucket, bucketSnapshot;
    try {
        bucketSnapshot = await BUCKETS.doc(req.params.id).get();
        if (!bucketSnapshot.exists) {
            res.status(404).json({ message: "Bucket not found!" });
            return;
        } else {
            bucket = bucketSnapshot.data();
        }
    } catch (error) {
        next(error);
        return;
    }
    res.locals.bucket = bucket;
    next();
};

export const resolveBucketItems = async (req, res, next) => {
    let bucketItems;
    try {
        bucketItems = (await Promise.all(
            res.locals.bucket.bucketItems.map(bi => bi.get())
        )).map(bi => bi.data());
    } catch (error) {
        next(error);
        return;
    }
    res.locals.bucket.bucketItems = bucketItems;
    next();
};
