export default class BucketHandlers {
    constructor(db) {
        this.getBucket = async (req, res, next) => {
            let bucket;
            try {
                bucket = await db.Buckets.getBucketFromId(req.params.id);
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

        this.resolveItems = async (req, res, next) => {
            let items;
            try {
                items = await db.Items.resolveItems(res.locals.bucket.items);
            } catch (error) {
                next(error);
                return;
            }
            res.locals.bucket.items = items;
            next();
        };
    }
}
