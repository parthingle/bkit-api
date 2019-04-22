import { USERS } from "../config/firebase";

export const getMyProfile = async (req, res, done) => {
    var err, User, userSnapshot;
    try {
        userSnapshot = await USERS.where('profileId', '==', req.params.id).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            User = userSnapshot.docs[0].data();
        }
    } catch (error) {
        err = error;
    }
    done(err, User);
}

export const getPublicProfile = async (req, res, done) => {
    var err, User, fullUser, userSnapshot;
    try {
        userSnapshot = await USERS.where('profileId', '==', req.params.id).get();
        if (userSnapshot.empty) {
            User = null;
        } else {
            fullUser = userSnapshot.docs[0].data();
            User = {
                firstName: fullUser.firstName,
                lastName: fullUser.lastName,
                profilePic: fullUser.profilePic,
                bio: fullUser.bio,
                myBuckets: fullUser.myBuckets,
                myBucketItems: fullUser.myBucketItems
            }

        }
    } catch (error) {
        err = error;
    }
    done(err, User);
}