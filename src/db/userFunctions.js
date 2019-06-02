import { USERS } from "../config/firebase";

export const getProfileFromId = async id => {
    let user, userSnapshot;
    try {
        userSnapshot = await USERS.doc(id).get();
        user = userSnapshot.exists ? userSnapshot.data() : null;
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(user);
};

export const getPublicProfileFromId = async id => {
    let user, fullUser;
    try {
        fullUser = await getProfileFromId(id);
        user = fullUser
            ? {
                  firstName: fullUser.firstName,
                  lastName: fullUser.lastName,
                  profilePic: fullUser.profilePic,
                  bio: fullUser.bio,
                  myBuckets: fullUser.myBuckets,
                  myItems: fullUser.myItems
              }
            : null;
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(user);
};

export const resolveUserBuckets = async user => {
    let buckets;
    try {
        buckets = (await Promise.all(user.buckets.map(b => b.get()))).map(b =>
            b.data()
        );
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(buckets);
};

export const resolveUserItems = async user => {
    let items;
    try {
        items = (await Promise.all(user.items.map(bi => bi.get()))).map(bi =>
            bi.data()
        );
    } catch (error) {
        next(error);
        return Promise.reject(error);
    }
    Promise.resolve(items);
};

export const createNewUser = async user => {
    let newUser;
    try {
        // doc() creates a document with the given identifier
        // set() updates documents
        newUser = await USERS.doc(user.profileId).set({
            data: user
        });
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(newUser);
};

export const insertIntoArray = async (id, field, xid) => {
    let itemRef;
    try {
        itemRef = await USERS.doc(id).get();
        if (!itemRef.exists) {
            return Promise.reject(new Error("Item not found!"));
        }
        await itemRef.update({
            field: FieldValue.arrayUnion(xid) //check syntax
        });
    } catch (error) {
        Promise.reject(error);
    }
};
