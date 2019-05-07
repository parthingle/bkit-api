import { BUCKETS, ITEMS } from "../config/firebase";

export const getBucket = async (req, res, next) => {
    var Bucket, bucketSnapshot;
    try {
        bucketSnapshot = await BUCKETS.where(
            "bucketId",
            "==",
            req.params.id
        ).get();
        if (bucketSnapshot.empty) {
            Bucket = null;
        } else {
            Bucket = bucketSnapshot.docs[0].data();
        }
    } catch (error) {
        next(error);
    }
    res.locals.Bucket = Bucket;
    next();
};

export const resolveBucketItems = async (req, res, next) => {
    var err,
        BucketItems = [];
    try {
        res.locals.Bucket.bucketItems.forEach(item => {
            item.get().then(bi => {
                BucketItems.push(bi.data());
            });
        });
    } catch (error) {
        next(error);
    }
    res.locals.Bucket.bucketItems = BucketItems;
    next();
};
