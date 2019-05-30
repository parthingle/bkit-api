import * as Users from "../db/userFunctions";
import * as Buckets from "../db/bucketFunctions";
import * as Items from "../db/itemFunctions";
import * as Bin from "../bin/completion";

export const getMyProfile = async (req, res, next) => {
    let user;
    try {
        user = await Users.getProfileFromId(req.auth.id);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }
    } catch (error) {
        next(error);
        return;
    }
    res.locals.user = user;
    next();
};

export const getPublicProfile = async (req, res, next) => {
    let user;
    try {
        user = await Users.getPublicProfileFromId(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
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
        myBuckets = await Buckets.resolveBuckets(res.locals.user.myBuckets);
    } catch (error) {
        next(error);
        return;
    }
    res.locals.user.myBuckets = myBuckets;
    next();
};

export const resolveUserItems = async (req, res, next) => {
    let myBucketItems;
    try {
        myBucketItems = await Items.resolveItems(res.locals.user.myBucketItems);
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
        newUser = User.createNewUser(req.body.user);
    } catch (error) {
        next(error);
        return;
    }
    res.locals.newUser = newUser;
    next();
};

export const getHomePage = async (req, res, next) => {
    let thisUser, allItems, home;
    try {
        thisUser = await Users.getProfileFromId(req.auth.id);
        allItems = await Items.getAll();
    } catch (error) {
        next(error);
        return;
    }
    home = Bin.prepHome(thisUser, allItems);
    res.locals.home = home;
    next();
};
