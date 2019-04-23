import { BUCKETS, ITEMS } from "../config/firebase";

export const getBucket = async (req, res, next) => {
    var Bucket, bucketSnapshot, err;
    try {
        bucketSnapshot = await BUCKETS.where('bucketId', '==', req.params.id).get()
        if (bucketSnapshot.empty) {
            Bucket = null;
        } else {
            Bucket = bucketSnapshot.docs[0].data();
        }
    } catch (error) {
        err = error;
        throw error;
    }
    res.locals.Bucket = Bucket;
    next(err, Bucket);
}

export const resolveBucketItems = async (req, res, next) => {
    var err, BucketItems = [];
    try {
        res.locals.Bucket.bucketItems.forEach((item) => {
            try {
                var bi = await item.get();
                data = bi.data();
                BucketItems.push(data);
            } catch(error) {
                err = error;
                throw error;
            }
        })
    } catch (error) {
        err = error;
        throw error;
    }
    res.locals.Bucket.bucketItems = BucketItems;
    next(err, BucketItems);
}