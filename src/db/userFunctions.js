import { USERS, BUCKETS, ITEMS } from "../config/firebase";
import { Bucket } from "@google-cloud/storage";

export const getMyProfile = async (req, res, next) => {
    let user, userSnapshot;
    try {
        userSnapshot = await USERS.doc(req.auth.id).get();
        if (!userSnapshot.exists) {
            res.status(404).json({ message: "User not found!" });
            return;
        } else {
            user = userSnapshot.data();
        }
    } catch (error) {
        next(error);
        return;
    }
    res.locals.user = user;
    next();
};

export const getPublicProfile = async (req, res, next) => {
    let user, fullUser, userSnapshot;
    try {
        userSnapshot = await USERS.doc(req.params.id).get();
        if (!userSnapshot.exists) {
            res.status(404).json({ message: "User not found!" });
            return;
        } else {
            fullUser = userSnapshot.data();
            user = {
                firstName: fullUser.firstName,
                lastName: fullUser.lastName,
                profilePic: fullUser.profilePic,
                bio: fullUser.bio,
                myBuckets: fullUser.myBuckets,
                myBucketItems: fullUser.myBucketItems
            };
        }
    } catch (error) {
        next(error);
        return;
    }
    res.locals.user = user;
    next();
};

export const resolveUserBuckets = async (req, res, next) => {
    let myBuckets;
    try {
        myBuckets = (await Promise.all(
            res.locals.user.myBuckets.map(b => b.get())
        )).map(b => b.data());
    } catch (error) {
        next(error);
        return;
    }
    res.locals.user.myBuckets = myBuckets;
    next();
};

export const resolveUserBucketItems = async (req, res, next) => {
    let myBucketItems;
    try {
        myBucketItems = (await Promise.all(
            res.locals.user.myBucketItems.map(bi => bi.get())
        )).map(bi => bi.data());
    } catch (error) {
        next(error);
        return;
    }
    res.locals.user.myBucketItems = myBucketItems;
    next();
};

export const newUser = async (req, res, next) => {
    let newUser;
    try {
        // doc() creates a document with the given identifier
        // set() updates documents
        newUser = await USERS.doc(req.body.user.profileId).set({
            data: req.body.user
        });
    } catch (error) {
        next(error);
        return;
    }
    res.locals.newUser = newUser;
    next();
};
