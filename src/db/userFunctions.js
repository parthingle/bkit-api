import { USERS, BUCKETS, ITEMS } from "../config/firebase";

export const getMyProfile = async (req, res, next) => {
    var err, User, userSnapshot;

    try {
        userSnapshot = await USERS.where('profileId', '==', req.params.id).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            User = userSnapshot.docs[0].data();
        }
    } catch (error) {
        err = error;
    }
    res.locals.User = User
    next(err, User);
}

export const getPublicProfile = async (req, res, next) => {
    var err, User, fullUser, userSnapshot;

    try {
        userSnapshot = await USERS.where('profileId', '==', req.params.id).get();
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
            }
        }
    } catch (error) {
        err = error;
    }
    res.locals.User = User
    next(err, User);
}

export const resolveUserBuckets = async (req, res, next) => {
    var err, Buckets = [];

    try {
        res.locals.User.myBuckets.forEach((bucket) => {
            bucket.get()
                .then((b) => {
                    Buckets.push(b.data());
                })
                .catch((error) => {
                    throw error
                })
        })
    } catch (error) {
        err = error;
        throw error;
    }
    res.locals.User.myBuckets = Buckets;
    next(err, User);
}

export const resolveUserBucketItems = async (req, res) => {
    var err, BucketItems = [];

    try {
        res.locals.User.myBucketItems.forEach((bucketItems) => {
            bucketItems.get()
                .then((bi) => {
                    BucketItems.push(bi.data());
                })
        })
    } catch (error) {
        err = error;
        throw error;
    }
    res.locals.User.myBucketItems = BucketItems;
    next(err, User)
}