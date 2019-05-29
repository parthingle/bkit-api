import { BUCKETS } from "../config/firebase";

/*
 * Used as an internal function to resolve references
 */
export const resolveBuckets = async buckets => {
    let resolvedBuckets;

    if (!buckets) {
        return Promise.resolve(null);
    }

    try {
        resolvedBuckets = await Promise.all(
            buckets.map(bucket => {
                return bucket
                    .get()
                    .then(bucketSnapshot => bucketSnapshot.data());
            })
        );
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(resolvedBuckets);
};

export const getBucketFromId = async id => {
    let bucket;
    try {
        bucket = await BUCKETS.doc(id).get();
        bucket = bucket.exists ? bucket.data() : null;
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(bucket);
};
