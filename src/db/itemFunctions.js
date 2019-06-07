import { ITEMS, FieldValue } from "../config/firebase";

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

export const createNewItem = async (item, id) => {
    let newItem;
    try {
        // doc() creates a document with the given identifier
        // set() updates documents
        newItem = await ITEMS.add(
            Object.assign(
                {
                    timeCreated: moment.now(),
                    creator: id,
                    userWhoBucketed: [],
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

export const insertIntoArray = async (id, field, iid) => {
    try {
        await ITEMS.doc(iid).update({
            [field]: FieldValue.arrayUnion(id) //check syntax
        });
    } catch (error) {
        Promise.reject(error);
    }
    return Promise.resolve(true);
};

export const removeFromArray = async (xid, field, id) => {
    let itemRef;
    try {
        itemRef = await ITEMS.doc(id).get();
        if (!itemRef.exists) {
            return Promise.reject(new Error("Item not found!"));
        }
        await itemRef.update({
            field: FieldValue.arrayRemove(xid)
        });
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(true);
};
export const getAll = async () => {
    let allItems = [];
    const allItemsRef = await ITEMS.get();
    allItemsRef.docs.forEach(doc => allItems.push(doc.data()));
    return allItems;
};
