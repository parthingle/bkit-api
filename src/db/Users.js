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

export const timestampProfile = async (id, field) => {
    let userSnapshot;
    try {
        userSnapshot = await USERS.doc(id).update({ [field]: Date.now() });
    } catch (error) {
        return Promise.reject(error);
    }
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
        newUser = await USERS.doc(user.profileId).set(user);
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(newUser);
};

export const updateObject = async (uid, iid, field) => {
    let item, itemRef, obj;
    try {
        itemRef = USERS.doc(uid);
        item = await itemRef.get();
        if (item.exists) {
            obj = item.data();
            obj[[field]][[iid]] = Date.now();
            itemRef.update(obj);
        } else {
            throw new Error("User does not exist");
        }
    } catch (error) {
        Promise.reject(error);
    }
};
