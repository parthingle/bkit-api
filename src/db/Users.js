import { FieldValue, USERS } from "../config/firebase";

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
    try {
        await USERS.doc(id).update({ [field]: Date.now() });
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

export const setObject = async (uid, iid, timestamp, field) => {
    let user, userRef;
    try {
        userRef = USERS.doc(uid);
        user = await userRef.get();
        if (user.exists) {
            let key = `${field}.${iid}`;
            await userRef.update({
                [[key]]: timestamp ? parseInt(timestamp) : Date.now()
            });
            return true;
        } else {
            throw new Error("User does not exist");
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const lookupUserByRefreshToken = async rtoken => {
    let user, userSnapshot;
    try {
        userSnapshot = await USERS.where("rtoken", "==", rtoken).get();
        if (userSnapshot.empty) {
            const e = new Error("User does not exist");
            e.name = "UserNotFoundError";
            throw e;
        }
        userSnapshot.forEach(u => {
            user = u.data();
        });
    } catch (error) {
        return Promise.reject(error);
    }
    return Promise.resolve(user);
};

export const removeObject = async (uid, iid, field) => {
    let user, userRef;
    try {
        userRef = USERS.doc(uid);
        user = await userRef.get();
        if (user.exists) {
            let key = `${field}.${iid}`;
            await userRef.update({
                [[key]]: FieldValue.delete()
            });
            return true;
        } else {
            throw new Error("User does not exist");
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
