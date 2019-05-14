import { USERS, BUCKETS, ITEMS } from "../config/firebase";
import moment from "moment";

export const getItem = async (req, res, next) => {
    let item, itemSnapshot;
    try {
        itemSnapshot = await ITEMS.doc(req.params.id).get();
        if (!itemSnapshot.exists) {
            res.status(404).json({ message: "Bucket item not found!" });
            return;
        } else {
            item = itemSnapshot.data();
        }
    } catch (error) {
        next(error);
        return;
    }
    res.locals.item = item;
    next();
};

export const newItem = async (req, res, next) => {
    let newItem;
    try {
        // doc() creates a document with the given identifier
        // set() updates documents
        newItem = await ITEMS.add(
            Object.assign(
                {
                    timeCreated: moment.now(),
                    creator: null, // TODO: Change this when we get facebook working
                    userWhoLike: [],
                    bucketsReferencedIn: [],
                    upvotes: 0,
                    downvotes: 0
                },
                req.body
            )
        );
    } catch (error) {
        next(error);
        return;
    }
    res.locals.newItem = newItem;
    next();
};
