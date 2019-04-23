import { USERS, BUCKETS, ITEMS } from "../config/firebase";
import { Bucket } from "@google-cloud/storage";

export const getMyProfile = async (req, res, next) => {
    var err, User, userSnapshot;

    try {
        userSnapshot = await USERS.where(
            "profileId",
            "==",
            req.params.id
        ).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            User = userSnapshot.docs[0].data();
        }
    } catch (error) {
        err = error;
    }
    res.locals.User = User;
    next();
};

export const getPublicProfile = async (req, res, next) => {
    var err, User, fullUser, userSnapshot;

    try {
        userSnapshot = await USERS.where(
            "profileId",
            "==",
            res.locals.params.id
        ).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            fullUser = userSnapshot.docs[0].data();
            User = {
                firstName: fullUser.firstName,
                lastName: fullUser.lastName,
                profilePic: fullUser.profilePic,
                bio: fullUser.bio,
                myBuckets: fullUser.myBuckets,
                myBucketItems: fullUser.myBucketItems
            };
        }
    } catch (error) {
        err = error;
    }
    res.locals.User = User;
    next(err, User);
};

export const resolveUserBuckets = async (req, res, next) => {
    var err,
        Buckets = [];
    try {
        Promise.all(res.locals.User.myBuckets.map(b => b.get())).then(
            buckets => {
                buckets.map(bucket => {
                    Buckets.push(bucket.data());
                });
            }
        );
        res.locals.User.myBuckets = Buckets;
    } catch (error) {
        err = error;
        throw error;
    }
    next();
};

export const resolveUserBucketItems = async (req, res) => {
    var err,
        BucketItems = [];

    try {
        res.locals.User.myBucketItems.forEach(bucketItems => {
            bucketItems
                .get()
                .then(bi => {
                    BucketItems.push(bi.data());
                })
                .catch(error => {
                    throw error;
                });
        });
    } catch (error) {
        err = error;
        throw error;
    }
    res.locals.User.myBucketItems = BucketItems;
    next();
};
