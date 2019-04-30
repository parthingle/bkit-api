import { USERS, BUCKETS, ITEMS } from "../config/firebase";
import { Bucket } from "@google-cloud/storage";

export const getMyProfile = async (req, res, next) => {
    var err, User, userSnapshot;

    try {
        userSnapshot = await USERS.doc("Users/" + req.params.id).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            User = userSnapshot.data();
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
        userSnapshot = await USERS.doc("Users/" + req.params.id).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            fullUser = userSnapshot.data();
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
        Buckets = [],
        temp;
    try {
        temp = await Promise.all(res.locals.User.myBuckets.map(b => b.get()));
        temp.map(bucket => {
            Buckets.push(bucket.data());
        });
        res.locals.User.myBuckets = Buckets;
    } catch (error) {
        err = error;
        throw error;
    }
    next();
};

export const resolveUserBucketItems = async (req, res, next) => {
    var err,
        BucketItems = [],
        temp;

    try {
        temp = await Promise.all(
            res.locals.User.myBucketItems.map(bi => bi.get())
        );
        temp.map(bi => {
            BucketItems.push(bi.data());
        });
        res.locals.User.myBucketItems = BucketItems;
    } catch (error) {
        err = error;
        throw error;
    }
    next();
};

export const newUser = async (req, res, next) => {
    var newUser;
    try {
        // doc() creates a document with the given identifier
        // set() updates documents
        newUser = await USERS.doc(req.body.user.profileId).set({
            data: req.body.user
        });
    } catch (error) {
        throw error;
    }
    res.locals.newUser = newUser;
    next();
};
