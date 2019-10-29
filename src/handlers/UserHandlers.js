import * as Bin from "../bin/completion";

export default class UserHandlers {
    constructor(db) {
        this.getMyProfile = async (req, res, next) => {
            let user;
            try {
                user = await db.Users.getProfileFromId(req.auth.id);
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

        this.getPublicProfile = async (req, res, next) => {
            let user;
            try {
                user = await db.Users.getPublicProfileFromId(req.params.id);
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

        this.resolveUserBuckets = async (req, res, next) => {
            let myBuckets;
            try {
                myBuckets = await db.Buckets.resolveBuckets(
                    res.locals.user.myBuckets
                );
            } catch (error) {
                next(error);
                return;
            }
            res.locals.user.myBuckets = myBuckets;
            next();
        };

        this.resolveUserItems = async (req, res, next) => {
            let myBucketItems;
            try {
                myBucketItems = await db.Items.resolveItems(
                    res.locals.user.myBucketItems
                );
            } catch (error) {
                next(error);
                return;
            }
            res.locals.user.myBucketItems = myBucketItems;
            next();
        };

        this.newUser = async (req, res, next) => {
            let newUser;
            try {
                newUser = await db.Users.createNewUser(req.body.user);
            } catch (error) {
                next(error);
                return;
            }
            res.locals.newUser = newUser;
            next();
        };

        this.getHomePage = async (req, res, next) => {
            let thisUser, allItems, home;
            try {
                thisUser = await db.Users.getProfileFromId(req.auth.id);
                allItems = await db.Items.getAll();
            } catch (error) {
                next(error);
                return;
            }
            home = await Bin.prepHome(thisUser, allItems);
            res.locals.home = home;
            next();
        };
    }
}
