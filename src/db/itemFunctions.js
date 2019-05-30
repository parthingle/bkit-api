import { ITEMS } from "../config/firebase";
import moment from "moment";

/*
 * Used as an internal function to resolve references
 */
export const resolveItems = async items => {
    let resolvedItems;

    if (!items) {
        return Promise.resolve(null);
    }

    try {
        resolvedItems = await Promise.all(
            items.map(item => {
                return item.get().then(itemSnapshot => itemSnapshot.data());
            })
        );
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(resolvedItems);
};

export const getItemFromId = async id => {
    let item, itemSnapshot;
    try {
        itemSnapshot = await ITEMS.doc(id).get();
        item = itemSnapshot.exists ? itemSnapshot.data() : null;
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(item);
};

export const createNewItem = async item => {
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
                item
            )
        );
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(newItem);
};

export const getAll = async () => {
    let allItems = [],
        allItemsRef;
    try {
        allItemsRef = await ITEMS.get();
        allItemsRef.docs.map(doc => allItems.push(doc.data()));
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(allItems);
};
